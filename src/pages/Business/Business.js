import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import WorkerCard from './components/WorkerCard';
import PromotionCard from './components/PromotionCard';
import BusinessCard from './components/BusinessCard';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import businessService from '../../lib/business-service';
import './css/business-page.css';

class Business extends Component {
  state = {
    username:"",
    email: "",
    imgUrl: "",
    location: "",
    promotions: [],
    userType: "business",
    workers: [],
    toggleWorker : true,
    togglePromotion : false,
  };

  toggleWorker = () => {
    this.setState({ toggleWorker: true, togglePromotion:false });
  }
  togglePromotion = () => {
    this.setState({ toggleWorker: false, togglePromotion:true });
  }

  componentDidMount() {

    businessService.getBusiness()
    .then((business) => {
      const selectedBusiness = business;
      this.setState({...selectedBusiness});

    }).catch((err) => console.log(err));  
  }

  render() {
    const business = this.state;

    return (
      <main className="business-page">
      { this.state.toggleWorker ?
        <Link to={`/business/workers-add`} className="worker-card-link">
          <button className="worker-add-button"> ADD WORKER </button>
        </Link>
      :
        <Link to={`/business/promotions-add`}  className="worker-card-link">
          <button className="promotion-add-button"> ADD PROMOTION </button>
        </Link>
      }

        {
          <BusinessCard {...business}/>
        }
        <div className="business-page-togglebuttons">
          <div className="business-page-buttonworkers" onClick={this.toggleWorker}>
            <h4> WORKERS </h4>
            { this.state.toggleWorker ? <div className="selected-button"> </div> : <div className="noselected-button"> </div>}
          </div>
          <div className="business-page-buttonpromotions" onClick={this.togglePromotion}>
            <h4> PROMOTIONS </h4>
            { this.state.togglePromotion ? <div className="selected-button"> </div> : <div className="noselected-button"> </div>}
          </div>
        </div>

        {

          this.state.toggleWorker ?
                  
          business.workers.map((worker) =>
          <ReactCSSTransitionGroup key={worker._id} transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false} component="div" className="worker-anim">
            <Link to={`/business/workers/${worker._id}`}  className="worker-card-link">
              <WorkerCard {...worker}/>
            </Link>
          </ReactCSSTransitionGroup>
          )
          :

          business.promotions.map((promotion) =>

          <ReactCSSTransitionGroup key={promotion._id} transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false} component="div" className="worker-anim">
            <Link to={`/business/promotions/${promotion._id}`}  className="worker-card-link">
              <PromotionCard {...promotion}/>
            </Link>
          </ReactCSSTransitionGroup>
          )
          
        }
        

      </main>
    );
  }
}

export default withAuth(Business);
