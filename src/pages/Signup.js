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
      <section className="signup-wrapper">
        <form onSubmit={this.handleFormSubmit}>
          <h1>SIGN UP</h1>
          <h4>Choose your type of user</h4>
          <div className="radio-wrapper">

            <label className="radio-checked">
            <input
              type="radio"
              name="userType"
              placeholder="customer"
              value="customer"
              onChange={this.handleChange}
            />
            <span className="checkmark-customer">
              <img src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt=""/>
              <h4>I am a Customer</h4>
            </span>
            </label>
            <label className="radio-checked">
            <input
              type="radio"
              name="userType"
              placeholder="business"
              value="business"
              onChange={this.handleChange}
            />
            <span className="checkmark-business">
              <img src="http://chittagongit.com/download/252559" alt=""/>
              <h4>I am a Business</h4>
            </span>
            </label>
          </div>
          { this.state.userType === "business" ? <h4 style={{color:"red"}}>Add workers and create promotions</h4> :<h4 style={{color:"orange"}}>Tip workers and get promotions!</h4> }
          { this.state.userType === "business" ? <label>Business name:</label> : <label>Customer name:</label> }
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            required
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
            required
          />
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={this.handleChange}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            
            onChange={this.handleChange}
            required/>
            { this.state.userType === "business" ? <input type="submit" value="SIGN UP" className="form-button-business" />: <input type="submit" value="SIGN UP" className="form-button-customer" />}
          
        </form>
        <p className="login-link-text-color">
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </section>
    );
  }
}

export default withAuth(Signup);
