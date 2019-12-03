import React from "react";
import axios from "axios";

import { Table, Divider } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "Post",
    dataIndex: "post",
    key: "post"
  },
  {
    title: "Image",
    dataIndex: "img",
    key: "img"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a>Accept</a>
        <Divider type="vertical" />
        <a>Reject</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

class Dashboard extends React.Component {
  state = {
    posts: null
  };
  fetchPosts = async ({ authToken }) => {
    const res = await axios.get("https://localhost:3000/api/admin/dashboard", {
      headers: {
        Authorization: authToken
      }
    });
    this.setState({ posts: res.data.posts });
  };

  async componentDidMount() {
    if (localStorage.user) {
      this.fetchUser(JSON.parse(localStorage.user));
    }
  }
}

module.exports = <Table columns={columns} dataSource={data} />;
