import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEqual, includes } from 'lodash';
import Header from '../Header/Header';
import Button from '../Common/Button/Button';
import Input from '../Common/Input/Input';
import { isValid, isLoggedIn } from '../../utils/utils';
import { loginUser } from '../../actions/user/user';

import './LoginPage.css';

const mapStateToProps = state => ({
  isAuthentication: state.user.isAuthentication,
  isAuthenticated: state.user.isAuthenticated,
  messageText: state.user.messageText,
  errorCode: state.user.errorCode,
});


export class LoginPage extends Component {

  state = {
    login: '',
    password: '',
    passwordError: [],
    errorsEmail: [],
    rememberMe: false,
  };

  componentWillMount() {
    if (isLoggedIn()) {
      this.props.history.push('/');
    }
  }

  handleLoginChange = ({ target: { value } }) => {
    this.setState({ login: value });
  };

  handlePasswordChange = ({ target: { value } }) => {
    this.setState({ password: value });
  };

  handleRegistrationRoute = () => {
    this.props.history.push('/Register');
  };

  handleSubmit = event => {
    event.preventDefault();
    if (isValid(
      [this.validateEmail(this.state.login),
        this.validatePassword(this.state.password)]
    )) {
      const creds = {
        login: this.state.login,
        password: this.state.password,
      };
      this.props.loginUser(creds);
      this.props.history.push('/');
    }
  };

  validateEmail = email => {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const specialsPattern = /^(?=.*[! #%&])/;
    const errors = [];

    !emailPattern.test(email) && errors.push('Email pattern: myemail@example.com');
    specialsPattern.test(email) && errors.push('Special characters are prohibited');

    this.setState({
      errorsEmail: [...errors],
    });

    return errors.length <= 0;
  };

  validatePassword = password => {
    const upperDigitPattern = /^(?=.*[A-Z])(?=.*[0-9])/;
    const lengthPattern = /^.{8,32}$/;
    const errors = [];

    if (!upperDigitPattern.test(password)) {
      errors.push('Password must contain at least 1 digit and 1 upper case letter');
    }
    if (!lengthPattern.test(password)) {
      errors.push('Password length must be from 8 to 32 characters');
    }

    this.setState({
      passwordError: [...errors],
    });

    return errors.length <= 0;
  };

  render() {
    return (
      <div>
        <Header isLoginPage />
        <div className="background-porsche">
          <div className={`authForm loginForm`}>
            <div className='formLabel'>
              Please, log in
            </div>
            <div className='form'>
              <form
                onSubmit={this.handleSubmit}
              >
                <label className='inputLabel' htmlFor="login">
                  Login
                </label>
                <Input
                  shrink
                  fullWidth
                  id="login"
                  name="login"
                  error={this.state.errorsEmail.join('; ')}
                  value={this.state.login}
                  onChange={e => {
                    this.setState({ errorsEmail: [] });
                    this.handleLoginChange(e);
                  }}
                  placeholder="myemail@example.com"
                  marginBottom="30"
                />
                <label className='inputLabel' htmlFor="password">
                  Password
                </label>
                <Input
                  shrink
                  fullWidth
                  min="1"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  value={this.state.password}
                  onChange={e => {
                    this.setState({ passwordError: [] });
                    this.handlePasswordChange(e);
                  }}
                  error={this.state.passwordError.join('; ')}
                  marginBottom="30"
                />
                <Button
                  fullWidth
                  className='login'
                  type="submit"
                >            
                  Log in              
                </Button>
              </form>
              <div className="signup-hint">
                <span>Do not have an account?</span>
                <span><Link to="/Registration">Sign up</Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);

// export default LoginPage;