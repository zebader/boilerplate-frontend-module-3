import React, { Component } from 'react'
import './../css/promotions-promo-card.css';

export default class PromotionsPromoCard extends Component {
  render() {
    return (
      <article className="promotion-card">
        <div className="promotion-card-wrapper">
          <div className="promotion-card-img">
            <img src={this.props.imgUrl} alt={this.props.username}/>
          </div>
          <div className="promotion-card-info">
            <h4>{this.props.username}</h4>
            <h5>{this.props.location}</h5>
          </div>
        </div>
      </article>
    )
  }
}
