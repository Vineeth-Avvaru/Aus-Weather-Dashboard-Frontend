import React from "react";

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.drawLineGraph = this.drawLineGraph.bind(this);
  }

  componentDidMount() {
    this.drawLineGraph();
  }

  drawLineGraph() {
    console.log("Draw Line Graph");
  }
  render() {
    return <div>Line Graph !!</div>;
  }
}

export default LineGraph;
