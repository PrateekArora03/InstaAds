import React, { Component } from "react";
import axios from "axios";
import { Input, Button, message, Switch } from "antd";
import { withRouter } from "react-router-dom";

import ImageUpload from "./ImageUpload";

import "./postupload.scss";

const { TextArea } = Input;

class PostUpload extends Component {
  state = {
    loading: false,
    postData: {
      description: "",
      media: "",
      isImage: true
    }
  };

  toggle = e => {
    this.setState({
      postData: { ...this.state.postData, isImage: e, media: "" }
    });
  };

  handleChange = e => {
    let obj = { ...this.state.postData };
    obj[e.target.name] = e.target.value;
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
        await axios.post(
          `/api/${this.props.match.path === "/new" ? "post" : "adpost"}`,
          this.state.postData,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("authToken"))
            }
          }
        );
        message.success(
          this.props.match.path === "/new"
            ? "Your post is being review by admin"
            : "Admin will mail you regarding the ads!"
        );
        this.props.history.push("/");
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
            placeholder="Description"
            name="description"
            value={this.state.postData.description}
            onChange={this.handleChange}
          />
          <Switch
            style={{ float: "right" }}
            checkedChildren="Image"
            unCheckedChildren="Video"
            defaultChecked={true}
            onClick={this.toggle}
          />
          {this.state.postData.isImage ? (
            <ImageUpload imageUpdate={this.imageUpdate} />
          ) : (
            <Input
              name="media"
              value={this.state.postData.media}
              onChange={this.handleChange}
              placeholder="please enter youtube video link!"
            />
          )}
        </div>
        <Button
          type="primary"
          loading={this.state.loading}
          onClick={this.postDataSend}
        >
          {this.props.match.path === "/new" ? "Create Post" : "Create Ad"}
        </Button>
      </form>
    );
  }
}
export default withRouter(PostUpload);
