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
      weatherData: {},
      locations: [],
      years: [],
    };
    this.handleLocations = this.handleLocations.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/getWeatherData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          weatherData: { ...data },
        });
      });
  }

  handleLocations(locations) {
    this.setState({
      locations: [...locations],
    });
  }

  handleYears(years) {
    this.setState({
      years: [...years],
    });
  }
  render() {
    return (
      <div className="main-container">
        <div className="heading-container">
          <h3>Visualization Final Project</h3>
        </div>
        <div className="graphs-content-container">
          <div className="graph-row">
            <div className="graph-container map-container">
              <Map
                handleLocations={(locations) => this.handleLocations(locations)}
              />
            </div>
            <div className="graph-container bargraph-container">
              <BarGraph weatherData={this.state.weatherData} />
            </div>
            <div className="graph-container linegraph-container">
              <LineGraph weatherData={this.state.weatherData} />
            </div>
          </div>
          <div className="graph-row">
            <div className="graph-container scatterplot-container">
              <ScatterPlot weatherData={this.state.weatherData} />
            </div>
            <div className="graph-container parallelplot-container">
              <ParallelPlot weatherData={this.state.weatherData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
