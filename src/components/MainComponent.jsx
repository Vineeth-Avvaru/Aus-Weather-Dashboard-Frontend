import React from "react";
import Map from "./MapComponent";
import BarGraph from "./BarGraphComponent";
import LineGraph from "./LineGraphComponent";
import ScatterPlot from "./ScatterPlotComponent";
import ParallelPlot from "./ParallelPlotComponent";
import loadingGIF from "../assets/hippo.gif";
import "./MainComponent.css";

import * as d3 from "d3";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
      locations: [],
      years: [],
      selectedIDs: [],
      interactiveMode: false,
      isLoading: true,
      interactedFrom:"",
      colorMap: d3.scaleOrdinal(d3.schemeCategory10)
    };
    this.handleLocations = this.handleLocations.bind(this);
    this.handleYears = this.handleYears.bind(this);
    this.highlightDataPoints = this.highlightDataPoints.bind(this);
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
          isLoading: false,
        });
      });
  }

  handleLocations(locations) {
    this.setState({
      locations: [...locations],
      interactiveMode: true,
    });
  }

  handleYears(years) {
    
    this.setState({
      years: [...years],
      selectedIDs: [],
      interactiveMode: true,
      interactedFrom: "BarGraph",
    });
    console.log(this.state.years);
  }

  highlightDataPoints(idArray) {
    
    this.setState({
      selectedIDs: [...idArray],
      interactiveMode: true,
      interactedFrom: "ScatterPlot",
    });
    console.log(this.state.selectedIDs);
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
              <h4 className="graph-heading">Australia Map</h4>
              <div className="map-container1">
                {this.state.isLoading ? (
                  <img
                    src={loadingGIF}
                    className="loading-animation"
                    alt="loading..."
                  ></img>
                ) : (
                  <Map
                  weatherData={this.state.weatherData}
                    handleLocations={(locations) =>
                      this.handleLocations(locations)
                    }
                    locations={this.state.locations}
                  />
                )}
              </div>
            </div>
            <div className="graph-container bargraph-container">
              <h4 className="graph-heading">Stacked Bar Graph</h4>
              <div className="bargraph-container1">
                {this.state.isLoading ? (
                  <img
                    src={loadingGIF}
                    className="loading-animation"
                    alt="loading..."
                  ></img>
                ) : (
                  <BarGraph
                    weatherData={this.state.weatherData}
                    years={this.state.years}
                    updateYears={(years) => this.handleYears(years)}
                  />
                )}
              </div>
            </div>
            <div className="graph-container linegraph-container">
              <h4 className="graph-heading">
                Stacked Line Chart (Avg Rainfall vs Month)
              </h4>
              <div className="linegraph-container1">
                {this.state.isLoading ? (
                  <img
                    src={loadingGIF}
                    className="loading-animation"
                    alt="loading..."
                  ></img>
                ) : (
                  <LineGraph 
                    weatherData={this.state.weatherData}
                    state={this.state}
                     />
                )}
              </div>
            </div>
          </div>
          <div className="graph-row">
            <div className="graph-container scatterplot-container">
              <h4 className="graph-heading">
                ScatterPlot (Rainfall vs Evaporation)
              </h4>
              <div className="scatterplot-container1">
                {this.state.isLoading ? (
                  <img
                    src={loadingGIF}
                    className="loading-animation"
                    alt="loading..."
                  ></img>
                ) : (
                  <ScatterPlot
                    weatherData={this.state.weatherData}
                    state={this.state}
                    highlightDataPoints={(brushedPoints) => {
                      this.highlightDataPoints(brushedPoints);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="graph-container parallelplot-container">
              <h4 className="graph-heading">Parallel Coordinates Plot</h4>
              <div className="parallelplot-container1">
                {this.state.isLoading ? (
                  <img
                    src={loadingGIF}
                    className="loading-animation-pcp"
                    alt="loading..."
                  ></img>
                ) : (
                  <ParallelPlot 
                  weatherData={this.state.weatherData}
                   state={this.state}
                   />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
