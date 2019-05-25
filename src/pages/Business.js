import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";

class Business extends Component {
  render() {
    console.log(this.props.user)
    return (
      <div>
        <h1>Welcome Business {this.props.user.username}</h1>
        {
          this.props.user.workers.map((data,index) => <div key={index}><p>{data.name}</p></div>)
        }

      </div>
    );
  }
}

export default withAuth(Business);
