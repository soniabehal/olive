import React from "react";
import PropTypes from "prop-types";
import "./Marker.css";

const Marker = props => (
  <div className="marker">
    <img src={props.icon} alt={props.text} className="img"/>
    </div>
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  text: PropTypes.string,
  icon:PropTypes.string,
};

export default Marker;