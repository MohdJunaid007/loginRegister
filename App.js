import Login from './pages/login/Login';
import ErrorPage from './pages/error/ErrorPage';
import Home from './pages/home/Home';
import React from 'react';
import Dashboard from './pages/dashboard/Dashboard'
import { Switch, Route, Redirect, Routes } from "react-router";
import { HashRouter, BrowserRouter as Router } from 'react-router-dom';

///import { HashRouter } from "react-router-dom";
import './App.css';

// -- Redux
import { connect } from "react-redux";

// -- Third Party Libs
import { ToastContainer } from "react-toastify";

// -- Component Styles
import "./styles/app.scss";

import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
// import Logout from './pages/logout/Logout';

function App(props) {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/error" component={ErrorPage} />
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profile" component={Profile} />
          {/* <Route exact path="logout" component={Logout} /> */}
          <Route path='*' exact={true} render={() => <Redirect to="/error" />} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;




