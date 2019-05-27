import React, { Component } from 'react'
import './../css/customer-card.css';
import customerService from '../../../lib/customer-service';


export default class customerCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      }
  };

  handleFormSubmit = event => {
    event.preventDefault();    
    const { username, location } = this.state;

    customerService.updateCustomer ({ username, location })
    .then(() => {
      this.setState({ showModal: !this.state.showModal });
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

  render() {
    const {username, imgUrl, location, balance, numberOfPromotions} = this.props;
    return (
      <div className="customer-card-page">

        <div className="customer-card" onClick={this.toggleModal}>
          <img src={imgUrl} alt={username}/>
          <h3>{username}</h3>
          <h4>{location}</h4>
          <p>your current balance is : {balance}</p>
          <p>You have {this.props.numberOfPromotions} active promotions</p>
        </div>

        {
          this.state.showModal ?
        <form onSubmit={this.handleFormSubmit}>
          <label>My name is:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <label>I am around:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={this.handleChange}
          />
          <input type="submit" value="UPDATE CUSTOMER" />
        </form>
        :
        null
        }
      </div>

    )
  }
}
