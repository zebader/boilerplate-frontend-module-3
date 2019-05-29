import React, { Component } from 'react'
import promotionsService from './../../../lib/promotions-service';
import customerService from './../../../lib/customer-service';
import './../css/promotions-profile.css'
import { Link } from "react-router-dom";
import BottomNavBar from '../../../components/BottomNavBar'
import PromotionsWorkerCard from './PromotionsWorkerCard'
import PromotionProgressCard from './PromotionProgressCard'

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
      totalPoints:0,
      userPoints:0,
      balance:0,
      progressBar:"",
      customerID:"",
  }};

  bodyBgDefault =() =>{
    const body = document.querySelector("body");
    body.classList.add("business-bg-color");
    body.classList.remove("signup-bg-color-customer");
    body.classList.remove("signup-bg-color-business");
  }

  TotalPoints = (business) => {
    const {promotions} = business

    let totalPointsMapped = 0
    promotions.map((promotion) => {

      if(totalPointsMapped <= promotion.pointsToUnlock){
        totalPointsMapped = promotion.pointsToUnlock
    }
    })
    return totalPointsMapped
  }
  updateBalance = (newBalance) =>{
    this.setState({balance : newBalance})
  }

  setPointsPosition = () =>{

    const progressBar = document.querySelector('.points-progress-bar');
    progressBar.style.width = this.state.progressBar;

    }


  componentDidMount() {
    this.bodyBgDefault()
    
    promotionsService.getAPromotion(this.props.match.params.id)
    .then((business) => {
      customerService.getCustomer()
      .then((customer) => {
        const totalPoints = this.TotalPoints(business)
        let userPoints = 0;
        
        customer.pinnedbusiness.map((promotion) =>        
        { 

          if(promotion.business._id === business._id){
            userPoints = promotion.points
            return userPoints
          }
        })

        let width = (Math.floor((userPoints / totalPoints)*100)).toString() + '%';
        this.setState({...business, totalPoints, userPoints, balance:customer.balance,progressBar:width, customerID:customer._id});

        this.setPointsPosition();
        
      }).catch((err) => console.log(err)); 
      
    })
    .catch((err) => console.log(err));

    
  }
  
  render() {
    const {username,imgUrl,location, promotions,workers, totalPoints,userPoints,customerID }= this.state;

    return (
      <section>
      <BottomNavBar {...this.state} updateBalance={this.updateBalance} />
      <article className="promotions-profile">

        <div className="promotions-profile-wrapper">
          <div className="promotions-profile-img">
            <img src={imgUrl} alt={username}/>
          </div>
          <div className="promotions-profile-info">
            <h4>{username}</h4>
            <h5>{location}</h5>
          </div>
        </div>
        
        <div className="promotion-bar-card">
        <h4> Avaliable promotions: </h4>

        {
          promotions.map((promotion) =>        
            <Link key={promotion._id} to={`/promotions/${this.props.match.params.id}/promotions/${promotion._id}`} className="promo-img-frame-wrapper">
              <PromotionProgressCard {...promotion} totalPoints={totalPoints} userPoints={userPoints} customerID={customerID}/>
            </Link>
          )
        }

          <div className="points-progress-bar-wrapper">
            <div className="points-progress-bar">
            <div className="points-progress-bar-anim"></div>
            </div>
          </div>
          </div>
 
          <div className="customer-page-togglebuttons">
            <div className="customer-page-buttonworkers">
              <h4> Tip a worker: </h4>
              <div className="selected-button"> </div>    
            </div>
          </div>

          {
          workers.map((worker) =>
            <Link to={`/promotions/${this.props.match.params.id}/workers/${worker._id}/`} key={worker._id} className="worker-card-link">
              <PromotionsWorkerCard {...worker}/>
            </Link>
          )
          }
 
      </article>
      </section>
    )
  }
}
