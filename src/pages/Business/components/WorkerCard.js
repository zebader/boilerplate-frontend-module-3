import React, { Component } from 'react'
import './../css/worker-card.css';

export default class WorkerCard extends Component {
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
            <p>Rating : {this.props.rating}</p>
            <p>Total Tips: {this.props.tips}</p>
          </div>
        </div>
      </article>
    )
  }
}
