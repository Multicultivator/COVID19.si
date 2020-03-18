import * as d3 from 'd3'

class Chart {
  constructor(data) {
    this.data = data
    this.margin = {
      top: 10,
      right: 30,
      bottom: 30,
      left: 30
    }
    this.width = 500
    this.height = 500
    this.dataHeight = this.height - this.margin.top - this.margin.bottom
    this.dataWidth = this.width - this.margin.left - this.margin.right
  }

  xaxis() {

  }


  render(elm) {
    let svg = d3.select(elm).append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      // apply margins
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

    let data = this.data

    // Add X axis --> it is a date format
    var x = d3.scaleTime().domain(d3.extent(data, d => d.date)).range([0, this.dataWidth]);
    svg.append("g").attr("transform", "translate(0," + this.dataHeight + ")").call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear().domain([0, d3.max(data, d => +d.value)]).range([this.dataHeight, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) {
          return x(d.date)
        })
        .y(function (d) {
          return y(d.value)
        })
      )
  }
}

export class TimeseriesChart extends Chart {
  constructor(data) {
    console.log("TimeseriesChart constructor")
    super(data)
  }
}