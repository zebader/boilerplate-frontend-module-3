import React, { Component } from 'react'
import './../css/business-card.css';
import businessService from './../../../lib/business-service';


export default class BusinessCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      imgUrl: "",
      location: "",
      numberOfWorkers: 0,
      numberOfPromotions: 0,
      showModal: false,
      }
  };

  handleFormSubmit = event => {
    event.preventDefault();    
    const { username, location } = this.state;

    businessService.updateBusiness({ username, location })
    .then(() => {
    })
    .catch((err) => console.log(err)); 

  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  componentDidMount() {

    businessService.getBusiness()
    .then((business) => {
      const selectedBusiness = business;
      this.setState({numberOfWorkers : selectedBusiness.workers.length,numberOfPromotions : selectedBusiness.promotions.length,...selectedBusiness});

    }).catch((err) => console.log(err));  
  }

  render() {
    return (
      <div className="business-card-page">

        <div className="business-card" onClick={this.toggleModal}>
          <img src={this.props.imgUrl} alt={this.props.name}/>
          <h3>{this.state.username}</h3>
          <h4>{this.state.location}</h4>
          <p>workers: {this.state.numberOfWorkers}</p>
          <p>promotions: {this.state.numberOfPromotions}</p>
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
