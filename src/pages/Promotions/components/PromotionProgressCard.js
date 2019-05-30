import React, { Component } from 'react'

export default class PromotionProgressCard extends Component {
  
  promoPosition = (avPromo) =>{

    const mathValue = Math.floor((this.props.pointsToUnlock / this.props.totalPoints)*100)
    let finalLeft = (mathValue-10).toString() +'%';

    let usedPromo = false;

    this.props.userID.map((elem)=>{
      if(elem === this.props.customerID){

        return usedPromo = true;
      }
    })
    if(this.props.userPoints < this.props.pointsToUnlock){
      if(mathValue >= 85) {

        return {
        left: "82%",
        position:"absolute",
        pointerEvents:"none",
        background: "rgb(238, 238, 238)",
        borderRadius: "10px 10px 70px 70px",
        padding:" 5px",
        }}
        else{ 
        return {
          left: finalLeft,
          position:"absolute",
          pointerEvents:"none",
          background: "rgb(238, 238, 238)",
          borderRadius: "10px 10px 70px 70px",
          padding:" 5px",

        }};
    }else{
      if(usedPromo){
        return {
          left: finalLeft,
          position:"absolute",
          pointerEvents:"none",
          background: "rgb(238, 238, 238)",
          borderRadius: "10px 10px 70px 70px",
          padding:" 5px",
          }
      }
      if(mathValue >= 85) {
        return {
        left: "85%",
        position:"absolute",
        background: "rgb(166, 255, 182)",
        borderRadius: "10px 10px 70px 70px",
        padding:" 5px",
        }}
        else{ 
        return {
          left: finalLeft,
          position:"absolute",
          background: "rgb(166, 255, 182)",
          borderRadius: "10px 10px 70px 70px",
          padding:" 5px",
        }};
        
    }
  }
  avPromotion = () =>{
    const selectorString = (this.props._id).toString()    
    const avPromo = document.getElementById(selectorString)
    let usedPromo = false;

    this.props.userID.map((elem)=>{
      if(elem === this.props.customerID){

        return usedPromo = true;
      }
    })
    if(this.props.userPoints > this.props.pointsToUnlock && !usedPromo){
      console.log("dentro",usedPromo)
      return avPromo.classList.add("pulse");
    }else if(usedPromo){
      avPromo.classList.remove("pulse");
      avPromo.classList.add("test");
    }
  }

  componentDidMount(){
    this.promoPosition();
    this.avPromotion();
  }

  render(){
    return (
      <div style={this.promoPosition()}>
          <p>{this.props.name}</p>
        <div className="promo-img-frame" id={this.props._id}>
          <img src={this.props.imgUrl} alt={this.props.name} className="promo-img"/>
        </div>
        <p style={{textAlign:"center"}}>{this.props.pointsToUnlock}</p>
        <p style={{textAlign:"center"}}>⯆</p>
      </div>
    )
  }
}
