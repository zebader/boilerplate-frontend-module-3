import React, { Component } from 'react'
import promotionsService from './../../../lib/promotions-service';
import customerService from './../../../lib/customer-service';

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
      balance:0,
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
  closeModal = () => {
    this.props.history.push(`/promotions/${this.state.id}`)
  }
  style =() => 
  { 
    let style = {
    "color": 'white',
    "background": '#ff6126',
    borderRadius: '50%',
    width: '20px',
    height:'20px',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '20px',
  }
return style}

  componentDidMount(){
    this.bodyBgDefault()
    const { workerId,id } = this.state;

    promotionsService.getAPromotionsWorker(workerId,id)
    .then((worker) => {

      customerService.getCustomer()
      .then((customer) => {
    
        const {imgUrl, name, type} = worker;
        this.setState({imgUrl, name, type, balance:customer.balance});
        
      }).catch((err) => console.log(err)); 

    })
    .catch((err) => console.log(err)); 
  }
  
  render() {
    console.log(this.state)
    return (
      <article className="worker-profile">

        <form onSubmit={this.handleFormSubmit} className="modal-edit-form">
        <span className="close-button" onClick={this.closeModal}>x</span>
          <h3 style={{textAlign:"center"}}>TIP {this.state.name} !</h3>
          <div>

          <div className="profile-card-img" style={{left:"50%",transform:"translateX(-50%)",margin:"5% 0"}}>
            <img src={this.state.imgUrl}/>
          </div>

          </div>
          <p style={{textAlign:"center"}}>Your balance is: <span style={this.style()}>{this.state.balance}</span>€</p>
          <input
            type="number"
            name="tips"
            value={this.state.tips}
            onChange={this.handleChange}
            max={this.state.balance}
          />

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
