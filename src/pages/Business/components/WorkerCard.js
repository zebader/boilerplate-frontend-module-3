import React, { Component } from 'react'

export default class WorkerCard extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <h4>{this.props.type}</h4>
        <p>{this.props.rating}</p>
        <p>{this.props.tips}</p>
      </div>
    )
  }
}
