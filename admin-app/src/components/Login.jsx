import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/Login.css'

class Login extends Component {
  render() {
    return (
      <main>
        <form>
          <label>Username:</label>
          <input type="text" name="" id=""/>
          <label>Password:</label>
          <input type="password" name="" id=""/>
          <button>Log In</button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {

};

export default Login;