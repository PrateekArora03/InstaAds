import React from "react";
import axios from "axios";

import { Table, Divider, message } from "antd";

const { Column } = Table;

class DashBoard extends React.Component {
  state = {
    posts: [],
    onGoingAds: []
  };

  fetchPosts = async authToken => {
    try {
      const res = await axios.get("/api/admin/adPost", {
        headers: {
          Authorization: authToken
        }
      });
      // Update the state
      this.setState({ posts: res.data.posts, onGoingAds: res.data.onGoingAds });
    } catch (err) {
      console.error(err);
    }
  };

  approvePost = async id => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      const res = await axios.patch("/api/admin/adPost/" + id, null, {
        headers: {
          Authorization: token
        }
      });
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
      const res = await axios.delete(`/api/adPost/${id}`, {
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
      <div>
        <Table rowKey="_id" dataSource={this.state.posts}>
          <Column title="Author" dataIndex="author.name" key="author" />
          <Column
            title="Post"
            key="media"
            render={(text, postData) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={postData.media}
              >
                {postData.description}
              </a>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, postData) => (
              <span>
                <a
                  title="Approve Post"
                  onClick={() => this.approvePost(postData._id)}
                >
                  Approve
                </a>
                <Divider type="vertical" />
                <a
                  title="Delete Post"
                  onClick={() => this.deletePost(postData._id)}
                >
                  Delete
                </a>
              </span>
            )}
          />
        </Table>
        <h1>ON GOING ADS</h1>
        <Table rowKey="_id" dataSource={this.state.onGoingAds}>
          <Column title="Author" dataIndex="author.name" key="author" />
          <Column
            title="Post"
            key="media"
            render={(text, postData) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={postData.media}
              >
                {postData.description}
              </a>
            )}
          />
          <Column title="Like" dataIndex="like.length" key="like" />
          <Column title="Views" dataIndex="views" key="views" />
          <Column title="Expire Date" dataIndex="expireDate" key="expireDate" />
          <Column
            title="Delete Post"
            key="action"
            render={(text, postData) => (
              <span>
                <a
                  title="Delete Post"
                  onClick={() => this.deletePost(postData._id)}
                >
                  Delete
                </a>
              </span>
            )}
          />
        </Table>
      </div>
    );
  }
}

export default DashBoard;
