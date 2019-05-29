import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
class Navbar extends Component {

  goBack = () => {
    this.props.history.goBack();
  }
  render() {

    const { user, logout, isLoggedin } = this.props;
    return (
      <div className="logout-navbar">

        {isLoggedin ? (
          <>
            <img src="https://www.shareicon.net/download/2016/07/10/119999_arrows.ico" onClick={this.goBack}/>
            <h2>TippJar</h2>
            <img src="https://static.thenounproject.com/png/205237-200.png" onClick={logout}/>
          </>
        ) : null}
      </div>
    );
  }
}

export default withAuth(Navbar);