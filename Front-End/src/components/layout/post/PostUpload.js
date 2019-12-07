import React, { Component } from "react";

import ImageUpload from "./ImageUpload";
import axios from "axios";

import { Input, Button, message } from "antd";

import "./postupload.scss";

const { TextArea } = Input;

class PostUpload extends Component {
  state = {
    loading: false,
    postData: {
      description: "",
      media: ""
    }
  };

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
      if (this.state.postData.description && this.state.postData.media) {
        const post = await axios.post(
          "http://localhost:3000/api/post",
          this.state.postData,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("authToken"))
            }
          }
        );
        this.setState({
          postData: { description: "", media: "" },
          loading: false
        });
      } else {
        message.warning("Please Add Post Content and media");
        this.setState({ loading: false });
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
export default PostUpload;
