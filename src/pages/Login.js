import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import businessImg from '../img/donut-shop.svg';
import customerImg from '../img/male.svg';

class Login extends Component {
  state = {
    username: "",
    password: "",
    "userType": "",
  };

  bodyBgDefault =() =>{
    const body = document.querySelector("body");
    body.classList.add("signup-bg-color-black");
    body.classList.remove("signup-bg-color-customer");
    body.classList.remove("signup-bg-color-business");
  }
  bodyBgBusiness = () => {
    const body = document.querySelector("body");
    body.classList.add("signup-bg-color-business");
    body.classList.remove("signup-bg-color-customer");
  }
  bodyBgCustomer = () => {
    const body = document.querySelector("body");
    body.classList.add("signup-bg-color-customer");
    body.classList.remove("signup-bg-color-business");
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, userType } = this.state;
    this.props.login({ username, password, userType });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
componentDidMount(){
  this.bodyBgDefault();
}
  render() {
    const { username, password } = this.state;
    return (
      <section className="signup-wrapper">
      <form onSubmit={this.handleFormSubmit}>
          <h1>Log in</h1>
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
            <span className="checkmark-customer" onClick={this.bodyBgCustomer}>
              <img src={customerImg} alt=""/>
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
            <span className="checkmark-business" onClick={this.bodyBgBusiness}>
              <img src={businessImg} alt=""/>
              <h4>I am a Business</h4>
            </span>
            </label>
          </div>
          {
            this.state.userType !== "" ?
            <div>

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
        { this.state.userType === "business" ? <input type="submit" value="LOG IN" className="form-button-business" />: <input type="submit" value="LOG IN" className="form-button-customer" />}
        </div>
        :
          null
        }
      </form>
      <p className="login-link-text-color">
          Don't have an account?
          <Link to={"/signup"}>Sign up</Link>
      </p>
      </section>
    );
  }
}

export default withAuth(Login);
