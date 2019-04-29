import React from "react";
import { Switch, Route } from "react-router-dom";
import People from "./components/people/People";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Finish from "./components/login/Finish";

export default (
  <Switch>
    <Route exact path="/" component={People} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/finish" component={Finish} />
  </Switch>
);
