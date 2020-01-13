import React from "react";
import "./SearchBox.css";
import ListMapToggle from "../ListMapToggle/ListMapToggle";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';

class Searchbox extends React.PureComponent {

  componentDidMount({ map, mapApi } = this.props) {
    this.searchBox = new mapApi.places.SearchBox(this.searchInput);
    this.searchBox.addListener("places_changed", this.onPlacesChanged);
    this.searchBox.bindTo("bounds", map);
  }

  onPlacesChanged = ({ fetchData } = this.props) => {
    const selected = this.searchBox.getPlaces();
    const { 0: place } = selected;
    if (!place.geometry) return;
    fetchData(place.geometry.location.lat(), place.geometry.location.lng());
    this.searchInput.blur();
  };

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  render() {
    return (
      <div className="header">
        <input
          id="search-box"
          className="SearchBox"
          placeholder="Search for restraurant"
          ref={(ref) => {
            this.searchInput = ref;
          }}
          type="text"
        />
        <div className="listToggle">
          <Button variant="contained" color="primary" className={"button"} onClick={this.props.setCurrentLocation}>
            Use My Location
          </Button>
          <ListMapToggle
            selected={this.props.selected}
            toggle={this.props.toggle}
            size="small" />
        </div>
      </div>
    );
  }
}

export default Searchbox;

Searchbox.propTypes = {
  map: PropTypes.object,
  mapApi: PropTypes.object,
  fetchData: PropTypes.func,
  selected: PropTypes.bool,
  toggle: PropTypes.func,
  setCurrentLocation:PropTypes.func,
}

