import React, { Component } from 'react'

export default class PromotionProgressCard extends Component {
  
  promoPosition = () =>{

    const mathValue = Math.floor((this.props.pointsToUnlock / this.props.totalPoints)*100)
    let finalLeft = (mathValue-7).toString() +'%';

    let usedPromo = false;

    this.props.userID.map((elem)=>{
      if(elem === this.props.customerID){

        return usedPromo = true;
      }
    })

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
      if(usedPromo){
        return {
          left: finalLeft,
          position:"absolute",
          pointerEvents:"none",
          background: "#21ff71",
          borderRadius: "30px",
          border: "3px solid #21ff71",
          bottom: "28px",
          }
      }
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
    return (
      <div style={this.promoPosition()}>
        <div className="promo-img-frame">
          <img src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_960_720.png" alt="" className="promo-img-checked"></img>
          <img src={this.props.imgUrl} alt={this.props.username} className="promo-img"/>
        </div>
        <p style={{textAlign:"center"}}>{this.props.pointsToUnlock}</p>
        <p style={{textAlign:"center"}}>⯆</p>
      </div>
    )
  }
}
