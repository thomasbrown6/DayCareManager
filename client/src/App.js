import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./mediaqueries.css";
import "./App.css";

import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import CreateDaycare from "./components/daycare-forms/CreateDaycare";
import Daycare from "./components/daycare/Daycare";
import Classrooms from "./components/classroom/Classrooms";
import Expenses from "./components/expenses/Expenses";
import Students from "./components/student/Students";
import PrivateRoute from "./components/routing/PrivateRoute";
import Copyright from "./components/layout/Copyright";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Home} />
          <section className={`container main-container`}>
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/dashboard/daycare/:id"
                component={Daycare}
              />
              <PrivateRoute exact path="/classrooms" component={Classrooms} />
              <PrivateRoute exact path="/expenses" component={Expenses} />
              <PrivateRoute
                exact
                path="/create-daycare"
                component={CreateDaycare}
              />
              <PrivateRoute exact path="/students" component={Students} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
