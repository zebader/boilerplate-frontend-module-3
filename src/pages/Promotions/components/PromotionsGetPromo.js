import React, { Component } from 'react'
import './../css/promotions-promo-card.css';
import { Link } from "react-router-dom";
import promotionsService from './../../../lib/promotions-service';

export default class PromotionsGetPromo extends Component {
  constructor(props){
    super(props);

    this.state = {
      imgUrl:"",
      name : "",
      type: "",
      rating: 0,
      tips: 0,
      promoId:this.props.match.params.promoId,
      id:this.props.match.params.id,
      };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const {promoId, id} = this.state;

    promotionsService.claimPromotion(promoId,id)
    .then(() => {
      this.props.history.goBack();
    })
    .catch((err) => console.log(err)); 

  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount(){
    const {promoId, id} = this.state;

    promotionsService.getAPromotionsPromo(promoId,id)
    .then((promotion) => {
      const selectedPromotion = promotion;
      this.setState({...selectedPromotion});
    })
    .catch((err) => console.log(err)); 
  }
  render() {

    return (
      <article className="promo-profile">

        <form onSubmit={this.handleFormSubmit}>
        <div className="promotion-get-wrapper">
          <h2>{this.state.name}</h2>
          <img src={this.state.imgUrl} alt=""/>
        </div>
            <input type="submit" value="GET PROMO!"/>
        </form>

      </article>
    )
  }
}
