import React from "react";
import * as d3 from "d3";
import "./BarGraphComponent.css";

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
    };
    this.drawBarGraph = this.drawBarGraph.bind(this);
    this.yearHandler = this.yearHandler.bind(this);
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

  yearHandler(d, year) {
    let years = this.props.years;
    let yearIndex = years.indexOf(year);
    if (yearIndex === -1) years.push(year);
    else years.splice(yearIndex, 1);
    this.props.updateYears(years);
  }

  drawBarGraph() {
    let weatherData = this.props.weatherData;
    let columns = weatherData.columns;
    let yearIndex = columns.indexOf("year");
    // let locationIndex = columns.indexOf("Location");
    let filteredData = weatherData.data.filter(
      (item) => item[yearIndex] > 2008 && item[yearIndex] < 2017
    );
    let rainfallIndex = columns.indexOf("Rainfall");
    // let locations = [
    //   "Perth",
    //   "Adelaide",
    //   "Canberra",
    //   "Brisbane",
    //   // "Uluru",
    //   // "Hobart",
    // ];
    let selectedBars = [];
    let rainfall = {};

    filteredData.forEach((element) => {
      let year = element[yearIndex];

      if (!rainfall[year]) {
        rainfall[year] = 0;
      }
      rainfall[year] = rainfall[year] + element[rainfallIndex];
    });

    let years = Object.keys(rainfall);
    let annual_rainfall = Object.values(rainfall);
    let width_cont = document.getElementsByClassName("bargraph-container1")[0]
      .offsetWidth;
    let height_cont = document.getElementsByClassName("bargraph-container1")[0]
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
      .range([width * 0.05, width * 0.85]);

    graph
      .append("g")
      .attr("transform", "translate(" + -1 + "," + height * 0.78 + ")")
      .call(d3.axisBottom(xScale).ticks(5))
      .append("text")
      .attr("y", height * 0.15)
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .text("Annual Rainfall (mm)");

    graph
      .append("g")
      .attr("transform", "translate(" + width * 0.048 + ",0 )")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -width * 0.11)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .text("Years");

    graph
      .selectAll(".bar")
      .data(years)
      .enter()
      .append("rect")
      .attr("class", "bar-bar-graph")
      .attr("id", (d, i) => {
        return "bar" + d.toString();
      })
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut)
      .on("click", (d, i) => {
        this.yearHandler(d, i);
        onClick(d, i);
      })
      .attr("x", width * 0.05)
      .attr("y", 0)
      .attr("height", 0)
      .attr("width", function (d, i) {
        return xScale(annual_rainfall[i]);
      })
      .attr("y", function (d, i) {
        return yScale(d);
      })
      .attr("height", yScale.bandwidth);

    function onMouseOver(d, i) {
      if (d3.select(this).attr("class") !== "bar-select-bar-graph") {
        d3.select(this).attr("class", "bar-highlight-bar-graph");
      }
      d3.select(this)
        .transition()
        .duration(200)
        .attr("width", xScale(rainfall[i]) + 0.5);

      graph
        .append("text")
        .attr("class", "text-highlight-bar-graph")
        .attr("x", function () {
          return xScale(rainfall[i]) + 40;
        })
        .attr("y", function () {
          return yScale(i) + 15;
        })
        .attr("fill", "#b92938")
        .text(function () {
          return d3.format(".0f")(rainfall[i]);
        });
    }

    function onMouseOut(d, i) {
      if (d3.select(this).attr("class") !== "bar-select-bar-graph") {
        d3.select(this).attr("class", "bar-bar-graph");
      }
      d3.select(this)
        .transition()
        .duration(200)
        .attr("width", xScale(rainfall[i]) - 0.5);

      d3.selectAll(".text-highlight-bar-graph").remove();
    }
    function onClick(d, i) {
      if (d3.select("#bar" + i).attr("class") === "bar-select-bar-graph") {
        const index = selectedBars.indexOf(i);
        if (index > -1) {
          selectedBars.splice(index, 1);
        }
        d3.select("#bar" + i).attr("class", "bar-bar-graph");
      } else {
        selectedBars.push(i);
        d3.select("#bar" + i).attr("class", "bar-select-bar-graph");
      }

      // console.log(selectedBars);
    }
  }
  render() {
    return <div className="bar-graph"></div>;
  }
}

export default BarGraph;
