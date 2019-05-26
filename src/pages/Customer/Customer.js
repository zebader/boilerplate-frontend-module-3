import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import CustomerCard from './components/CustomerCard'
import PromotionCard from './components/PromotionCard'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import customerService from '../../lib/customer-service';
import './css/customer-page.css';

class Customer extends Component {
  state = {
    "username": "",
    "email": "",
    "imgUrl": "",
    "location": "",
    "balance": 0,
    "pinnedbusiness": [],
    "userType": "customer",
  };

  componentDidMount() {
    customerService.getCustomer()
    .then((customer) => {
      const selectedCustomer = customer;
      this.setState({...selectedCustomer});
      console.log(this.state.pinnedbusiness)

    }).catch((err) => console.log(err));  
  }

  render() {
    const customer = this.state;

    return (
      <main className="customer-page">

        {
          <CustomerCard {...customer}/>
        }
        {
          <div className="customer-page-togglebuttons">
          <div className="customer-page-buttonworkers">
            <h4> Your tipped places: </h4>
            { this.state.toggleWorker ? <div className="selected-button"> </div> : <div className="selected-button"> </div>}
          </div>
          </div>
        }

         { this.state.pinnedbusiness ?
                  
          customer.pinnedbusiness.map((business) =>
          <ReactCSSTransitionGroup key={business._id} transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false} component="div" className="worker-anim">
            <Link to={`/promotion/${business._id}`}  className="worker-card-link">
              <PromotionCard {...business}/>
            </Link>
          </ReactCSSTransitionGroup>
          )
          :
          <h3>You haven´t tipped yet</h3>
        }
        

      </main>
    );
  }
}

export default withAuth(Customer);
