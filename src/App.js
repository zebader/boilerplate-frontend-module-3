import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import Business from "./pages/Business/Business";
import BusinessWorkerAdd from "./pages/Business/components/BusinessWorkerAdd";
import BusinessWorker from "./pages/Business/components/BusinessWorker";
import BusinessPromotionsAdd from "./pages/Business/components/BusinessPromotionAdd";
import BusinessPromotion from "./pages/Business/components/BusinessPromotion";
import Customer from "./pages/Customer/Customer";
import Promotions from "./pages/Promotions/Promotions";
import PromotionsProfile from "./pages/Promotions/components/PromotionsProfile";
import PromotionsWorkerProfile from "./pages/Promotions/components/PromotionsWorkerProfile";
import PromotionsGetPromo from "./pages/Promotions/components/PromotionsGetPromo";
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
          <div className="black-bg-modal"></div>
          <Route path="/" component={Navbar} />
          <Switch>
            <AnonRoute path="/" component={Home} exact/>
            <AnonRoute path="/signup" component={Signup} exact/>
            <AnonRoute path="/login" component={Login} exact/>
            <PrivateBusinessRoute path="/business" component={Business} exact/>
            <PrivateBusinessRoute path="/business/workers-add" component={BusinessWorkerAdd} exact/>
            <PrivateBusinessRoute path="/business/workers/:id" component={BusinessWorker} exact/>
            <PrivateBusinessRoute path="/business/promotions-add" component={BusinessPromotionsAdd} exact/>
            <PrivateBusinessRoute path="/business/promotions/:id" component={BusinessPromotion} exact/>
            <PrivateCustomerRoute path="/customer" component={Customer} exact/>
            <PrivateCustomerRoute path="/promotions" component={Promotions} exact/>
            <PrivateCustomerRoute path="/promotions/:id" component={PromotionsProfile} exact/>
            <PrivateCustomerRoute path="/promotions/:id/workers/:workerId" component={PromotionsWorkerProfile} exact/>
            <PrivateCustomerRoute path="/promotions/:id/promotions/:promoId" component={PromotionsGetPromo} exact/>
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
