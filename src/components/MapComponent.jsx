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

  handleMarkerClick(locationName) {
    console.log(locationName);
    let locations = this.props.locations;
    let locationIndex = locations.indexOf(locationName);
    if (locationIndex === -1) locations = [...locations, locationName];
    else {
      locations.splice(locationIndex, 1);
    }
    console.log(locations);
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
      {
        name: "Cobar",
        lat: -31.4833314,
        long: 145.7999968,
      },
      {
        name: "CoffsHarbour",
        lat: -30.296276,
        long: 153.114136,
      },
      {
        name: "Dartmoor",
        lat: -37.9333296,
        long: 141.2833322,
      },
      {
        name: "Darwin",
        lat: -12.462827,
        long: 130.841782,
      },
      {
        name: "GoldCoast",
        lat: -28.016666,
        long: 153.399994,
      },
      {
        name: "Katherine",
        lat: -14.46517,
        long: 132.26347,
      },
      {
        name: "Launceston",
        lat: -41.429825,
        long: 147.157135,
      },
      {
        name: "MelbourneAirport",
        lat: -37.663712,
        long: 144.844788,
      },
      {
        name: "Mildura",
        lat: -34.206841,
        long: 142.13649,
      },
      {
        name: "Moree",
        lat: -29.464411,
        long: 149.845108,
      },
      {
        name: "MountGambier",
        lat: -37.824429,
        long: 140.783783,
      },
      {
        name: "MountGinini",
        lat: -35.5333312,
        long: 148.7833302,
      },
      {
        name: "Newcastle",
        lat: -32.916668,
        long: 151.75,
      },
      {
        name: "Nhil",
        lat: -36.333332,
        long: 141.6499974,
      },
      {
        name: "NorahHead",
        lat: -33.283344,
        long: 151.566118,
      },
      {
        name: "NorfolkIsland",
        lat: -29.0328267,
        long: 167.9543925,
      },
      {
        name: "Nuriootpa",
        lat: -34.4666648,
        long: 138.9833294,
      },
      {
        name: "PearceRAAF",
        lat: -31.667663996,
        long: 116.008999964,
      },
      {
        name: "Penrith",
        lat: -33.758011,
        long: 150.705444,
      },
      {
        name: "PerthAirport",
        lat: -31.936,
        long: 115.964,
      },
      {
        name: "Portland",
        lat: -38.3462,
        long: 141.60257,
      },
      {
        name: "Richmond",
        lat: -37.823002,
        long: 144.998001,
      },
      {
        name: "Sale",
        lat: -38.099998,
        long: 147.066666,
      },
      {
        name: "SalmonGums",
        lat: -32.974662768,
        long: 121.638497446,
      },
      {
        name: "SydneyAirport",
        lat: -33.947346,
        long: 151.179428,
      },
      {
        name: "Townsville",
        lat: -19.258965,
        long: 146.816956,
      },
      {
        name: "Tuggeranong",
        lat: -35.4244,
        long: 149.0888,
      },
      {
        name: "WaggaWagga",
        lat: -35.117275,
        long: 147.356522,
      },
      {
        name: "Walpole",
        lat: -34.979,
        long: 116.728,
      },
      {
        name: "Watsonia",
        lat: -37.711,
        long: 145.0838,
      },
      {
        name: "Williamtown",
        lat: -32.808996764,
        long: 151.838996644,
      },
      {
        name: "Witchcliffe",
        lat: -34.026,
        long: 115.1,
      },
      {
        name: "Wollongong",
        lat: -34.425072,
        long: 150.893143,
      },
      {
        name: "Woomera",
        lat: -31.1999992,
        long: 136.8166634,
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
