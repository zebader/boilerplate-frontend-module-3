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

      let blackBg = document.querySelector('.black-bg-modal');
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

    let blackBg = document.querySelector('.black-bg-modal');
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
      console.log("STATE change", this.state.imgUrl)
    })
    .catch((error) => console.log(error))
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
        <div>
        </div>
        <div className="business-card-wrapper" >
          <img src="https://www.pngrepo.com/png/156718/170/pencil-hand-drawn-tool-outline.png" onClick={this.toggleModal} className="edit-button"/>
          <div className="business-card-img">
            <img src={this.state.imgUrl} alt={this.state.username}/>
          </div>
          <div className="business-card-data-wrapper">
            <div className="business-card-title">
              <h3>{this.state.username}</h3>
              <h4>{this.state.location}</h4>
            </div>

            <div className="business-card-data">
              <p>workers: {this.state.numberOfWorkers}</p>
              <p>promotions: {this.state.numberOfPromotions}</p>
            </div>
          </div>
        </div>

        {
          this.state.showModal ?
        <form onSubmit={this.handleFormSubmit} className="modal-edit-form">
        <span className="close-button" onClick={this.toggleModal}>x</span>
          <div className="inputfile-wrapper"> 

          <input type="file" name="file" id="file" onChange={this.fileOnchange} className="inputfile"></input>
          <label for="file" >
          { this.state.disable ?
          <><div className="profile-card-img disabled-upload-img">
           <img src="https://www.camisetascatedrales.com/wp-content/uploads/2018/04/upload-cloud-outline.png" alt=""/>
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
