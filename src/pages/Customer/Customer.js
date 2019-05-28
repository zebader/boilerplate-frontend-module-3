import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import BottomNavBar from '../../components/BottomNavBar'
import CustomerCard from './components/CustomerCard'
import PromotionCard from './components/PromotionCard'
import customerService from '../../lib/customer-service';
import './css/customer-page.css';

class Customer extends Component {
  state = {
    "username": "",
    "email": "",
    "imgUrl": "",
    "location": "",
    "balance": 0,
    "pinnedbusiness": null,
    "userType": "customer",
    loading:true,
    numberOfPromotions: 0,
  };
  bodyBgDefault =() =>{
    const body = document.querySelector("body");
    body.classList.add("business-bg-color");
    body.classList.remove("signup-bg-color-customer");
    body.classList.remove("signup-bg-color-black");
    body.classList.remove("signup-bg-color-business");
  }
  
  updateBalance = (newBalance) =>{
    this.setState({balance : newBalance})
  }

  componentDidMount() {

    this.bodyBgDefault();

    customerService.getCustomer()
    .then((customer) => {

      const selectedCustomer = customer;
      this.setState({...selectedCustomer, loading:false, numberOfPromotions:customer.pinnedbusiness.length});

    }).catch((err) => console.log(err));  
  }

  render() {
    
    const  { pinnedbusiness , loading } = this.state;
    return (
      <main>
      <BottomNavBar {...this.state} updateBalance={this.updateBalance}/>
      <section className="customer-page">
        { !loading ?
          <CustomerCard {...this.state}/> : null
        }
        {
          <div className="customer-page-togglebuttons">
            <div className="customer-page-buttonworkers">
              <h4> Your tipped places: </h4>
              <div className="selected-button"></div>
            </div>
          </div>
        }

         { pinnedbusiness ?
                  
          pinnedbusiness.map((business) => {
          return (
            <Link to={`/promotions/${business.business._id}`} key={business.business._id} className="worker-card-link">
              <PromotionCard {...business}/>
            </Link>
          )})
          
          :
          <h3>You haven´t tipped yet</h3>
        }
 
      </section>
      </main>
    );
  }
}

export default withAuth(Customer);
