import React from "react";
import * as d3 from "d3";
import "./ParallelPlotComponent.css";

class ParallelPlot extends React.Component {
  constructor(props) {
    super(props);
    this.drawParallelPlot = this.drawParallelPlot.bind(this);
  }

  componentDidMount() {
    if (JSON.stringify(this.props.weatherData) !== JSON.stringify({}))
      this.drawParallelPlot();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.weatherData) !==
      JSON.stringify(prevProps.weatherData)
    ) {
      this.drawParallelPlot();
    }
  }

  drawParallelPlot() {
    let weatherData = this.props.weatherData;
    let columns = weatherData.columns;
    let features = [
      "month",
      "Rainfall",
      "Evaporation",
      "Sunshine",
      "WindGustSpeed",
      "Humidity",
      "Pressure",
      "Temperature",
    ];
    let original_features = [
      "month",
      "Rainfall",
      "Evaporation",
      "Sunshine",
      "WindGustSpeed",
      "Humidity",
      "Pressure",
      "Temperature",
    ];
    let indexMap = new Map();
    for (let i = 0; i < features.length; i++) {
      indexMap.set(features[i], columns.indexOf(features[i]));
    }
    let features_data = weatherData.data;
    features_data = features_data[0].map((_, colIndex) =>
      features_data.map((row) => row[colIndex])
    );
    features_data = features_data.filter(
      (item, index) => [...indexMap.values()].indexOf(index) !== -1
    );
    let datapoints = features_data[0].map((x, i) =>
      features_data.map((x) => x[i])
    );
    indexMap.set("cluster", columns.indexOf("cluster"));
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

    let width_cont = document.getElementsByClassName(
      "parallelplot-container"
    )[0].offsetWidth;
    let height_cont = document.getElementsByClassName(
      "parallelplot-container"
    )[0].offsetHeight;
    let margin = {
        top: height_cont * 0.03,
        right: width_cont * 0.03,
        bottom: height_cont * 0.03,
        left: width_cont * 0.03,
      },
      width = width_cont - margin.left - margin.right,
      height = height_cont - margin.top - margin.bottom;

    var x = d3
        .scalePoint()
        .range([width * 0.05, width * 0.85])
        .padding(0.1)
        .domain(features),
      y = {},
      dragging = {};

    var background, foreground;

    var svg = d3
      .select(".parallel-plot")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var graph = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + width_cont * 0.1 + "," + height_cont * 0.05 + ")"
      );
    for (let i = 0; i < features.length; i++) {
      let feature = features[i];
      if (feature !== "month") {
        y[feature] = d3
          .scaleLinear()
          .domain([d3.min(features_data[i]), d3.max(features_data[i])])
          .range([height * 0.93, height * 0.05]);
      } else {
        y[feature] = d3
          .scaleBand()
          .domain(features_data[i])
          .range([height * 0.93, height * 0.05]);
      }
    }

    // Add grey background lines for context.
    background = graph
      .append("g")
      .attr("class", "background")
      .selectAll("path")
      .data(datapoints)
      .enter()
      .append("path")
      .attr("d", path);

    // Add blue foreground lines for focus.
    foreground = graph
      .append("g")
      .attr("class", "foreground")
      .selectAll("path")
      .data(datapoints)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", function (d, i) {
        return colores_google(weatherData.data[i][indexMap.get("cluster")]);
      });

    // Add a group element for each dimension.
    var g = graph
      .selectAll(".feature")
      .data(features)
      .enter()
      .append("g")
      .attr("class", "dimension")
      .attr("transform", function (d) {
        return "translate(" + x(d) + ")";
      })
      .call(
        d3
          .drag()
          .subject(function (event, d) {
            return { x: x(d) };
          })
          .on("start", function (event, d) {
            dragging[d] = x(d);
            background.attr("visibility", "hidden");
          })
          .on("drag", function (event, d) {
            dragging[d] = Math.min(width, Math.max(0, event.x));
            features.sort(function (a, b) {
              return position(a) - position(b);
            });
            x.domain(features);
            foreground.attr("d", path);
            g.attr("transform", function (d) {
              return "translate(" + position(d) + ")";
            });
          })
          .on("end", function (event, d) {
            delete dragging[d];
            transition(d3.select(this)).attr(
              "transform",
              "translate(" + x(d) + ")"
            );
            transition(foreground).attr("d", path);
            background
              .attr("d", path)
              .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
          })
      );

    // Add an axis and title.
    g.append("g")
      .attr("class", "blah")
      .each(function (d) {
        d3.select(this).call(
          d3
            .axisLeft(y[d])
            .tickFormat((d) => {
              return d;
            })
            .ticks(10)
        );
      })
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -1)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .text(function (d) {
        return d;
      });

    function position(d) {
      var v = dragging[d];
      return v == null ? x(d) : v;
    }

    function transition(g) {
      return g.transition().duration(500);
    }

    function path(d) {
      return d3.line()(
        features.map((feature, i) => {
          var v = dragging[feature];
          var tx = v == null ? x(feature) : v;
          if (feature !== "month")
            return [tx, y[feature](d[original_features.indexOf(feature)])];
          else
            return [
              tx,
              y[feature](d[original_features.indexOf(feature)]) +
                y[feature].bandwidth() / 2,
            ];
        })
      );
    }
  }
  render() {
    return <div className="parallel-plot"></div>;
  }
}

export default ParallelPlot;
