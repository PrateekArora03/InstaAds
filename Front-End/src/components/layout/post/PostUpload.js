import React, { Component } from "react";
import axios from "axios";

import { Input, Button, message, Upload, Icon } from "antd";

import "./postupload.scss";

const { TextArea } = Input;

class PostUpload extends Component {
  state = {
    loading: false,
    value: ""
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  postData = async () => {
    this.setState({ loading: true });
    try {
      if (this.state.value.length > 0) {
        const post = await axios.post(
          "http://localhost:3000/api/post",
          { description: this.state.value },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("authToken"))
            }
          }
        );
        this.setState({ loading: false });
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const props = {
      name: "file",
      action: "http://localhost:3000/api/post/upload",
      headers: {
        authorization: JSON.parse(localStorage.getItem("authToken"))
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
          console.log(info, "info");
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    return (
      <form className="post-upload-form">
        <div className="input-post">
          <TextArea
            rows={4}
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Image
            </Button>
          </Upload>
        </div>
        <Button
          type="primary"
          loading={this.state.loading}
          onClick={this.postData}
        >
          Post
        </Button>
      </form>
    );
  }
}
export default PostUpload;
