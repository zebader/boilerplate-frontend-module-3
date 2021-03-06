import React, { Component } from 'react'
import businessService from './../../../lib/business-service';

export default class BusinessWorker extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgUrl:"",
      name : "",
      type: "",
      rating: 0,
      tips: 0,
      disable:true,
      };
  }
  bodyBgDefault =() =>{
    const body = document.querySelector("body");
    body.classList.add("business-bg-color");
    body.classList.remove("signup-bg-color-customer");
    body.classList.remove("signup-bg-color-black");
    body.classList.remove("signup-bg-color-business");
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { id } = this.props.match.params;
    const { name,type, imgUrl } = this.state;

    businessService.updateWorker({ name,type, imgUrl },id)
    .then(() => {
      this.props.history.push('/business');
    })
    .catch((err) => console.log(err)); 
  }

  deleteWorker = () => {
    const { id } = this.props.match.params;
    businessService.deleteWorker(id)
    	.then(() => {
        this.props.history.push('/business')
      })
    	.catch( (err) => console.log(err));
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  fileOnchange = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)

    businessService.imageUpload(uploadData)
    .then((imgUrl) => {
      this.setState({
        imgUrl,
        disable: false,
      })
    })
    .catch((error) => console.log(error))
  }
  closeModal = () => {
    this.props.history.push('/business')
  }

  componentDidMount() {

    this.bodyBgDefault();

    businessService.getAWorker(this.props.match.params.id)
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
        <h3>Add a promotion</h3>
          <span className="close-button" onClick={this.closeModal}>x</span>
        <input type="file" name="file" id="file" onChange={this.fileOnchange} className="inputfile"></input>
          <label htmlFor="file" >
          { this.state.disable ?
          <><div className="profile-card-img ">
           <img src="https://www.camisetascatedrales.com/wp-content/uploads/2018/04/upload-cloud-outline.png" className="disabled-upload-img"alt=""/>
           </div>
            <p>Upload a picture</p>
          </>
          :
          <>
          <div className="profile-card-img">
            <img src={this.state.imgUrl}/>
          </div>
            <p>Update picture</p>
          </>
          
          }
          </label>
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
          { this.state.disable ? <input type="submit" value="Update Worker!" disabled className="form-button-disabled"/>:
          <input type="submit" value="Update Worker!" className="form-button-business"/>}

          <input onClick={() => this.deleteWorker()} type="submit" value="delete" className="form-button-delete"/>

        </form>


      </article>



    )
  }
}
