import React, { Component } from 'react'
import promotionsService from './../../../lib/promotions-service';
import customerService from './../../../lib/customer-service';
import './../css/promotions-profile.css'
import { Link } from "react-router-dom";
import BottomNavBar from '../../../components/BottomNavBar'
import PromotionsWorkerCard from './PromotionsWorkerCard'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class PromotionsProfile extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      username:"",
      email: "",
      imgUrl: "",
      location: "",
      promotions: [],
      workers: [],
  }};

  componentDidMount() {
    promotionsService.getAPromotion(this.props.match.params.id)
    .then((business) => {

      this.setState({...business});
    })
    .catch((err) => console.log(err));

/*     customerService.getCustomer()
    .then((customer) => {

      this.setState({customer});

    }).catch((err) => console.log(err));  */ 
  }
  
  render() {
    const business = this.state;
    console.log(business)

    return (
      <section>
      <BottomNavBar />
      <article className="promotions-profile">

        <div className="promotions-profile-wrapper">
          <div className="promotions-profile-img">
            <img src={business.imgUrl} alt={business.username}/>
          </div>
          <div className="promotions-profile-info">
            <h4>{business.username}</h4>
            <h5>{business.location}</h5>
          </div>
        </div>

        <div className="promotions-profile-wrapper">
          <div className="promotions-profile-img">
            <img src={business.imgUrl} alt={business.username}/>
          </div>
          <div className="promotions-profile-img">
            <img src={business.imgUrl} alt={business.username}/>
          </div>
        </div>

          <div className="customer-page-togglebuttons">
            <div className="customer-page-buttonworkers">
              <h4> Tip a worker: </h4>
              <div className="selected-button"> </div>    
            </div>
          </div>

          {
          
          business.workers.map((worker) =>
          <ReactCSSTransitionGroup key={worker._id} transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false} component="div" className="worker-anim">
            <Link to={`/promotions/${business._id}/workers/${worker._id}/`}  className="promotion-worker-card-link">
              <PromotionsWorkerCard {...worker}/>
            </Link>
          </ReactCSSTransitionGroup>
          )

          }

      </article>
      </section>



    )
  }
}
