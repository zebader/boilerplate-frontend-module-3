import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import WorkerCard from './components/WorkerCard';
import PromotionCard from './components/PromotionCard';
import BusinessCard from './components/BusinessCard';
import businessService from '../../lib/business-service';
import addWorker from './../../img/addworker.svg'
import addPromo from './../../img/addpromo.svg'


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
  bodyBgDefault =() =>{
    const body = document.querySelector("body");
    body.classList.add("business-bg-color");
    body.classList.remove("signup-bg-color-customer");
    body.classList.remove("signup-bg-color-black");
    body.classList.remove("signup-bg-color-business");
  }

  toggleWorker = () => {
    this.setState({ toggleWorker: true, togglePromotion:false });
  }
  togglePromotion = () => {
    this.setState({ toggleWorker: false, togglePromotion:true });
  }
  
  componentDidMount() {

    this.bodyBgDefault();

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
        <Link to={`/business/workers-add`} className="worker-add-button" >
          <img src={addWorker} alt=""/>
        </Link>
      :
        <Link to={`/business/promotions-add`}  className="promotion-add-button">
        <img src={addPromo} alt=""/>
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
            <Link to={`/business/workers/${worker._id}`} key={worker._id} className="worker-card-link">
              <WorkerCard {...worker}/>
            </Link>
  
          )
          :

          business.promotions.map((promotion) =>

            <Link to={`/business/promotions/${promotion._id}`} key={promotion._id}  className="worker-card-link">
              <PromotionCard {...promotion}/>
            </Link>
          )
          
        }
        

      </main>
    );
  }
}

export default withAuth(Business);
