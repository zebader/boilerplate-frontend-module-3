import React, { Component } from 'react'

export default class PromotionCard extends Component {
  render() {
    return (
      <article className="worker-card">
        <div className="worker-card-wrapper">
          <div className="worker-card-img">
            <img src={this.props.business.imgUrl} alt={this.props.business.name}/>
          </div>
          <div className="worker-card-info">
            <h4>{this.props.business.username}</h4>
            <h5>{this.props.business.location}</h5>
            <p>Total points: {this.props.points}</p>
          </div>
        </div>
      </article>
    )
  }
}
