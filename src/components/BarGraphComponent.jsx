import React from "react";

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.drawBarGraph = this.drawBarGraph.bind(this);
  }

  componentDidMount() {
    this.drawBarGraph();
  }

  drawBarGraph() {
    console.log("Draw Bar Graph");
  }
  render() {
    console.log(this.props.weatherData);
    return <div>Bar Graph !!</div>;
  }
}

export default BarGraph;