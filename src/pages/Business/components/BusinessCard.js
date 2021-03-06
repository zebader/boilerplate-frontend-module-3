import React, { Component } from 'react'
import businessService from './../../../lib/business-service';


export default class BusinessCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      imgUrl: "",
      location: "",
      numberOfWorkers: 0,
      numberOfPromotions: 0,
      showModal: false,
      disable: true,
      }
  };


  handleFormSubmit = event => {
    event.preventDefault();    
    const { username, location, imgUrl } = this.state;

    businessService.updateBusiness({ username, location, imgUrl })
    .then((business) => {

      this.setState({
        imgUrl: business.imgUrl,
        showModal:false,
      })

      let blackBg = document.querySelector('.bg-modal');
      blackBg.style.display = "none"

    })
    .catch((err) => console.log(err)); 

  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });

    let blackBg = document.querySelector('.bg-modal');
    if(blackBg.style.display === "block"){
      blackBg.style.display = "none"
    }else{
      blackBg.style.display = "block"
    }
  }

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
  style =() => 
  { 
    let style = {
    "color": 'white',
    "background": '#e20088',
    borderRadius: '50%',
    width: '20px',
    height:'20px',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '20px',
  }
    return style
  }

  componentDidMount() {

    businessService.getBusiness()
    .then((business) => {
      const selectedBusiness = business;
      this.setState({numberOfWorkers : selectedBusiness.workers.length,numberOfPromotions : selectedBusiness.promotions.length,...selectedBusiness});

    }).catch((err) => console.log(err));  
  }

  render() {

    return (
      <div className="business-card-page">

        <div className="business-card-wrapper" >
          <img src="https://www.pngrepo.com/png/156718/170/pencil-hand-drawn-tool-outline.png" onClick={this.toggleModal} className="edit-button"/>
          <div className="business-card-img">
            <img src={this.state.imgUrl} alt={this.state.username}/>
          </div>
          <div className="business-card-data-wrapper">
            <div className="business-card-title">
              <h3>{this.state.username}</h3>
              <p style={{color:"#c7c7c7"}}>{this.state.location}</p>
            </div>

            <div className="business-card-data">
              <p>Workers: <span style={this.style()}>{this.state.numberOfWorkers}</span> </p>
              <p>Promotions: <span style={this.style()}>{this.state.numberOfPromotions}</span> </p>
            </div>
          </div>
        </div>

        {
          this.state.showModal ?
        <form onSubmit={this.handleFormSubmit} className="modal-edit-form">
        <h3>Update Business</h3>
        <span className="close-button" onClick={this.toggleModal}>x</span>
          <div className="inputfile-wrapper"> 

          <input type="file" name="file" id="file" onChange={this.fileOnchange} className="inputfile"></input>
          <label htmlFor="file" >
          { this.state.disable ?
          <><div className="profile-card-img">
           <img src="https://www.camisetascatedrales.com/wp-content/uploads/2018/04/upload-cloud-outline.png"className="disabled-upload-img" alt=""/>
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
          
          </div>
          <label>Your business name:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label>Your business location:</label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          />
         { this.state.disable ? <input type="submit" value="Update!" disabled className="form-button-disabled"/>:<input type="submit" value="Update!" className="form-button-business"/>}
        </form>
        :
        null
        }
      </div>

    )
  }
}
