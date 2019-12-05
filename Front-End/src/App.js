import React from "react";
import axios from "axios";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Header from "./components/layout/header/Header";
import Profile from "./components/layout/profile/Profile";
import Home from "./components/layout/home/Home";
import Page404 from "./components/layout/static/Page404";
import Login from "./components/layout/login/Login";
import Register from "./components/layout/register/Register";
import Dashboard from "./components/admin/dashboard";

import "antd/dist/antd.css";

class App extends React.Component {
  state = {
    user: null
  };

  fetchUser = async authToken => {
    try {
      const res = await axios.get("http://localhost:3000/api/users", {
        headers: {
          Authorization: authToken
        }
      });
      // Update the state
      this.setState({ user: res.data.user });
    } catch (err) {
      localStorage.clear();
      console.error(err);
    }
  };

  logOutUser = () => {
    localStorage.clear();
    this.setState({ user: null });
    this.props.history.push("/");
  };

  /**
   * Returns routes based on condition
   * @param {string}
   * @return {object}
   */
  Routes = user => {
    // Protected Routes
    if (user) {
      if (!user.isAdmin) {
        return (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/profile"
              render={() => {
                return <Profile data={this.state.user} />;
              }}
            />
            <Route exact path="/login">
              <Redirect to="/" />
            </Route>
            <Route component={Page404} />
          </Switch>
        );
      } else {
        return (
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login">
              <Redirect to="/" />
            </Route>
            <Route component={Page404} />
          </Switch>
        );
      }
    }
    // Unprotected Routes
    else {
      return (
        <Switch>
          <Route path="/register" component={Register} />
          <Route
            path="/login"
            render={() => <Login fetchUser={this.fetchUser} />}
          />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route component={Page404} />
        </Switch>
      );
    }
  };

  componentDidMount = async () => {
    if (localStorage.authToken) {
      this.fetchUser(JSON.parse(localStorage.authToken));
    } else {
      // If user isn't loged in then redirect it to login page
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div className="App">
        {/* Prevent to render header on login and register component */}
        {this.state.user ? <Header logOut={this.logOutUser} /> : ""}
        {this.Routes(this.state.user)}
      </div>
    );
  }
}

export default withRouter(App);
