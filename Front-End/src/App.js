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

  fetchUser = async authToken => {
    try {
      const req = await axios.get("http://localhost:3000/api/users", {
        headers: {
          Authorization: authToken
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
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route component={Page404} />
        </Switch>
      );
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
          <Route component={Page404} />
        </Switch>
      );
    }
  };

  componentDidMount = async () => {
    if (localStorage.authToken) {
      this.fetchUser(JSON.parse(localStorage.authToken));
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        {/*TODO: Add last default Route for error 404 */}
        {this.Routes(this.state.user)}
      </div>
    );
  }
}

export default App;
