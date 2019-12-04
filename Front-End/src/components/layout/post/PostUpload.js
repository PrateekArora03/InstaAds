import React, { Component } from "react";

import { Input, Button, message, Upload, Icon } from "antd";

import "./postupload.scss";

const { TextArea } = Input;

class PostUpload extends Component {
  state = {
    loading: false,
    value: ""
  };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const props = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text"
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
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
            value={this.state.input}
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
          onClick={this.enterLoading}
        >
          Post
        </Button>
      </form>
    );
  }
}
export default PostUpload;
