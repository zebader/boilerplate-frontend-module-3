import React, { Component } from 'react'
import businessService from './../../../lib/business-service';

export default class BusinessPromotion extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgUrl:"",
      name : "",
      type: "",
      pointsToUnlock: 0,
      };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { id } = this.props.match.params;
    const { name,type,pointsToUnlock } = this.state;

    businessService.updatePromotion({ name,type,pointsToUnlock },id)
    .then(() => {
      this.props.history.push('/business');
    })
    .catch((err) => console.log(err)); 
  }

  deletePromotion = () => {
    const { id } = this.props.match.params;
    businessService.deletePromotion(id)
    	.then(() => {
        this.props.history.push('/business')
      })
    	.catch( (err) => console.log(err));
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
 
    businessService.getAPromotion(this.props.match.params.id)
    .then((promotion) => {
      const selectedPromotion = promotion;
      this.setState({...selectedPromotion});
    })
    .catch((err) => console.log(err));

  }
  
  render() {
    return (
      <article className="worker-profile">
        <div className="worker-profile-wrapper">
          <div className="worker-profile-img">
            <img src={this.state.imgUrl} alt={this.state.name}/>
          </div>
          <div className="worker-profile-info">
            <h4>{this.state.name}</h4>
            <h5>{this.state.type}</h5>
            <p>{this.state.pointsToUnlock}</p>
            <button onClick={() => this.deletePromotion()}>
            DELETE PROMOTION
            </button>
          </div>
        </div>

        <form onSubmit={this.handleFormSubmit}>
          <label>Promotion name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label>Kind of promotion:</label>
          <input
            type="text"
            name="type"
            value={this.state.type}
            onChange={this.handleChange}
          />
          <label>Point to unlock promotion:</label>
          <input
            type="number"
            name="pointsToUnlock"
            value={this.state.pointsToUnlock}
            onChange={this.handleChange}
          />

          <input type="submit" value="UPDATE PROMOTION" />
        </form>

      </article>
    )
  }
}
