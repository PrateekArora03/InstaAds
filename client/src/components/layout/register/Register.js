import React from "react";
import axios from "axios";
import { message } from "antd";

export default class Register extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    username: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.postUserData();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postUserData = async () => {
    let { username, email, password, name } = this.state;
    if (!username || !email || !password || !name) {
      message.warning("Please fill all requied details");
    } else if (password.length < 6) {
      message.warning("Password must contain 6 letters!");
    }
    // Post the user data
    else {
      await axios
        .post(`http://localhost:3000/api/users/register`, this.state)
        .then(data => {
          message.success("your successful Register Now you can login");
          this.props.history.push("/login");
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1 className="login-title">Register</h1>
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
