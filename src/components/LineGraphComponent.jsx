import React from "react";
import * as d3 from "d3";

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

    let locations = [
      "Perth",
      "Adelaide",
      "Canberra",
      "Brisbane",
      // "Uluru",
      // "Hobart",
    ];
    let years = [2010, 2011, 2012, 2013, 2014];
    filteredData = filteredData.filter(
      (item) =>
        locations.indexOf(item[locationIndex]) !== -1 &&
        years.indexOf(item[yearIndex]) !== -1
    );

    let rainfallIndex = columns.indexOf("Rainfall");
    let monthIndex = columns.indexOf("month");

    let avgRainfall = [];
    for (let i = 0; i < locations.length; i++) {
      let locationData = filteredData.filter(
        (item) => item[locationIndex] === locations[i]
      );
      for (let j = 1; j <= 12; j++) {
        let val = 0;
        for (let k = 0; k < locationData.length; k++) {
          if (locationData[k][monthIndex] === j)
            val += locationData[k][rainfallIndex];
        }
        avgRainfall.push(val / years.length);
      }
    }
    let maxAvgRainfall = Math.round(Math.max(...avgRainfall) * 100) / 100;

    let margin = { top: 10, right: 10, bottom: 60, left: 50 },
      width = 400 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;

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

    const svg = d3
      .select(".line-graph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const graph = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3
      .scaleBand()
      .domain(
        filteredData.map((d, i) => {
          return d[monthIndex];
        })
      )
      .range([0, width])
      .padding(0.1);

    graph
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3.axisBottom(xScale).tickFormat((d) => {
          return d;
        })
      )
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("stroke", "black");

    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width + " ," + (height + margin.top + 40) + ")"
      )
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .text("Month");

    const yScale = d3
      .scaleLinear()
      .domain([0, maxAvgRainfall + 1])
      .range([height, 0]);

    graph
      .append("g")
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
      .attr("y", 1)
      .attr("dy", "-3.1em")
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Average Rainfall");

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
        graphData.avgRainfall.push(val / years.length);
      }
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
  }
  render() {
    return <div className="line-graph"></div>;
  }
}

export default LineGraph;
