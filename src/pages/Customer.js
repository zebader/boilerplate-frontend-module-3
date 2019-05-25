import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
class Customer extends Component {
  render() {
    return (
      <div>
        <h1>Welcome Customer {this.props.user.username}</h1>
      </div>
    );
  }
}

export default withAuth(Customer);
