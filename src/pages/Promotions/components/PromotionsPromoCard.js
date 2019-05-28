import React, { Component } from 'react'

export default class PromotionsPromoCard extends Component {
  render() {
    return (
      <article className="worker-card">
        <div className="worker-card-wrapper">
          <div className="worker-card-img">
            <img src={this.props.imgUrl} alt={this.props.username}/>
          </div>
          <div className="worker-card-info">
            <h4>{this.props.username}</h4>
            <h5>{this.props.location}</h5>
          </div>
        </div>
      </article>
    )
  }
}
