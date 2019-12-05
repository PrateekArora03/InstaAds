import React from "react";
import axios from "axios";

import { Table, Divider, message } from "antd";

import "./dashboard.scss";

const { Column } = Table;

class DashBoard extends React.Component {
  state = {
    posts: []
  };

  fetchPosts = async authToken => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/dashboard", {
        headers: {
          Authorization: authToken
        }
      });
      // Update the state
      this.setState({ posts: res.data.posts });
    } catch (err) {
      console.error(err);
    }
  };

  approvePost = async id => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/admin/post/" + id,
        null,
        {
          headers: {
            Authorization: token
          }
        }
      );
      if (res.data.status === "success") {
        this.fetchPosts(token);
        message.success("approve success");
      } else {
        message.error("Failed to approve");
      }
    } catch (err) {
      console.error(err);
    }
  };

  deletePost = async id => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      const res = await axios.delete(`http://localhost:3000/api/post/${id}`, {
        headers: {
          Authorization: token
        }
      });
      if (res.data.status === "success") {
        this.fetchPosts(token);
        message.success("delete success");
      } else {
        message.error("delete failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount = () => {
    if (localStorage.authToken) {
      this.fetchPosts(JSON.parse(localStorage.authToken));
    }
  };

  render() {
    return (
      <Table className="table" rowKey="_id" dataSource={this.state.posts}>
        <Column title="Author" dataIndex="author.name" key="author" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Action"
          key="action"
          render={(text, postData) => (
            <span>
              <a
                title="author.name"
                onClick={() => this.approvePost(postData._id)}
              >
                Approve
              </a>
              <Divider type="vertical" />
              <a onClick={() => this.deletePost(postData._id)}>Delete</a>
            </span>
          )}
        />
      </Table>
    );
  }
}

export default DashBoard;
