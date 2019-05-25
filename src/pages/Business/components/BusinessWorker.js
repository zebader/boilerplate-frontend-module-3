import React, { Component } from 'react'
import axios from 'axios';

export default class BusinessWorker extends Component {

  constructor(props){
    super(props);
    this.state = {
      name : "",
      type: "",
      rating: "",
      tips: "",
      };
  }

/*   handleFormSubmit = event => {
    event.preventDefault();
    const { id } = this.props.match.params;

    console.log("Ha hecho submit")
      
    axios.get(`http://localhost:5000/business/workers/${id}`)
      .then( (apiResponse) =>{
        const {name,type,imgUrl} = apiResponse.data;
        this.setState({name,type,imgUrl});
        
      })
      .catch((err) => console.log(err));
  } */

  getAWorker = () => {
    const { id } = this.props.match.params;
    axios.get(`http://localhost:5000/business/workers/${id}`)
      .then( (worker) =>{
        
        const selectedWorker = worker.data;

        this.setState({...selectedWorker});
        console.log(this.state)
        
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    //  fetch the data from API befor initial render
    this.getAWorker();  
  }
  
  render() {
    return (
      <article className="worker-card">
        <div className="worker-card-wrapper">
          <div className="worker-card-img">
            <img src="" alt=""/>
          </div>
          <div className="worker-card-info">
            <h4>Hello</h4>
            <h5>Hello</h5>
            <p>Rating : Hello</p>
            <p>Total Tips: Hello</p>
          </div>
        </div>
      </article>



    )
  }
}
