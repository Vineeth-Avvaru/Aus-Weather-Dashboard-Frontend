import React from "react";
import Map from "./MapComponent";
import BarGraph from "./BarGraphComponent";
import LineGraph from "./LineGraphComponent";
import ScatterPlot from "./ScatterPlotComponent";
import ParallelPlot from "./ParallelPlotComponent";
import "./MainComponent.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backendData: {},
    };
  }

  componentDidMount() {
    console.log("Fetch Data and Put it in state");
  }

  render() {
    return (
      <div className="main-container">
        <div className="heading-container">
          <h3>Visualization Final Project</h3>
        </div>
        <div className="graph-row">
          <div className="graph-container map-container">
            <Map />
          </div>
          <div className="graph-container bargraph-container">
            <BarGraph />
          </div>
          <div className="graph-container linegraph-container">
            <LineGraph />
          </div>
        </div>
        <div className="graph-row">
          <div className="graph-container scatterplot-container">
            <ScatterPlot />
          </div>
          <div className="graph-container parallelplot-container">
            <ParallelPlot />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
