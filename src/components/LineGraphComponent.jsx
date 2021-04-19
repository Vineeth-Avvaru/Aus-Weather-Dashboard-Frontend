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
    if (this.props.weatherData !== prevProps.weatherData) {
      this.drawLineGraph();
    }
  }

  drawLineGraph() {
    console.log("Draw Line Graph");
    console.log(this.props.weatherData);
  }
  render() {
    return <div className="line-graph"></div>;
  }
}

export default LineGraph;
