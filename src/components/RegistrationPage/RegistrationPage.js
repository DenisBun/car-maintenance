import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Button from '../Common/Button/Button';
import Input from '../Common/Input/Input';
import { registerUser } from '../../actions/user/user';
import { isValid, isLoggedIn } from '../../utils/utils';

import './RegistrationPage.css';

const mapStateToProps = state => ({
  registrationMessage: state.user.registrationMessage,
});

export class RegistrationPage extends Component {

  state = {
    email: '',
    password: '',
    passwordConfirm: '',
    passwordError: [],
    errorsEmail: [],
    errorsPassword: [],
    errorsConfirm: [],
  };


  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  validatePassword = () => {
    const upperDigitPattern = /^(?=.*[A-Z])(?=.*[0-9])/;
    const lengthPattern = /^.{8,32}$/;
    const errors = [];
    const { password } = this.state;

    !upperDigitPattern.test(password) && errors.push('Password must contain at least 1 digit and 1 upper case letter');
    !lengthPattern.test(password) && errors.push('Password length must be from 8 to 32 characters');

    this.setState({
      errorsPassword: [...errors],
    });

    return !errors.length;
  };

  validateConfirmPassword = (password, passwordConfirm) => {
    const errors = [];
    password !== passwordConfirm && errors.push('Passwords dont match');

    this.setState({
      errorsConfirm: [...errors],
    });

    return !errors.length;
  };

  validate = () => {
    const { password, passwordConfirm } = this.state;
    return isValid([
      this.validatePassword(),
      this.validateConfirmPassword(password, passwordConfirm),
    ]);
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.validate()) {
      const { email, password} = this.state;
      await this.props.registerUser({ email, password });
      if (this.props.registrationMessage.length) {
        this.setState({
          errorsEmail: [...this.state.errorsEmail, this.props.registrationMessage],
        });
        return;
      }
      await this.props.history.push('/');
    }
  };

  render() {
    return (
      <div>
        <Header isRegistrationPage />
          <div className="bwmBackground">
            <div className={`authForm loginForm`}>
              <div className='formLabel'>
                Registration
              </div>
              <div className='form'>
                <form
                  onSubmit={this.handleSubmit}
                >
                  <label className='inputLabel' htmlFor="email">
                    Login
                  </label>
                  <Input
                    shrink
                    fullWidth
                    id="email"
                    name="email"
                    error={this.state.errorsEmail.join('; ')}
                    value={this.state.email}
                    onChange={e => {
                      this.setState({ errorsEmail: [] });
                      this.handleInputChange(e);
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
                      this.handleInputChange(e);
                    }}
                    error={this.state.passwordError.join('; ')}
                    marginBottom="30"
                  />
                  <label className='inputLabel' htmlFor="passwordConfirm">
                    Confirm password
                  </label>
                  <Input
                    style={{ marginBottom: '10px' }}
                    shrink
                    fullWidth
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="********"
                    value={this.state.passwordConfirm}
                    onChange={(e) => {
                      this.setState({ errorsConfirm: [] });
                      this.handleInputChange(e);
                    }}
                    error={this.state.errorsConfirm.join('; ')}
                  />
                  <Button
                    fullWidth
                    className='login'
                    type="submit"
                  >            
                    Sign up              
                  </Button>
                </form>
                <div className="signup-hint">
                  <span>Already have an account?</span>
                  <span><Link to="/Login">Log in</Link></span>
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
  { registerUser }
)(RegistrationPage);