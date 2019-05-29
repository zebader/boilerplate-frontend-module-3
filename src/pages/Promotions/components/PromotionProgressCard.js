import React, { Component } from 'react'

export default class PromotionProgressCard extends Component {

  promoPosition = () =>{
    /* pointer-events: none; */
    const mathValue = Math.floor((this.props.pointsToUnlock / this.props.totalPoints)*100)
    let finalLeft = (mathValue-7).toString() +'%';

    if(this.props.userPoints < this.props.pointsToUnlock){
      if(mathValue >= 85) {
        return {
        left: "85%",
        position:"absolute",
        pointerEvents:"none",
        }}
        else{ 
        return {
          left: finalLeft,
          position:"absolute",
          pointerEvents:"none",

        }};
    }else{
      if(mathValue >= 85) {
        return {
        left: "85%",
        position:"absolute",
        }}
        else{ 
        return {
          left: finalLeft,
          position:"absolute",
        }};
    }
  }

  componentDidMount(){
    this.promoPosition();
  }

  render(){
    console.log(this.props)
    return (
      <div style={this.promoPosition()}>
        <div className="promo-img-frame">
          <img src={this.props.imgUrl} alt={this.props.username} className="promo-img"/>
        </div>
        <p style={{textAlign:"center"}}>{this.props.pointsToUnlock}</p>
        <p style={{textAlign:"center"}}>⯆</p>
      </div>
    )
  }
}
