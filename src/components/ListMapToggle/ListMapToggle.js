import React from "react";
import PropTypes from "prop-types";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

const CustomSwitch = withStyles({
  switchBase: {
    color: "orange",
    "&$checked": {
      color: "orange",
    },
    "&$checked + $track": {
      backgroundColor: "orange",
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function ListMapToggle(props) {
  return (
    <React.Fragment>
    <CustomSwitch checked={props.selected} onChange={props.toggle} value={"Maps"}/>
    Show on Map
    </React.Fragment>
  );
}

ListMapToggle.propTypes = {
  selected: PropTypes.bool,
  toggle: PropTypes.func,
}
