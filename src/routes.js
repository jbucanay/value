import React from "react";
import { Switch, Route } from "react-router-dom";
import People from "./components/people/People";
import Login from "./components/login/Login";

export default (
  <Switch>
    <Route exact path="/" component={People} />
    <Route path="/login" component={Login} />
  </Switch>
);
