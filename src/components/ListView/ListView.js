import React from "react";
import PropTypes from "prop-types";
import Rating from "@material-ui/lab/Rating";
import "./ListView.css";

export default function ListView(props) {
  return (
    props.places.length && <div className="ListView">
      {props.places.map((place, ind) => {
        return (
          <div className="list" key={"ls" + ind}>
            <div className="left">
              <div>{place.name}</div>
              <div className="address">{place.formatted_address || place.vicinity}</div>
              <Rating name="read-only" value={place.rating} readOnly size="small" className="star"/>
              <div className="rating"> 
              ({place.rating}/5)
              </div>
            </div>
            <img src={(place.photos && place.photos.length) ? place.photos[0].getUrl() : place.icon} alt="img" className="right" width="100px" height="100px" />
            
          </div>
        )
      })
      }
    </div>
  );
}

ListView.propTypes = {
  places: PropTypes.array,
}
