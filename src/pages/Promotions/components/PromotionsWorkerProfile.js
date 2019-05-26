import React, { Component } from 'react'
import './../css/promotions-promo-card.css';
import promotionsService from './../../../lib/promotions-service';

export default class PromotionsWorkerProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgUrl:"",
      name : "",
      type: "",
      rating: 0,
      tips: 0,
      id:this.props.match.params.workerId,
      };
  }

  handleFormSubmit = event => {
    event.preventDefault();

    const { tips,rating,id } = this.state;
    console.log(this.state.id)

    promotionsService.updateTipWorker({ tips,rating,id },this.props.match.params.id)
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
    const { rating,tips } = this.state;

    promotionsService.getAPromotionsWorker({ rating,tips },this.props.match.params.id)
    .then((worker) => {
      const selectedWorker = worker;
      this.setState({...selectedWorker});
    })
    .catch((err) => console.log(err)); 
  }
  
  render() {

    console.log(this.state)
    return (
      <article className="worker-profile">


        <form onSubmit={this.handleFormSubmit}>

          <label>TIPS:(current tips: {this.state.tips})</label>
          <input
            type="number"
            name="tips"
            value={this.state.tips}
            onChange={this.handleChange}
          />
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={this.state.rating}
            onChange={this.handleChange}
          />

          <input type="submit" value="TIP !" />
        </form>

      </article>
    )
  }
}
