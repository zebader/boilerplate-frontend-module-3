import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import logo from './../img/tippjar-logo.png';
import coin from './../img/coin.png'

class Home extends Component {
  bodyBgDefault =() =>{
    const body = document.querySelector("body");
    body.classList.add("signup-bg-color-black");
    body.classList.remove("signup-bg-color-customer");
    body.classList.remove("signup-bg-color-business");
  }
  gimmick = (el) => {
    var exists = document.getElementById('gimmick')
    if (exists) {
        exists.parentNode.removeChild(exists);
        return false;
    }

    var element = document.querySelector(el);
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        focused = false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.id = 'gimmick'

    var coin = new Image();
    coin.src = 'https://i.imgur.com/2no4rII.png'
    // 440 wide, 40 high, 10 states
    coin.onload = function () {
        element.appendChild(canvas)
        focused = true;
        drawloop();
    }
    var coins = []

    function drawloop() {
        if (focused) {
            requestAnimationFrame(drawloop);
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (Math.random() < .3) {
            coins.push({
                x: Math.random() * canvas.width | 0,
                y: -50,
                dy: 3,
                s: 0.5 + Math.random(),
                state: Math.random() * 10 | 0
            })
        }
        var i = coins.length
        while (i--) {
            var x = coins[i].x
            var y = coins[i].y
            var s = coins[i].s
            var state = coins[i].state
            coins[i].state = (state > 9) ? 0 : state + 0.1
            coins[i].dy += 0.3
            coins[i].y += coins[i].dy

            ctx.drawImage(coin, 44 * Math.floor(state), 0, 44, 40, x, y, 44 * s, 40 * s)

            if (y > canvas.height) {
                coins.splice(i, 1);
            }
        }
    }

}
  componentDidMount(){
    this.bodyBgDefault();
    this.gimmick("body"); 
  }
  render() {
    return (
      <div className="home-splash-wrapper">
        <div className="home-splash-title">
          <img src={logo} alt=""/>
          <h2 style={{color:"white",textAlign:"center",fontFamily: 'K2D',lineHeight:"1.2"}}>Happy workers, <br/> <span style={{color:"#ff9d2f",fontWeight:"900"}}>AMAZING</span><br/> discounts</h2>
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
