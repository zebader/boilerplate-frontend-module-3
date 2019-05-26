import React, { Component } from 'react'
import './../css/customer-card.css';
import customerService from '../../../lib/customer-service';


export default class customerCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      "username": "",
      "imgUrl": "",
      "location": "",
      "balance": 0,
      numberOfPromotions: 0,
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

  componentDidMount() {

    customerService.getCustomer ()
    .then((customer ) => {
      const selectedCustomer  = customer ;
      this.setState({numberOfPromotions : selectedCustomer.pinnedbusiness.length,...selectedCustomer });

    }).catch((err) => console.log(err));  
  }

  render() {
    return (
      <div className="customer-card-page">

        <div className="customer-card" onClick={this.toggleModal}>
          <img src={this.state.imgUrl} alt={this.state.name}/>
          <h3>{this.state.username}</h3>
          <h4>{this.state.location}</h4>
          <p>your current balance is : {this.state.balance}</p>
          <p>You have {this.state.numberOfPromotions} active promotions</p>
        </div>

        {
          this.state.showModal ?
        <form onSubmit={this.handleFormSubmit}>
          <label>My name is:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label>I am around:</label>
          <input
            type="text"
            name="location"
            value={this.state.location}
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
