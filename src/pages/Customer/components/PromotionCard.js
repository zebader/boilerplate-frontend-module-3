import React, { Component } from 'react'
import './../css/promotion-card.css';

export default class PromotionCard extends Component {
  render() {
    return (
      <article className="promotion-card">
        <div className="promotion-card-wrapper">
          <div className="promotion-card-img">
            <img src={this.props.business.imgUrl} alt={this.props.business.name}/>
          </div>
          <div className="promotion-card-info">
            <h4>{this.props.business.username}</h4>
            <h5>{this.props.business.location}</h5>
            <p>Total points: {this.props.points}</p>
          </div>
        </div>
      </article>
    )
  }
}
