import React from "react";
import axios from "axios";

import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

class MyCarousel extends React.Component {
  state = {};
  componentDidMount = async () => {
    try {
      const res = await axios.get("/api/carousel");
      console.log(res.data.ads);
      this.setState({ banner: res.data.ads });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        {this.state.banner && (
          <Carousel
            autoPlay={5000}
            animationSpeed={2000}
            infinite
            slidesPerPage={1}
          >
            <img
              style={{ width: "100%", height: "auto" }}
              src={this.state.banner.carousel.A}
            />
            <img
              style={{ width: "100%", height: "auto" }}
              src={this.state.banner.carousel.B}
            />
            <img
              style={{ width: "100%", height: "auto" }}
              src={this.state.banner.carousel.C}
            />
            <img
              style={{ width: "100%", height: "auto" }}
              src={this.state.banner.carousel.D}
            />
          </Carousel>
        )}
      </div>
    );
  }
}
export default MyCarousel;
