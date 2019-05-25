import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";

class Login extends Component {
  state = {
    username: "",
    password: "",
    "userType": "customer",
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, userType } = this.state;
    console.log(userType)
    this.props.login({ username, password, userType });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
          <label>I am a Business</label>
          <input
            type="radio"
            name="userType"
            placeholder="business"
            value="business"
            onChange={this.handleChange}
          />
          <label>I am a Customer</label>
          <input
            type="radio"
            name="userType"
            placeholder="customer"
            value="customer"
            onChange={this.handleChange}
          /> 

          { this.state.userType === "business" ? <label>Business name:</label> : <label>Customer name:</label> }
        <input
          type="text"
          name="username"
          value={username}
          onChange={this.handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default withAuth(Login);
