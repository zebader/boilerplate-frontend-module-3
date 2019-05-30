import React, { Component } from "react";
import customerService from '../lib/customer-service';
import { Link } from "react-router-dom";
import customerImg from './../img/male.svg'
import promoImg from './../img/promotion.svg'
import walletImg from './../img/wallet.svg'

class BottomNavbar extends Component {

  constructor(props){
    super(props);
    this.state = {
      balance: 0,
      showModal: false,
      }
  };

/* CREAR COMPONENTE DE WALLET ========================================================== */

  handleFormSubmit = event => {
        event.preventDefault();    
        const { balance } = this.state;

        customerService.updateWallet({balance})
        .then((wallet) => {
          const balanceFinal = wallet.customer.balance;

          this.setState({ showModal: !this.state.showModal, balance:balanceFinal });

          this.props.updateBalance(balanceFinal)
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
        <form onSubmit={this.handleFormSubmit} className="form-wallet">
        <span className="close-button" onClick={this.toggleModal}>x</span>
          <label>Add $ to your wallet:</label>
          <input
            type="number"
            name="balance"
            value={this.state.balance}
            onChange={this.handleChange}
            min="0"
          />
          <button type="submit" value="ADD €" className="form-button-customer paypal-wrapper">
           <img src="http://nuamedia.com.au/wp-content/uploads/2019/02/paypal-logo.png" alt="" className="paypal"/><p>ADD CASH</p>
          </button>
        </form>
        :
        null
        }
        <Link to={`/customer`}>
          <button>
            <img src={customerImg} alt=""/>
          </button>
        </Link>
          <button onClick={this.toggleModal} className="wallet-button">
           <img src={walletImg} alt=""/>
            <p>{this.props.balance}€ </p>
          </button>
        <Link to={`/promotions`}>
          <button>
            <img src={promoImg} alt=""/>
          </button>
        </Link>
      </div>

      


    );
  }
}

export default BottomNavbar;
