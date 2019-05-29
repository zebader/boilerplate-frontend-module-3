import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import BottomNavBar from '../../components/BottomNavBar'
import PromotionsPromoCard from './components/PromotionsPromoCard'
import promotionsService from '../../lib/promotions-service';
import customerService from '../../lib/customer-service';
import './css/promotions-page.css';

class Promotions extends Component {
  state = {
    AllPromotions: null,
    "userType": "customer",
    balance:0,
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

    promotionsService.getPromotions()
    .then((promotions) => {
      customerService.getCustomer()
      .then((customer) => {
        const selectedPromotions = promotions;
        this.setState({AllPromotions:selectedPromotions, balance: customer.balance});
      }).catch((err) => console.log(err)); 
    }).catch((err) => console.log(err));  
  }

  render() {
  
    const {AllPromotions} = this.state;

    return (
      <main>
      <BottomNavBar  {...this.state} updateBalance={this.updateBalance}/>
      <section className="promotions-page">
        {
          <h1>All promotions</h1>
        }
        {
          <div className="customer-page-togglebuttons">
            <div className="customer-page-buttonworkers">
              <h4> All promotions: </h4>
              <div className="selected-button"> </div>    
            </div>
          </div>
        }

         { AllPromotions ?
                  
          AllPromotions.map((promotion) =>

            <Link to={`/promotions/${promotion._id}`} key={promotion._id} className="worker-card-link">
              <PromotionsPromoCard {...promotion}/>
            </Link>
          )
          :
          <h3>There are no Promotions</h3>
        }
 
      </section>
      </main>
    );
  }
}

export default withAuth(Promotions);
