import React from "react";

class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);
    this.drawScatterPlot = this.drawScatterPlot.bind(this);
  }

  componentDidMount() {
    this.drawScatterPlot();
  }

  drawScatterPlot() {
    console.log("Draw Scatter Plot");
  }
  render() {
    return <div>Scatter Plot !!</div>;
  }
}

export default ScatterPlot;
