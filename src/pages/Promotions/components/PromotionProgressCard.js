import React, { Component } from 'react'

export default class PromotionProgressCard extends Component {
  render(){
    console.log(this.props.totalPoints, this.props.userPoints)
    return (
      <div>
      <div className="promo-img-frame">
        <img src={this.props.imgUrl} alt={this.props.username} className="promo-img"/>
      </div>
        <p>{this.props.pointsToUnlock}</p>
      </div>
    )
  }
}
