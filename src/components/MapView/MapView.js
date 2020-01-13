import React from "react";
import "./MapView.css";
import SearchBox from "../SearchBox/SearchBox";
import UseMyLocation from "../UseMyLocation/UseMyLocation";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import Marker from "../Marker/Marker";
import { GOOGLE_API_KEY as apiKey } from "../../constants";
class MapView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      places: [],
      geocoder: null,
    };
  }

  handleMapClicked = (details, event) => {
    this.fetchData(details.lat, details.lng);
  };

  fetchData = async (latitude, longitude) => {
    const { mapInstance, mapApi } = this.state;
    const latlng = { lat: latitude, lng: longitude };
    const request = {
      location: latlng,
      radius: 500,
      type: "restaurant"
    };

    const service = new mapApi.places.PlacesService(mapInstance);
    service.nearbySearch(request, (results, status) => {
      if (status === "OK") {
        const { 0: place } = results;
        if (!place.geometry) return;
        if (place.geometry.viewport) {
          mapInstance.fitBounds(place.geometry.viewport);
        } else {
          mapInstance.setCenter(place.geometry.location);
          mapInstance.setZoom(17);
        }
        this.addPlace(results);
      }
      else {
        console.log("Not able to fetch restaurants for selected location");
      }
    });
  }

  setCurrentLocation = () => {
    const { mapInstance, mapApi } = this.state;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
        let infoWindowHTML = "Current Location";
        let infoWindow = new mapApi.InfoWindow({ map: mapInstance, content: infoWindowHTML });
        let currentLocation = { lat: currentLatitude, lng: currentLongitude };
        mapInstance.setCenter(currentLocation);
        infoWindow.setPosition(currentLocation);
        this.fetchData(currentLatitude, currentLongitude);
      });
    }
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
    this.setCurrentLocation();
  };

  addPlace = (place) => {
    this.setState({ places: place });
    this.props.setSearchList(place);
  };

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi, } = this.state;

    return (
      <div id="map-view" className="MapView">

        <div className="SearchBoxContainer">
          {mapApiLoaded &&
            <SearchBox
              map={mapInstance}
              mapApi={mapApi}
              fetchData={this.fetchData}
              selected={this.props.selected}
              toggle={this.props.toggle}
              setCurrentLocation={this.setCurrentLocation}
            />}
        </div>

        <div className="UseMyLocationContainer">
          <UseMyLocation setCurrentLocation={this.setCurrentLocation} />
        </div>

        <GoogleMapReact
          bootstrapURLKeys={{
            key: apiKey,
            libraries: ["places", "geometry"],
          }}
          yesIWantToUseGoogleMapApiInternals
          defaultCenter={{
            lat: 12.9716,
            lng: 77.5946
          }}
          defaultZoom={15}
          onClick={this.handleMapClicked}
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          {places.length &&
            places.map(place => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
                icon={place.icon}
              />
            ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapView;
MapView.propTypes = {
  setSearchList: PropTypes.func,
  selected: PropTypes.bool,
  toggle: PropTypes.func,
}