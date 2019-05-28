import React, { Component } from 'react'
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
  bodyBgDefault =() =>{
    const body = document.querySelector("body");
    body.classList.add("business-bg-color");
    body.classList.remove("signup-bg-color-customer");
    body.classList.remove("signup-bg-color-business");
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
    this.bodyBgDefault()
    const { workerId,id } = this.state;

    promotionsService.getAPromotionsWorker(workerId,id)
    .then((worker) => {
      const {imgUrl, name, type} = worker;
      this.setState({imgUrl, name, type});
    })
    .catch((err) => console.log(err)); 
  }
  
  render() {
    console.log(this.state)
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
{/*           <input
            type="number"
            name="rating"
            value={this.state.rating}
            onChange={this.handleChange}
          /> */}
          <label>Rating:</label>
          <div className="rating-wrapper">
            <div className="rating">
            <label>
              <input type="radio" name="rating" value="1" onChange={this.handleChange}/>
              <span className="icon">★</span>
            </label>
            <label>
              <input type="radio" name="rating" value="2" onChange={this.handleChange}/>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label>
              <input type="radio" name="rating" value="3" onChange={this.handleChange}/>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>   
            </label>
            <label>
              <input type="radio" name="rating" value="4" onChange={this.handleChange}/>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label>
              <input type="radio" name="rating" value="5" onChange={this.handleChange}/>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            </div>
          </div>
          <input type="submit" value="TIP !" className="form-button-customer button-no-bottom"/>
        </form>

      </article>
    )
  }
}
