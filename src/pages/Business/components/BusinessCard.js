import React, { Component } from 'react'
import './../css/business-card.css';
import axios from 'axios';

export default class BusinessCard extends Component {

  state = {
    username: this.props.username,
    imgUrl: this.props.imgUrl,
    location: this.props.location,
    numbeOfWorkers: this.props.workers.length,
    numbeOfPromotions: this.props.promotions.length,
    showModal: false,
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, location } = this.state;

    console.log("Ha hecho submit")
    
    axios.put(
      `http://localhost:5000/business/update`,
      { username, location }
    )
    .then( () => {
      /* this.props.getTheProject();	 */					//  <---  hmmm
      this.props.history.push('/business');    
      // after submitting the form, redirect to '/projects'
    })
     .catch( (err) => console.log(err) )
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

/*   componentDidMount() {
    this.getBusiness();  
  }

  getBusiness = () => {
    this.business.get(`/business`)
    .then((apiResponse) => {
      console.log(apiResponse.data)
      this.setState({ business: apiResponse.data })
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const businessId = this.props._id

    const { username, location } = this.state;
    const { _id } = this.props.theProject;
  
  }
  }; */

  render() {
    return (
      <div className="business-card-page">

        <div className="business-card" onClick={this.toggleModal}>
          <img src={this.props.imgUrl} alt={this.props.name}/>
          <h3>{this.state.username}</h3>
          <h4>{this.state.location}</h4>
          <p>workers: {this.state.numbeOfWorkers}</p>
          <p>promotions: {this.state.numbeOfPromotions}</p>
        </div>

        {
          this.state.showModal ?
        <form onSubmit={this.handleFormSubmit}>
          <label>Your business name:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label>Your business location:</label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          />
          <input type="submit" value="BusinessUpdate" />
        </form>
        :
        null
        }
      </div>

    )
  }
}
