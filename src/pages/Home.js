import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Home extends Component {
  bodyBgDefault =() =>{
    const body = document.querySelector("body");
    body.classList.add("signup-bg-color-black");
    body.classList.remove("signup-bg-color-customer");
    body.classList.remove("signup-bg-color-business");
  }
  componentDidMount(){
    this.bodyBgDefault();
  }
  render() {
    return (
      <div className="home-splash-wrapper">
        <div className="home-splash-title">
          <img src="https://cdn.2kgames.com/2019/03/29/5c9e4c5cc8eccBL3_logo.png" alt=""/>
        </div>      
        <div className="home-splash-description">
          <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c25a34d3-beb0-44ae-8a1d-d442502cb59d/dbg2gy3-e0412cb4-31d3-4007-ae09-f79cf53aa699.png/v1/fill/w_894,h_894,strp/rick_icon_by_niorunn_dbg2gy3-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYwMCIsInBhdGgiOiJcL2ZcL2MyNWEzNGQzLWJlYjAtNDRhZS04YTFkLWQ0NDI1MDJjYjU5ZFwvZGJnMmd5My1lMDQxMmNiNC0zMWQzLTQwMDctYWUwOS1mNzljZjUzYWE2OTkucG5nIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.IHhZCkjOSUblG0Qr6mjdI-ZF9GJ5JJg4sKUG3p51EKU" alt="" />
        </div>
        <div className="home-splash-buttons">
          <Link to="/signup"><button className="home-button-signup">SIGN UP</button></Link>
          <p className="login-link-text-color">Already have an account,<Link to="/login">LOG IN</Link></p>
        </div>  
      </div>
    );
  }
}

export default withAuth(Home);
