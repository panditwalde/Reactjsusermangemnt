import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Components/JsFiles/Login";
import Dashboard from "../Components/JsFiles/Dashboard";
import Profile from "../Components/JsFiles/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Edituserdetails from "../Components/JsFiles/Edituserdetails";
import DashboardComponents from "../Components/JsFiles/DashboardComponents";
import Userlist from "../Components/JsFiles/Userlist";
import Userregistrtion from "../Components/JsFiles/Userregistrtion";
import Toplocation from "../Components/JsFiles/Toplocation";
class Routing extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact={true} component={Login} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="/dashboard/user" component={DashboardComponents} />
        <Router path="/dashboard/profile" component={Profile} />
        <Router path="/dashboard/register" component={Userregistrtion} />
        <Router path="/dashboard/locations" component={Toplocation} />
        <Router path="/dashboard/userList" component={Userlist} />
        <Router path="/dashboard/edit/:user" component={Edituserdetails} />
      </Router>
    );
  }
}

export default Routing;
