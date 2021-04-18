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
    console.log("Draw Map");
  }
  render() {
    return <div>Map!!</div>;
  }
}

export default Map;
