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
      disable: true,
      }
  };

  handleFormSubmit = event => {
    event.preventDefault();    
    const { username, location, imgUrl } = this.state;

    businessService.updateBusiness({ username, location, imgUrl })
    .then((business) => {
      console.log(business)
      this.setState({
        imgUrl: business.imgUrl
      })
      console.log('submit img', this.state.imgUrl)
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

  fileOnchange = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)

    businessService.imageUpload(uploadData)
    .then((imgUrl) => {
      this.setState({
        imgUrl,
        disable: false,
      })
      console.log("STATE change", this.state.imgUrl)
    })
    .catch((error) => console.log(error))
  }

  componentDidMount() {

    businessService.getBusiness()
    .then((business) => {
      const selectedBusiness = business;
      this.setState({numberOfWorkers : selectedBusiness.workers.length,numberOfPromotions : selectedBusiness.promotions.length,...selectedBusiness});

    }).catch((err) => console.log(err));  
  }

  render() {
    console.log("STATE ", this.state.imgUrl)
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
          <label>Upload a picture:</label>
          <input type="file" onChange={this.fileOnchange}></input>
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
         { this.state.disable ? <input type="submit" value="BusinessUpdate" disabled />:<input type="submit" value="BusinessUpdate"/>}
        </form>
        :
        null
        }
      </div>

    )
  }
}
