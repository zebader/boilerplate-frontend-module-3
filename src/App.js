import React, { Component } from "react";
import { Switch } from "react-router-dom";
import './css/main.css'

import Navbar from "./components/Navbar";
import Business from "./pages/Business/Business";
import BusinessWorkerAdd from "./pages/Business/components/BusinessWorkerAdd";
import BusinessWorker from "./pages/Business/components/BusinessWorker";
import BusinessPromotionsAdd from "./pages/Business/components/BusinessPromotionAdd";
import BusinessPromotion from "./pages/Business/components/BusinessPromotion";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import PrivateBusinessRoute from "./components/PrivateBusinessRoute";
import PrivateCustomerRoute from "./components/PrivateCustomerRoute";

import AnonRoute from "./components/AnonRoute";
import AuthProvider from "./lib/AuthProvider";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          {/* <Navbar /> */}
          <Switch>
            <AnonRoute path="/" component={Home} exact/>
            <AnonRoute path="/signup" component={Signup} exact/>
            <AnonRoute path="/login" component={Login} exact/>
            <PrivateBusinessRoute path="/business" component={Business} exact/>
            <PrivateBusinessRoute path="/business/workers/:id" component={BusinessWorker} exact/>
            <PrivateBusinessRoute path="/business/workers-add" component={BusinessWorkerAdd} exact/>
            <PrivateBusinessRoute path="/business/promotions-add" component={BusinessPromotionsAdd} exact/>
            <PrivateBusinessRoute path="/business/promotions/:id" component={BusinessPromotion} exact/>
            <PrivateCustomerRoute path="/customer" component={Customer} exact/>
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
