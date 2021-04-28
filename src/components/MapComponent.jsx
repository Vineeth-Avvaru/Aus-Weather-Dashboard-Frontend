import React from "react";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.drawMap = this.drawMap.bind(this);
  }

  componentDidMount() {
    this.drawMap();
  }

  drawMap() {
    // console.log("Draw Map");
  }
  render() {
    const locations = ["Melbourne", "Perth"];
    return (
      <div>
        <button onClick={() => this.props.handleLocations(locations)}>
          Update Locations
        </button>
      </div>
    );
  }
}

export default Map;
