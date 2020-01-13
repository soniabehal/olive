import React from "react";
import "./UseMyLocation.css";
import MyLocation from "./MyLocation.svg";
import PropTypes from "prop-types";

export default function UseMyLocation(props) {
  return (
    <div className="UseMyLocation" onClick={props.setCurrentLocation}>
      <img className="MyLocationIcon" src={MyLocation} alt="Use My Location" />
    </div>
  );
}

UseMyLocation.propTypes={
  setCurrentLocation:PropTypes.func,
}
