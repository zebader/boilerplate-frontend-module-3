import React, { Component } from 'react'
import customerService from '../../../lib/customer-service';

export default class customerCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      imgUrl:"",
      location:"",
      balance:"",
      numberOfPromotions:0,
      showModal: false,
      disable: true,
      }
  };

  handleFormSubmit = event => {
    event.preventDefault();    
    const { username, location, imgUrl } = this.state;

    customerService.updateCustomer ({ username, location,imgUrl })
    .then((customer) => {
      console.log(customer)
      this.setState({
        imgUrl: customer.imgUrl,
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

    customerService.imageUpload(uploadData)
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
    "background": '#ff6126',
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

    customerService.getCustomer()
    .then((customer) => {
      console.log(customer)
      const selectedCustomer = customer;
      this.setState({numberOfPromotions : selectedCustomer.pinnedbusiness.length,...selectedCustomer});

    }).catch((err) => console.log(err));  
  }

  render() {
    const {username, imgUrl, location, balance, numberOfPromotions} = this.state;
    return (
      <div className="customer-card-page">

      <div className="business-card-wrapper" >
          <img src="https://www.pngrepo.com/png/156718/170/pencil-hand-drawn-tool-outline.png" onClick={this.toggleModal} className="edit-button"/>
          <div className="business-card-img">
            <img src={imgUrl} alt={username}/>
          </div>
          <div className="business-card-data-wrapper">
            <div className="business-card-title">
              <h3>{username}</h3>
              <p style={{color:"#c7c7c7"}}>{location}</p>
            </div>
            <div className="business-card-data">
            <p>Balance: <span style={this.style()}>{this.props.balance}</span></p>
            <p>Promotions: <span style={this.style()}>{numberOfPromotions}</span></p>
            </div>
          </div>
        </div>

        {
          this.state.showModal ?
        <form onSubmit={this.handleFormSubmit} className="modal-edit-form">
        <h3>Update profile</h3>
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
            <img src={imgUrl}/>
          </div>
            <p>Update picture</p>
          </>
          
          }
          </label>
          
          </div>
          <label>Your name:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <label>Your location:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={this.handleChange}
          />
         { this.state.disable ? <input type="submit" value="Update!" disabled className="form-button-disabled"/>:<input type="submit" value="Update!" className="form-button-customer"/>}
        </form>
        :
        null
        }
      </div>

    )
  }
}
