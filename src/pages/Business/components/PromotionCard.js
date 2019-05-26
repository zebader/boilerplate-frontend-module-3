import React, { Component } from 'react'
import './../css/worker-card.css';

export default class PromotionCard extends Component {
  render() {
    return (
      <article className="worker-card">
        <div className="worker-card-wrapper">
          <div className="worker-card-img">
            <img src={this.props.imgUrl} alt={this.props.name}/>
          </div>
          <div className="worker-card-info">
            <h4>{this.props.name}</h4>
            <h5>{this.props.type}</h5>
            <p>Points to Unlock : {this.props.pointsToUnlock}</p>
          </div>
        </div>
      </article>
    )
  }
}
