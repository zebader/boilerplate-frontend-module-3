import React, { Component } from 'react'
import promotionsService from './../../../lib/promotions-service';
import customerService from './../../../lib/customer-service';
import './../css/promotions-profile.css'
import { Link } from "react-router-dom";
import BottomNavBar from '../../../components/BottomNavBar'
import PromotionsWorkerCard from './PromotionsWorkerCard'
import PromotionProgressCard from './PromotionProgressCard'
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
      totalPoints:0,
  }};

  TotalPoints = (business) => {
    const {promotions} = business

    let totalPointsMapped = 0
    promotions.map((promotion) =>        
    { 
      totalPointsMapped += promotion.pointsToUnlock
    })
    return totalPointsMapped
  }

  componentDidMount() {

    promotionsService.getAPromotion(this.props.match.params.id)
    .then((business) => {
      const totalPoints = this.TotalPoints(business)
      this.setState({...business, totalPoints});
    })
    .catch((err) => console.log(err));


  }
  
  render() {
    const {username,email,imgUrl,location,promotions,workers, totalPoints }= this.state;

    return (
      <section>
      <BottomNavBar />
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
            <Link key={promotion._id} to={`/promotions/${this.props.match.params.id}/promotions/${promotion._id}`} >
              <PromotionProgressCard {...promotion} totalPoints={totalPoints}/>
            </Link>
          )
        }
          </div>
 

          <div className="customer-page-togglebuttons">
            <div className="customer-page-buttonworkers">
              <h4> Tip a worker: </h4>
              <div className="selected-button"> </div>    
            </div>
          </div>

          {
          
          workers.map((worker) =>
          <ReactCSSTransitionGroup key={worker._id} transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false} component="div" className="worker-anim">
            <Link to={`/promotions/${this.props.match.params.id}/workers/${worker._id}/`}  className="promotion-worker-card-link">
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
