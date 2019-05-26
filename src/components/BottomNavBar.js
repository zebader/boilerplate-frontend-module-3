import React, { Component } from "react";
import customerService from '../lib/customer-service';
import { Link } from "react-router-dom";

class BottomNavbar extends Component {

  constructor(props){
    super(props);
    this.state = {
      balance:this.props.balance,
      showModal: false,
      }
  };

/* CREAR COMPONENTE DE WALLET ========================================================== */

  handleFormSubmit = event => {
        event.preventDefault();    
        const { balance } = this.state;
    
        customerService.updateWallet ({ balance })
        .then(() => {
          this.setState({ showModal: !this.state.showModal, balance });
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

    return (
      <div className="bottom-navbar-wrapper">
      {
          this.state.showModal ?
        <form onSubmit={this.handleFormSubmit}>

          <label>Add $ to your wallet:</label>
          <input
            type="number"
            name="balance"
            value={this.state.balance}
            onChange={this.handleChange}
          />
          <input type="submit" value="Add TO WALLET" />
        </form>
        :
        null
        }
        <Link to={`/customer`}><button>Profile</button></Link>
        <button onClick={this.toggleModal}>WALLET actual balance:{this.state.balance}</button>
        <Link to={`/promotions`}><button>Promos</button></Link>
      </div>

      


    );
  }
}

export default BottomNavbar;
