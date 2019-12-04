import React from "react";
import axios from "axios";
import "../login/Login.scss";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
  state = {
    email: "",
    password: "",
    name: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.postUserData();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postUserData = async () => {
    // Post the user data
    const res = await axios
      .post(`http://localhost:3000/api/users/register`, this.state)
      .then(data => {
        // TODO: Add logic to render different dashboard
        this.props.history.push("/login");
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1 className="login-title">Register</h1>
          </div>
          <div className="link-container">
            <Link className="link" to="/login">
              Have an account?
            </Link>
          </div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  }
}
