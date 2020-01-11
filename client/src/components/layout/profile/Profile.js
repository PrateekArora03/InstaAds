import React from "react";
import axios from "axios";
import PostItem from "../post/PostItem";
import { Avatar, Modal, Input, Select, message, Switch } from "antd";

import "./Profile.scss";

const Option = Select;

class Profile extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    formData: {
      name: "",
      email: "",
      username: "",
      picture: "",
      description: ""
    },
    post: [],
    adPost: [],
    checked: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = async () => {
    try {
      this.setState({
        confirmLoading: true
      });

      const res = await axios.put(
        "/api/profile/" + this.state.formData.username,
        this.state.formData,
        {
          headers: {
            Authorization: JSON.parse(localStorage.authToken)
          }
        }
      );

      this.setState({
        visible: false,
        confirmLoading: false,
        formData: res.data.user
      });

      message.success(res.data.message);
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        console.error(error);
      }
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }
  };

  onChange = e => {
    this.setState({ ...this.state, checked: e });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      confirmLoading: false
    });
  };

  handleChange = e => {
    if (e === "male" || e === "female") {
      this.setState({
        ...this.state,
        formData: { ...this.state.formData, gender: e }
      });
    } else {
      this.setState({
        ...this.state,
        formData: { ...this.state.formData, [e.target.name]: e.target.value }
      });
    }
  };

  fetchUser = async username => {
    try {
      const res = await axios.get(`/api/profile/${username}`, {
        headers: {
          Authorization: JSON.parse(localStorage.authToken)
        }
      });
      this.setState({
        ...this.state,
        post: res.data.user.post,
        adPost: res.data.user.adPost
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async () => {
    this.setState({ ...this.state, formData: this.props.data });
    this.fetchUser(this.props.data.username);
  };

  render() {
    const {
      name,
      picture,
      description,
      email,
      contact,
      gender,
      city,
      qualification,
      country
    } = this.state.formData;
    return (
      <div className="profile-container">
        <div className="profile container center">
          <div className="profile-img-section">
            {picture ? (
              <img alt="profile" className="user-profile-img" src={picture} />
            ) : (
              <Avatar
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf"
                }}
              >
                {name.split(" ")[0]}
              </Avatar>
            )}
          </div>
          <div className="profile-main">
            <h3 className="user-name">{name}</h3>
            <div className="user-des-container">
              <p className="user-description">{description}</p>
              <p className="user-email user-det">{email}</p>
              <p className="user-email user-det">{contact}</p>
            </div>
            <div className="user-des-container">
              <p className="user-gender user-det">
                {gender && gender.toUpperCase()}
              </p>
              <p className="user-qualification user-det">{qualification}</p>
              <p className="user-city user-det">{city}</p>
              <p className="user-country user-det">{country}</p>
            </div>

            <button className="btn-edit-link" onClick={this.showModal}>
              Edit Profile
            </button>
          </div>
        </div>
        <Modal
          title="Edit Profile"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          className="input-margin"
        >
          <Input
            type="text"
            value={this.state.formData.name}
            placeholder="Name"
            name="name"
            onChange={this.handleChange}
          />
          <Input
            type="text"
            value={this.state.formData.picture}
            placeholder="Image url"
            name="picture"
            onChange={this.handleChange}
          />
          <Input
            type="number"
            value={this.state.formData.contact}
            placeholder="Mobile No"
            name="contact"
            onChange={this.handleChange}
          />
          <Select
            onChange={this.handleChange}
            placeholder="Gender"
            value={this.state.formData.gender}
            defaultValue="male"
            style={{ width: 120 }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
          <Input
            onChange={this.handleChange}
            value={this.state.formData.address}
            type="text"
            placeholder="Address"
            name="address"
          />
          <Input
            type="text"
            onChange={this.handleChange}
            value={this.state.formData.city}
            placeholder="city"
            name="city"
          />
          <Input
            type="text"
            onChange={this.handleChange}
            value={this.state.formData.country}
            placeholder="country"
            name="country"
          />
          <Input
            type="text"
            onChange={this.handleChange}
            value={this.state.formData.qualification}
            placeholder="qualification"
            name="qualification"
          />
        </Modal>
        <div style={{ width: "80%" }}>
          <Switch
            checkedChildren="AdPost"
            unCheckedChildren="Post"
            style={{ float: "right" }}
            onChange={this.onChange}
          />
        </div>
        <div className="profile-post-div">
          {this.state.post && !this.state.checked === true
            ? this.state.post.map(post => (
                <PostItem
                  className="profile-post"
                  key={post._id}
                  user={this.props.user}
                  fetchPosts={this.fetchPosts}
                  data={post}
                  view="profile"
                />
              ))
            : this.state.adPost.map(post => (
                <PostItem
                  className="profile-post"
                  key={post._id}
                  user={this.props.user}
                  fetchPosts={this.fetchPosts}
                  data={post}
                  view="profile"
                />
              ))}
        </div>
      </div>
    );
  }
}

export default Profile;
