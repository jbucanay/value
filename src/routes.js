import React from "react";
import { Switch, Route } from "react-router-dom";
import People from "./components/people/People";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";

import Shop from "./components/shop/Shop";
import Leadership from "./components/leadership/Leadership";

export default (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/shop" component={Shop} />
    <Route path="/leadership" component={Leadership} />
    <Route exact path="/" component={People} />
  </Switch>
);
