import React from "react";
import "./ParallelPlotComponent.css";

class ParallelPlot extends React.Component {
  constructor(props) {
    super(props);
    this.drawParallelPlot = this.drawParallelPlot.bind(this);
  }

  componentDidMount() {
    this.drawParallelPlot();
  }

  drawParallelPlot() {
    // console.log("drawParallelPlot");
  }
  render() {
    return <div>ParallelPlot !!</div>;
  }
}

export default ParallelPlot;
