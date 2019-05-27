import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import BottomNavBar from '../../components/BottomNavBar'
import PromotionsPromoCard from './components/PromotionsPromoCard'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import promotionsService from '../../lib/promotions-service';
import './css/promotions-page.css';

class Promotions extends Component {
  state = {
    AllPromotions: null,
    "userType": "customer",
  };

  componentDidMount() {
    promotionsService.getPromotions()
    .then((promotions) => {
      const selectedPromotions = promotions;
      this.setState({AllPromotions:selectedPromotions});
      
    }).catch((err) => console.log(err));  
  }

  render() {
   
    const {AllPromotions} = this.state;

    return (
      <main>
      <BottomNavBar />
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

          <ReactCSSTransitionGroup key={promotion._id} transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false} component="div" className="worker-anim">
            <Link to={`/promotions/${promotion._id}`}  className="worker-card-link">
              <PromotionsPromoCard {...promotion}/>
            </Link>
          </ReactCSSTransitionGroup>
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
