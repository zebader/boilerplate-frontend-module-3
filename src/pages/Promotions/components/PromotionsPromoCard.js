import React, { Component } from 'react'

export default class PromotionsPromoCard extends Component {
  style =() => 
  { 
    let style = {
    "color": 'white',
    "background": '#ff6126',
    borderRadius: '50%',
    width: '20px',
    height:'20px',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '20px',
  }
return style}
  render() {
    return (
      <article className="worker-card">
        <div className="worker-card-wrapper">
          <div className="worker-card-img">
            <img src={this.props.imgUrl} alt={this.props.username}/>
          </div>
          <div className="worker-card-info">
            <h4 style={{color:"#ff6126"}}>{this.props.username}</h4>
            <h5>{this.props.location}</h5>
            <p><span style={this.style()}>{this.props.promotions.length}</span> promociones</p>
          </div>
        </div>
      </article>
    )
  }
}
