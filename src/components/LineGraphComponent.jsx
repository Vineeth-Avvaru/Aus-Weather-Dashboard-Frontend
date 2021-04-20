import React from "react";

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.drawLineGraph = this.drawLineGraph.bind(this);
  }

  // componentDidMount() {
  //   this.drawLineGraph();
  // }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.weatherData) !==
      JSON.stringify(prevProps.weatherData)
    ) {
      this.drawLineGraph();
    }
  }

  drawLineGraph() {
    console.log("Draw Line Graph");
    console.log(this.props.weatherData);
    let weatherData = this.props.weatherData;
    let nRows = weatherData.data.length;
    let uniqLocations = new Set();
    for (let i = 0; i < nRows; i++) {
      uniqLocations.add(weatherData.data[i][1]);
    }
    console.log(uniqLocations);
  }
  render() {
    return <div className="line-graph"></div>;
  }
}

export default LineGraph;
