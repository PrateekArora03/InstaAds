import React from "react";
import Header from "./components/layout/header/Header";
import Profile from "./components/layout/profile/Profile";
import Home from "./components/layout/home/Home";
import Page404 from "./components/layout/static/Page404";
import Login from "./components/layout/login/Login";
import Register from "./components/layout/register/Register";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  state = {
    user: null
  };

  fetchUser = async token => {
    try {
      const req = await axios.get("http://localhost:3000/api/user", {
        headers: {
          Authorization: token
        }
      });
      // Update the state
      this.setState({ user: req.data.user });
    } catch (err) {
      localStorage.clear();
      console.error(err);
    }
  };

  /**
   * Returns routes based on condition
   * @param {string}
   * @return {object}
   */
  Routes = user => {
    // Protected Routes
    if (user) {
      return (
        <Switch>
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/timeline' component={Home} />
          <Route component={Page404} />
        </Switch>
      );
    }
    // Unprotected Routes
    else {
      return (
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/' component={Login} />
          <Route component={Page404} />
        </Switch>
      );
    }
  };
  componentDidMount = async () => {
    if (localStorage.authToken) {
      this.fetchUser(JSON.parse(localStorage.user.authToken));
    }
  };
  render() {
    return (
      <div className='App'>
        <Header />
        {/*TODO: Add last default Route for error 404 */}
        {this.Routes(this.state.user)}
      </div>
    );
  }
}

export default App;
