import React from "react";

import { Table, Divider, Tag } from "antd";

const { Column, ColumnGroup } = Table;

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
  componentDidMount = () => {
    if (localStorage.authToken) {
      this.fetchUser(JSON.parse(localStorage.authToken));
    }
  };
  render() {
    return (
      <Table dataSource={posts}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <span>
              {tags.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a>Invite {record.lastName}</a>
              <Divider type="vertical" />
              <a>Delete</a>
            </span>
          )}
        />
      </Table>
    );
  }
}
