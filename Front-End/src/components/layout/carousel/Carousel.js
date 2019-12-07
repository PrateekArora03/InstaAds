import React from "react";
import axios from "axios";

import { Carousel as Slider } from "antd";
import "./carousel.scss";

class Carousel extends React.Component {
  state = {};
  componentDidMount = async () => {
    const res = await axios.get("http://localhost:3000/admin/banner", {
      headers: {
        Authorization: localStorage.authToken
      }
    });
    if (res.data.Ads) {
      console.log(res.data.Ads);
    }
  };
  render() {
    return (
      <Slider autoplay>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Slider>
    );
  }
}

export default Carousel;
