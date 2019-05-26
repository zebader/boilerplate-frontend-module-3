import React, { Component } from 'react'
import businessService from './../../../lib/business-service';

export default class BusinessWorkerAdd extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgUrl:"",
      name : "",
      type: "",
      };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { name,type } = this.state;
    console.log("Ha hecho submit")

    businessService.addWorker({ name,type })
    .then(() => {
      this.props.history.push('/business');
    })
    .catch((err) => console.log(err)); 
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  
  render() {
    return (
      <article className="worker-profile">

        <form onSubmit={this.handleFormSubmit}>
          <label>Your worker name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label>Your worker position:</label>
          <input
            type="text"
            name="type"
            value={this.state.type}
            onChange={this.handleChange}
          />
          <input type="submit" value="WorkerAdd" />
        </form>

      </article>
    )
  }
}
