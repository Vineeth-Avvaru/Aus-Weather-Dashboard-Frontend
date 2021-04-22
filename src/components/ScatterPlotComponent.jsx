import React from "react";
import * as d3 from "d3";

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
    console.log('dtgs')
    let filteredData = weatherData.data.filter(
      
      (item) => item[yearIndex] > 2008 && item[yearIndex] < 2017
    );
    let evaporationIndex = columns.indexOf("Evaporation");
    let rainfallIndex = columns.indexOf("Rainfall");
    let clusterIndex=columns.indexOf('cluster')
    let rainfall=[]
    let evaporation =[]
    let cluster=[]
    filteredData.forEach(element => {
      rainfall.push(element[rainfallIndex])
      evaporation.push(element[evaporationIndex])
      cluster.push(element[clusterIndex])
    });
    
    let width_cont = document.getElementsByClassName("bargraph-container")[0].offsetWidth
    let height_cont = document.getElementsByClassName("bargraph-container")[0].offsetHeight 
    let margin = { top: height_cont*0.03, right: width_cont*0.03, bottom: height_cont*0.03, left: width_cont*0.03 },
      width = width_cont - margin.left - margin.right,
      height = height_cont - margin.top - margin.bottom;

    const svg = d3
    .select(".scatter-plot")
    .append("svg")
    .attr("width", width )
    .attr("height", height );

    // var x = d3.scaleBand().range([0, width]).padding(0.4);
    // var y = d3.scaleLinear().range([height, 0]);
    const graph = svg
      .append("g")
      .attr("transform", "translate(" + width_cont*0.1 + "," + height_cont*0.05 + ")");
    const xScale = d3
    .scaleLinear()
    .domain([d3.min(evaporation),d3.max(evaporation)])
    .range([width*0.05, width*0.85]);
    const yScale = d3
    .scaleLinear()
    .domain([d3.min(rainfall),d3.max(rainfall)])
    .range([height*0.78,height*0.05]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    graph
    .append("g")
    .attr("transform", "translate(0," + height*0.78 + ")")
    .call(
      d3.axisBottom(xScale)
    ).append("text")
    .attr("y", height*0.15)
    .attr("x", width/2)
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-family", "sans-serif")
    .attr("font-size", '15px')
    .text('Evaporation');
    graph.append("g")
    .attr("transform", "translate("+ width*0.05 +",0 )")
    .call(d3.axisLeft(yScale))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -width*0.11)
    .attr("x", -height/2)
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-family", "sans-serif")
    .attr("font-size", "15px")
    .text("Rainfall");

    graph.append('g')
      .selectAll("dot")
      .data(evaporation)
      .enter()
      .append("circle")
        .attr("cx", function (d,i) { return xScale(evaporation[i]); } )
        .attr("cy", function (d,i) { return yScale(rainfall[i]); } )
        .attr("r", 1.5)
        .style("fill", function (d,i) { return color(cluster[i]); } )

    
  }
  render() {
    return <div className="scatter-plot"></div>;
  }
}

export default ScatterPlot;
