import React, { Component } from 'react'

export default class PromotionWorkerCard extends Component {
  numberToStar = () =>{

    const selectorString = (this.props._id).toString()
    
    const rating = document.getElementById(selectorString)

    if(this.props.rating === 1){
      rating.innerHTML = `Rating: <span style='color:#ff9d2f;font-size:1.5em;'>★</span>`    
    }else if(this.props.rating === 2){
      rating.innerHTML = `Rating: <span style='color:#ff9d2f;font-size:1.5em;'>★★</span>`
    }else if(this.props.rating === 3){
      rating.innerHTML = `Rating: <span style='color:#ff9d2f;font-size:1.5em;'>★★★</span>`
    }else if(this.props.rating === 4){
      rating.innerHTML = `Rating: <span style='color:#ff9d2f;font-size:1.5em;'>★★★★</span>` 
    }else if(this.props.rating === 5){
      rating.innerHTML = `Rating: <span style='color:#ff9d2f;font-size:1.5em;'>★★★★★</span>` 
    }else if(this.props.rating === 0){
      rating.innerHTML = `Rating: No rating yet</span>` 
    }
  }
  componentDidMount(){
    this.numberToStar()
  }
  render() {
    return (
      <article className="worker-card">
        <div className="worker-card-wrapper">
          <div className="worker-card-img">
            <img src={this.props.imgUrl} alt={this.props.name}/>
          </div>
          <div className="worker-card-info">
            <h4 style={{color:"#ff6126"}}>{this.props.name}</h4>
            <h5>{this.props.type}</h5>
            <p id={this.props._id}></p>
          </div>
        </div>
      </article>
    )
  }
}
