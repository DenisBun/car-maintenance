import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Button from '../Common/Button/Button';
import Input from '../Common/Input/Input';
import { isValid, isLoggedIn } from '../../utils/utils';

import './RegistrationPage.css';


export default class RegistrationPage extends Component {

  state = {
    login: '',
    email: '',
    password: '',
    passwordConfirm: '',
    passwordError: [],
    errorsEmail: [this.props.messageText],
    errorsPassword: [],
    errorsConfirm: [],
  };


  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
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

  handleSubmit = event => {
    event.preventDefault();
    this.validateEmail();
    if (this.validate()) {
      const { email, password, passwordConfirm, isStudent } = this.state;
      this.props.updateRequiredData({
        email,
        password,
        passwordConfirm,
        isStudent,
      });
    }
  };

  render() {
    return (
      <div>
        <Header isRegistrationPage />
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
                  {'Confirm password'}
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
    );
  }
}
