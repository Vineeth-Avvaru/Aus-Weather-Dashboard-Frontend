import React from "react";
import LineGraph from "./LineGraphComponent";
import * as d3 from "d3";

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.drawBarGraph = this.drawBarGraph.bind(this);
  }

  componentDidMount() {
    if (JSON.stringify(this.props.weatherData) !== JSON.stringify({}))
      this.drawBarGraph();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.weatherData) !==
      JSON.stringify(prevProps.weatherData)
    ) {
      this.drawBarGraph();
    }
  }

  drawBarGraph() {
    let weatherData = this.props.weatherData;
    let columns = weatherData.columns;
    let yearIndex = columns.indexOf("year");
    let locationIndex = columns.indexOf("Location");
    let filteredData = weatherData.data.filter(
      (item) => item[yearIndex] > 2008 && item[yearIndex] < 2017
    );
    let rainfallIndex = columns.indexOf("Rainfall");
    let locations = [
      "Perth",
      "Adelaide",
      "Canberra",
      "Brisbane",
      // "Uluru",
      // "Hobart",
    ];
    let rainfall = {};

    filteredData.forEach((element) => {
      let year = element[yearIndex];
      let location = element[locationIndex];
      if (!locations.includes(location)) {
        location = "Others";
      }
      if (!rainfall[year]) {
        rainfall[year] = { location: 0 };
      }
      if (!rainfall[year][location]) {
        rainfall[year][location] = 0;
      }
      rainfall[year][location] =
        rainfall[year][location] + element[rainfallIndex];
    });

    let years = Object.keys(rainfall);
    let annual_rainfall = Object.values(rainfall);
    let width_cont = document.getElementsByClassName("bargraph-container")[0]
      .offsetWidth;
    let height_cont = document.getElementsByClassName("bargraph-container")[0]
      .offsetHeight;
    let margin = {
        top: height_cont * 0.03,
        right: width_cont * 0.03,
        bottom: height_cont * 0.03,
        left: width_cont * 0.03,
      },
      width = width_cont - margin.left - margin.right,
      height = height_cont - margin.top - margin.bottom;
    const svg = d3
      .select(".bar-graph")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // var x = d3.scaleBand().range([0, width]).padding(0.4);
    // var y = d3.scaleLinear().range([height, 0]);
    const graph = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + width_cont * 0.1 + "," + height_cont * 0.05 + ")"
      );
    const yScale = d3
      .scaleBand()
      .domain(years)
      .range([height * 0.78, height * 0.05])
      .padding(0.3);
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(annual_rainfall) / 1.3, d3.max(annual_rainfall) * 1.05])
      .range([width * 0.05, width * 0.85])
      .nice();

    graph
      .append("g")
      .attr("transform", "translate(0," + height * 0.05 + ")")
      .attr("class", "x-axis");
    graph
      .append("g")
      .attr("transform", "translate(" + width * 0.05 + ",0 )")
      .attr("class", "y-axis");
    graph
      .selectAll(".x-axis")
      .transition()
      .duration(100)

      .call(d3.axisTop(xScale));
    // .append("text")
    // .attr("y", height*0.15)
    // .attr("x", width/2)
    // .attr("text-anchor", "middle")
    // .attr("fill", "black")
    // .attr("font-family", "sans-serif")
    // .attr("font-size", '15px')
    // .text('Annual Rainfall (mm)');

    // graph.append("g")
    //
    // .call(d3.axisLeft(yScale))
    graph
      .selectAll(".y-axis")
      .transition()
      .duration(100)
      .call(d3.axisLeft(yScale).tickSizeOuter(0));
    // .append("text")
    // .attr("transform", "rotate(-90)")
    // .attr("y", -width*0.11)
    // .attr("x", -height/2)
    // .attr("text-anchor", "middle")
    // .attr("fill", "black")
    // .attr("font-family", "sans-serif")
    // .attr("font-size", "15px")
    // .text("Years");

    graph
      .selectAll(".bar")
      .data(years)
      .enter()
      .append("rect")
      .attr("class", "bar-bar-graph")
      .attr("x", width * 0.05)
      .attr("y", 0)
      .attr("height", 0)
      .attr("width", function (d, i) {
        return xScale(annual_rainfall[i]);
      })
      .attr("fill", "#3498DB")
      .attr("y", function (d, i) {
        return yScale(d);
      })
      .attr("height", yScale.bandwidth);
  }
  render() {
    //console.log(this.props.weatherData);
    //return <div className="bar-graph"></div>;
  }
}

export default BarGraph;
