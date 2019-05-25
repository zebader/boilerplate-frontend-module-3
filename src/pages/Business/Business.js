import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import WorkerCard from './components/WorkerCard'

class Business extends Component {
  render() {
    console.log(this.props.user)
    return (
      <div>
        <h1>Welcome Business {this.props.user.username}</h1>

        {
          this.props.user.workers.map((worker,index) =>
            <Link to="/business/workers/worker._id">
              <WorkerCard key={worker._id} {...worker}/>
            </Link>)
        }

      </div>
    );
  }
}

export default withAuth(Business);
