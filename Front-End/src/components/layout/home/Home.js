import React, { Component } from "react";
import PostItem from "../post/PostItem";
import axios from "axios";
import "./Home.scss";

export default class Home extends Component {
  state = {
    user: null,
    posts: null,
    isLoading: true
  };

  async componentDidMount() {
    if (localStorage.user) {
      this.fetchUser(JSON.parse(localStorage.user));
    }
  }

  /**
   * Fetches the recent posts
   * @param {string}
   */
  fetchPosts = async ({ authToken }) => {
    try {
      let posts = await axios.get("http://localhost:3000/api/timeline", {
        headers: {
          Authorization: authToken
        }
      });
      this.setState({ posts: posts.data.posts }, () =>
      );
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="home-main-container">
        {this.state.posts &&
          this.state.posts.map(post => {
            return <PostItem key={post._id} data={post} />;
          })}
      </div>
    );
  }
}
