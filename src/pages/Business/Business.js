import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import WorkerCard from './components/WorkerCard'
import BusinessCard from './components/BusinessCard'
import './css/business-page.css';

class Business extends Component {
  state = {
    business: this.props.user
  };

  render() {

    return (
      <main className="business-page">
        <h1>Welcome {this.props.user.username}</h1>

        {
          <BusinessCard {...this.state.business}/>
        }
        {
          this.state.business.workers.map((worker,index) =>
            <Link to={`/business/workers/${worker._id}`} key={worker._id} className="worker-card-link">
              <WorkerCard {...worker}/>
            </Link>)
        }

      </main>
    );
  }
}

export default withAuth(Business);
