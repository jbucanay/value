import React from "react";
import { Switch, Route } from "react-router-dom";
import People from "./components/people/People";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Profile from "./components/people/Profile";
import Chat from "./components/chat/Chat";

export default (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/chat" component={Chat} />
    <Route path="/profile" component={Profile} />
    <Route exact path="/" component={People} />
  </Switch>
);
