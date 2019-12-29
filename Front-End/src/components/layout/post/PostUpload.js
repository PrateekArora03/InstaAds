import React, { Component } from "react";
import axios from "axios";
import { Input, Button, message } from "antd";
import { withRouter } from "react-router-dom";

import ImageUpload from "./ImageUpload";

import "./postupload.scss";

const { TextArea } = Input;

class PostUpload extends Component {
  state = {
    loading: false,
    isEdit: false,
    postData: {
      description: "",
      media: ""
    }
  };

  async componentDidMount() {
    // It fetches the data if url has post id
    console.log(this.props.match.params);
    if (this.props.match.params.id) {
      /* Change the state if*/
      this.setState({ isEdit: true });

      const postId = this.props.match.params.id;
      // Make the post fetch request
      const token = JSON.parse(localStorage.getItem("authToken"));
      try {
        const res = await axios.get(`/api/post/${postId}`, {
          headers: {
            Authorization: token
          }
        });
        const post = res.data.post;
        // Update the state's postData with response
        this.setState({
          postData: { description: post.description, media: post.media }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  handleChange = e => {
    let obj = { ...this.state.postData };
    obj.description = e.target.value;
    this.setState({ postData: obj });
  };

  imageUpdate = media => {
    let obj = { ...this.state.postData };
    obj.media = media;
    this.setState({ postData: obj });
  };
  postDataSend = async () => {
    this.setState({ loading: true });
    try {
      if (this.state.isEdit) {
        if (this.state.postData.description || this.state.postData.media) {
          const post = await axios.put("/api/post", this.state.postData, {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("authToken"))
            }
          });
          this.setState({
            postData: { description: "", media: "" },
            loading: false
          });
        } else {
          message.warning("Please Add Post Content and media");
          this.setState({ loading: false });
        }
      } else {
        if (this.state.postData.description && this.state.postData.media) {
          const post = await axios.post("/api/post", this.state.postData, {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("authToken"))
            }
          });
          this.setState({
            postData: { description: "", media: "" },
            loading: false
          });
        } else {
          message.warning("Please Add Post Content and media");
          this.setState({ loading: false });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <form className="post-upload-form home-main-container">
        <div className="input-post">
          <TextArea
            rows={6}
            value={this.state.postData.description}
            onChange={this.handleChange}
          />
          <ImageUpload imageUpdate={this.imageUpdate} />
        </div>
        <Button
          type="primary"
          loading={this.state.loading}
          onClick={this.postDataSend}
        >
          Post
        </Button>
      </form>
    );
  }
}
export default withRouter(PostUpload);
