import React from "react";
import * as d3 from "d3";
import "./ScatterPlotComponent.css"

class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);
    this.drawScatterPlot = this.drawScatterPlot.bind(this);
  }

  componentDidMount() {
    if (JSON.stringify(this.props.weatherData) !== JSON.stringify({}))
      this.drawScatterPlot();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.weatherData) !==
      JSON.stringify(prevProps.weatherData)
    ) {
      this.drawScatterPlot();
    }
  }
  drawScatterPlot() {
    let weatherData = this.props.weatherData;
    let columns = weatherData.columns;
    let yearIndex = columns.indexOf("year");
    let indexIndex = columns.indexOf("index");
    const selectedDots= new Set()
    let filteredData = weatherData.data.filter(
      (item) => item[yearIndex] > 2008 && item[yearIndex] < 2017
    );
    let evaporationIndex = columns.indexOf("Evaporation");
    let rainfallIndex = columns.indexOf("Rainfall");
    let clusterIndex = columns.indexOf("cluster");
    let rainfall = [];
    let evaporation = [];
    let cluster = [];
    let index=[];
    filteredData.forEach((element) => {
      rainfall.push(element[rainfallIndex]);
      evaporation.push(element[evaporationIndex]);
      cluster.push(element[clusterIndex]);
      index.push(element[indexIndex]);
    });

    let width_cont = document.getElementsByClassName(
      "scatterplot-container1"
    )[0].offsetWidth;
    let height_cont = document.getElementsByClassName(
      "scatterplot-container1"
    )[0].offsetHeight;
    let margin = {
        top: height_cont * 0.03,
        right: width_cont * 0.03,
        bottom: height_cont * 0.03,
        left: width_cont * 0.03,
      },
      width = width_cont - margin.left - margin.right,
      height = height_cont - margin.top - margin.bottom;

    const svg = d3
      .select(".scatter-plot")
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
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(evaporation)])
      .range([width * 0.05, width * 0.85]);
    const yScale = d3
      .scaleLinear()
      .domain([-1, d3.max(rainfall)])
      .range([height * 0.78, height * 0.05]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    graph
      .append("g")
      .attr("transform", "translate(0," + height * 0.78 + ")")
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("y", height * 0.15)
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .text("Evaporation");
    graph
      .append("g")
      .attr("transform", "translate(" + width * 0.05 + ",0 )")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -width * 0.11)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .text("Rainfall");

    let dots=graph
      .append("g")
      .selectAll("dot")
      .data(evaporation)
      .enter()
      .append("circle")
      .attr('class','dot-scatter-plot')
      .attr("cx", function (d, i) {
        return xScale(evaporation[i]);
      })
      .attr("cy", function (d, i) {
        return yScale(rainfall[i]);
      })
      .attr("r", 1.5)
      .style("fill", function (d, i) {
        return color(cluster[i]);
      })
      .style("opacity", 0.7);

      graph.append("g")
      .call(d3.brush().extent([[width * 0.05, 0], [width*0.88, height*0.775]]).on("brush", brushed).on("end", brushended));

      function brushed(event) {
        var s = event.selection,
            x0 = s[0][0],
            y0 = s[0][1],
            dx = s[1][0] - x0,
            dy = s[1][1] - y0;
        // console.log(s);
        graph.selectAll('circle')
        .attr('class', function (d,i) {
                if (xScale(evaporation[i]) >= x0 && xScale(evaporation[i]) <= x0 + dx && yScale(rainfall[i]) >= y0 && yScale(rainfall[i]) <= y0 + dy)
                     { console.log(i)
                       selectedDots.add(index[i]);
                       return 'dot-selected-scatter-plot'; }
                
            });

       
    }

    function brushended(event) {
      if (!event.selection) {
          console.log(selectedDots)
          graph.selectAll('circle')
          .attr('class','dot-scatter-plot')
          .style("opacity", 0.7);
          selectedDots.clear();
      }
  }
  }
  render() {
    return <div className="scatter-plot"></div>;
  }
}

export default ScatterPlot;
