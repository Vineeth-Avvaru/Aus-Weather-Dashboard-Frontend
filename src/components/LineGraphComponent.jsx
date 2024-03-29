import React from "react";
import * as d3 from "d3";
import "./LineGraphComponent.css";

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.drawLineGraph = this.drawLineGraph.bind(this);
  }

  componentDidMount() {
    if (JSON.stringify(this.props.weatherData) !== JSON.stringify({}))
      this.drawLineGraph();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.state.interactedFrom === "BarGraph" ||
      this.props.state.interactedFrom === "Map"
    ) {
      this.drawLineGraph();
    }
    if (
      JSON.stringify(this.props.weatherData) !==
      JSON.stringify(prevProps.weatherData)
    ) {
      this.drawLineGraph();
    }
  }

  drawLineGraph() {
    let weatherData = this.props.weatherData;
    let columns = weatherData.columns;
    // let nRows = weatherData.data.length;
    // let uniqLocations = new Set();
    // for (let i = 0; i < nRows; i++) {
    //   uniqLocations.add(weatherData.data[i][1]);
    // }
    let yearIndex = columns.indexOf("year");
    let locationIndex = columns.indexOf("Location");
    let filteredData = weatherData.data.filter(
      (item) => item[yearIndex] > 2008 && item[yearIndex] < 2017
    );

    let years = this.props.state.years;
    if (years.length == 0) {
      years = ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"];
    }

    let locations = this.props.state.locations;
    if (locations.length === 0) {
      locations = [
        "Perth",
        "Adelaide",
        "Canberra",
        "Brisbane",
        // "Uluru",
        // "Hobart",
      ];
    }
    //let years = [2010, 2011, 2012, 2013, 2014];
    //console.log(years,filteredData[10][yearIndex])
    filteredData = filteredData.filter(
      (item) =>
        locations.indexOf(item[locationIndex]) !== -1 &&
        years.indexOf(item[yearIndex].toString()) !== -1
    );

    let rainfallIndex = columns.indexOf("Rainfall");
    let monthIndex = columns.indexOf("month");

    let avgRainfallLoc = [];
    let maxAvgRainfall = 0; // Math.round(Math.max(...avgRainfall) * 100) / 100;
    const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    for (let i = 0; i < locations.length; i++) {
      let locationData = filteredData.filter(
        (item) => item[locationIndex] === locations[i]
      );
      let avgRainfall = [];
      for (let j = 1; j <= 12; j++) {
        let val = 0;
        for (let k = 0; k < locationData.length; k++) {
          if (locationData[k][monthIndex] === j)
            val += locationData[k][rainfallIndex];
        }
        avgRainfall.push(val / years.length);
      }
      avgRainfallLoc.push(arrAvg(avgRainfall));
      maxAvgRainfall = Math.max(maxAvgRainfall, Math.max(...avgRainfall));
    }

    let width_cont = document.getElementsByClassName("linegraph-container1")[0]
      .offsetWidth;
    let height_cont = document.getElementsByClassName("linegraph-container1")[0]
      .offsetHeight;
    let margin = {
        top: height_cont * 0.03,
        right: width_cont * 0.03,
        bottom: height_cont * 0.03,
        left: width_cont * 0.03,
      },
      width = width_cont - margin.left - margin.right,
      height = height_cont - margin.top - margin.bottom;

    function colores_google(n) {
      var colores_g = [
        "#3366cc",
        "#dc3912",
        "#ff9900",
        "#109618",
        "#990099",
        "#0099c6",
        "#dd4477",
        "#66aa00",
        "#b82e2e",
        "#316395",
      ];
      return colores_g[n % colores_g.length];
    }
    d3.selectAll(".line-graph").select("svg").remove();
    const svg = d3
      .select(".line-graph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const graph = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + width_cont * 0.1 + "," + height_cont * 0.05 + ")"
      );

    const xScale = d3
      .scaleBand()
      .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
      .range([width * 0.05, width * 0.85])
      .padding(0.1);
    xScale.domain(xScale.domain().sort(d3.ascending));
    graph
      .append("g")
      .attr("transform", "translate(0," + height * 0.78 + ")")
      .call(
        d3.axisBottom(xScale).tickFormat((d) => {
          return d;
        })
      )
      .append("text")
      .attr("y", height * 0.15)
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .text("Month");

    const yScale = d3
      .scaleLinear()
      .domain([0, maxAvgRainfall + 1])
      .range([height * 0.78, height * 0.05]);

    graph
      .append("g")
      .attr("transform", "translate(" + width * 0.05 + ",0 )")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => {
            return d;
          })
          .ticks(10)
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -width * 0.07)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .text("Avg Rainfall (mm)");

    for (let i = 0; i < locations.length; i++) {
      let locationData = filteredData.filter(
        (item) => item[locationIndex] === locations[i]
      );
      let graphData = {
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        avgRainfall: [],
      };
      for (let j = 1; j <= 12; j++) {
        let val = 0;
        for (let k = 0; k < locationData.length; k++) {
          if (locationData[k][monthIndex] === j)
            val += locationData[k][rainfallIndex];
        }
        if (val == 0) {
          val = avgRainfallLoc[i];
        }
        graphData.avgRainfall.push(val / years.length);
      }
      //console.log(graphData.avgRainfall)
      graph
        .append("path")
        .datum(graphData.month)
        .attr("fill", "none")
        .attr("stroke", colores_google(i))
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return xScale(d) + xScale.bandwidth() / 2;
            })
            .y(function (d) {
              return yScale(graphData.avgRainfall[d - 1]);
            })
        );
    }

    d3.selectAll(".line-graph-legend").select("svg").remove();

    var SVG = d3
      .select(".line-graph-legend")
      .append("svg")
      .attr("width", 100)
      .attr("height", 200);
    var size = 12;
    SVG.selectAll("mydots")
      .data(locations)
      .enter()
      .append("rect")
      .attr("y", function (d, i) {
        return 10 + i * (size + 5);
      })
      .attr("width", size)
      .attr("height", size)
      .style("fill", function (d, i) {
        return colores_google(i);
      });

    SVG.selectAll("mylabels")
      .data(locations)
      .enter()
      .append("text")
      .attr("x", size * 1.2)
      .attr("y", function (d, i) {
        return 10 + i * (size + 5) + size / 2;
      })
      .style("fill", function (d, i) {
        return colores_google(i);
      })
      .text(function (d) {
        return d;
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");
  }
  render() {
    return (
      <div className="line-graph-legend-container">
        <div className="line-graph"></div>
        <div className="line-graph-legend"></div>
      </div>
    );
  }
}

export default LineGraph;
