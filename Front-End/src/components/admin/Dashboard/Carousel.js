import React, { Component } from "react";
import axios from "axios";
import { Switch, Input, Button, message } from "antd";

import "./carousel.scss";

class Carousel extends Component {
  state = {
    banner: ""
  };

  changeImage = e => {
    this.setState({
      banner: {
        ...this.state.banner,
        carousel: {
          ...this.state.banner.carousel,
          [e.target.name]: e.target.value
        }
      }
    });
  };

  changeVideo = e => {
    this.setState({
      banner: {
        ...this.state.banner,
        video: e.target.value
      }
    });
  };

  toggle = e => {
    this.setState({
      banner: { ...this.state.banner, toggle: e === true ? "image" : "video" }
    });
  };

  handleSubmit = async () => {
    try {
      const res = await axios.patch("/api/carousel", this.state.banner, {
        headers: {
          Authorization: JSON.parse(localStorage.authToken)
        }
      });
      message.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async () => {
    try {
      const res = await axios.get("/api/carousel/");
      console.log(res.data);
      this.setState({ banner: res.data.ads });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const check = this.state.banner.toggle === "image" ? true : false;
    console.log(check);
    return (
      this.state.banner && (
        <div className="carousel-container">
          <Switch
            className="carousel-switch"
            checkedChildren="Image"
            unCheckedChildren="Video"
            defaultChecked={check}
            onClick={this.toggle}
          />
          {check === true ? (
            <div>
              <Input
                placeholder="Banner Image  1"
                value={this.state.banner.carousel.A}
                onChange={this.changeImage}
                name="A"
              />
              <Input
                placeholder="Banner Image  2"
                value={this.state.banner.carousel.B}
                onChange={this.changeImage}
                name="B"
              />
              <Input
                placeholder="Banner Image  3"
                value={this.state.banner.carousel.C}
                onChange={this.changeImage}
                name="C"
              />
              <Input
                placeholder="Banner Image  4"
                value={this.state.banner.carousel.D}
                onChange={this.changeImage}
                name="D"
              />
            </div>
          ) : (
            <div>
              <Input
                placeholder="Video Link"
                value={this.state.banner.video}
                onChange={this.changeVideo}
              />
            </div>
          )}
          <Button
            style={{ width: "100px" }}
            type="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </div>
      )
    );
  }
}

export default Carousel;
