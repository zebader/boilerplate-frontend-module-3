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
      workerId:this.props.match.params.workerId,
      id:this.props.match.params.id,
      };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { workerId ,id } = this.state;
    const { tips,rating } = this.state;
    const points = tips*100;

    promotionsService.updateTipWorker({ tips,rating, points }, workerId ,id)
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

    const { workerId,id } = this.state;

    promotionsService.getAPromotionsWorker(workerId,id)
    .then((worker) => {
      const selectedWorker = worker;
      this.setState({...selectedWorker});
    })
    .catch((err) => console.log(err)); 
  }
  
  render() {

    return (
      <article className="worker-profile">


        <form onSubmit={this.handleFormSubmit}>

          <label>TIP {this.state.name} !</label>
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
