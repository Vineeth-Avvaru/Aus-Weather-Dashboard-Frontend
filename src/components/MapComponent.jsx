import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.interactedFrom)
    return nextProps.interactedFrom === "Map";
  }

  handleMarkerClick(locationName) {
    //console.log(locationName);
    let locations = this.props.locations;
    let locationIndex = locations.indexOf(locationName);
    if (locationIndex === -1) locations = [...locations, locationName];
    else {
      locations.splice(locationIndex, 1);
    }
    //console.log(locations);
    this.props.handleLocations(locations);
  }

  render() {
    const locations = [
      {
        name: "Sydney",
        lat: -33.86882,
        long: 151.20929,
      },
      {
        name: "Uluru",
        lat: -25.344427,
        long: 131.03688,
      },
      {
        name: "Melborne",
        lat: -37.813629,
        long: 144.963058,
      },
      {
        name: "Perth",
        lat: -31.95224,
        long: 115.8614,
      },
      {
        name: "Brisbane",
        lat: -27.470125,
        long: 153.021072,
      },
      {
        name: "Canberra",
        lat: -35.282001,
        long: 149.128998,
      },
      {
        name: "Adelaide",
        lat: -34.92123,
        long: 138.599503,
      },
      {
        name: "Hobart",
        lat: -42.880554,
        long: 147.324997,
      },
      {
        name: "Albany",
        lat: -35.0031,
        long: 117.86595,
      },
      {
        name: "AliceSprings",
        lat: -23.700552,
        long: 133.882675,
      },
      {
        name: "BadgerysCreek",
        lat: -33.887691,
        long: 150.740463,
      },
      {
        name: "Ballarat",
        lat: -37.549999,
        long: 143.850006,
      },
      {
        name: "Bendigo",
        lat: -36.757786,
        long: 144.278702,
      },
      {
        name: "Cairns",
        lat: -16.925491,
        long: 145.75412,
      },
    ];
    const AustraliaMap = () => {
      return (
        <GoogleMap
          // mapTypeId={"e0f74981b31229b8"}
          // defaultMapId={"e0f74981b31229b8"}
          defaultZoom={2.5}
          defaultCenter={{ lat: -23.698042, lng: 133.880753 }}
        >
          {locations.map((location) => {
            let name = location.name;
            return (
              <Marker
                key={location.name}
                position={{
                  lat: location.lat,
                  lng: location.long,
                }}
                icon={
                  this.props.locations.indexOf(name) === -1
                    ? {
                        url: "/raindrop.svg",
                        scaledSize: new window.google.maps.Size(10, 15),
                      }
                    : {
                        url: "/blooddrop.svg",
                        scaledSize: new window.google.maps.Size(10, 15),
                      }
                }
                onClick={() => {
                  this.handleMarkerClick(name);
                }}
              />
            );
          })}
        </GoogleMap>
      );
    };

    const WrappedMap = withScriptjs(withGoogleMap(AustraliaMap));
    // const locations = ["Melbourne", "Perth"];
    // console.log(process.env.REACT_APP_GOOGLE_KEY);
    return (
      <div>
        {/* <button onClick={() => this.props.handleLocations(locations)}>
          Update Locations
        </button> */}
        <div style={{ width: "30vw", height: "35vh" }}>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `250px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}

export default Map;