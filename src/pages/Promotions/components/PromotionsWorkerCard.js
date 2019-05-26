import React, { Component } from 'react'
import './../css/promotions-promo-card.css';

export default class PromotionWorkerCard extends Component {
  render() {
    return (
      <article className="promotion-card">
        <div className="promotion-card-wrapper">
          <div className="promotion-card-img">
            <img src={this.props.imgUrl} alt={this.props.name}/>
          </div>
          <div className="promotion-card-info">
            <h4>{this.props.name}</h4>
            <h5>{this.props.type}</h5>
            <p>Rating : {this.props.rating}</p>
            <p>Total Tips: {this.props.tips}</p>
          </div>
        </div>
      </article>
    )
  }
}
