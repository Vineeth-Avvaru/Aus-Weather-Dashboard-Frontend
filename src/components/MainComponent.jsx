import React from "react";
import Map from "./MapComponent";
import BarGraph from "./BarGraphComponent";
import LineGraph from "./LineGraphComponent";
import ScatterPlot from "./ScatterPlotComponent";
import ParallelPlot from "./ParallelPlotComponent";
import loadingGIF from "../assets/hippo.gif";
import "./MainComponent.css";

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
    console.log(this.state.years);
    this.setState({
      years: [...years],
      interactiveMode: true,
    });
  }

  highlightDataPoints(idArray) {
    console.log(this.state.selectedIDs);
    this.setState({
      selectedIDs: [...idArray],
      interactiveMode: true,
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
                    handleLocations={(locations) =>
                      this.handleLocations(locations)
                    }
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
                  <LineGraph weatherData={this.state.weatherData} />
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
                  <ParallelPlot weatherData={this.state.weatherData} />
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
