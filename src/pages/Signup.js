import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import auth from "../lib/auth-service";

class Signup extends Component {
  state = {
    "username": "",
    "password": "",
    "email": "", 
    "location": "",
    "userType": "customer",
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, email, location, userType } = this.state;
    this.props.signup({ username, password, email, location, userType })
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, email, location } = this.state;
    return (
      <div>
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
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={this.handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            
            onChange={this.handleChange}
            required/>
          <input type="submit" value="Signup" />
        </form>
        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
