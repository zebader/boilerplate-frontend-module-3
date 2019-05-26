import React, { Component } from 'react'
import businessService from './../../../lib/business-service';

export default class BusinessPromotionAdd extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgUrl:"",
      name : "",
      type: "",
      pointsToUnlock: 0,
      };
  }

  handleFormSubmit = event => {
    event.preventDefault();

    const { name,type,pointsToUnlock } = this.state;

    businessService.addPromotion({ name,type,pointsToUnlock })
    .then(() => {
      this.props.history.push('/business');
    })
    .catch((err) => console.log(err)); 
  
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  
  render() {
    return (
      <article className="worker-profile">


        <form onSubmit={this.handleFormSubmit}>
          <label>Promotion name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label>Kind of promotion:</label>
          <input
            type="text"
            name="type"
            value={this.state.type}
            onChange={this.handleChange}
          />
          <label>Point to unlock promotion:</label>
          <input
            type="number"
            name="pointsToUnlock"
            value={this.state.pointsToUnlock}
            onChange={this.handleChange}
          />

          <input type="submit" value="ADD PROMOTION" />
        </form>

      </article>
    )
  }
}
