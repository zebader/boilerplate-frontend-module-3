import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Home extends Component {
  render() {
    return (
      <div className="home-splash-wrapper">
        <div className="home-splash-title">
          <h1>KING OF TIPS</h1>
        </div>      
        <div className="home-splash-description">
          <img src="https://us.v-cdn.net/6022043/uploads/defaultavatar.png" alt="" />
        </div>
        <div className="home-splash-buttons">
          <Link to="/signup"><button>SIGN UP</button></Link>
          <p>Already have an account,<Link to="/login">LOG IN</Link></p>
        </div>  
      </div>
    );
  }
}

export default withAuth(Home);
