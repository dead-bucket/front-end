import React, { Component } from "react";
import Slider from "react-slick";
import CloseButton from "@material-ui/icons/Close";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      nextArrow: <CloseButton to="next" />,
      slidesToScroll: 1
    };
    return (
      <div style={{ width: "300px" }}>
        <Slider {...settings}>
          <div>
            <h3>1212131332</h3>
          </div>
          <div>
            <h3>3131212312323</h3>
          </div>
          <div>
            <h3>3133331312212</h3>
          </div>
          <div>
            <h3>32232322442242</h3>
          </div>
          <div>
            <h3>4336t46623452</h3>
          </div>
          <div>
            <h3>572363542642</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
