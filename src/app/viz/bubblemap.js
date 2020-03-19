import * as d3 from 'd3';

export default class BubbleMap {
  constructor(ctx) {

    if (typeof ctx === 'string') {
      this.ctx = d3.select(ctx)
    } else {
      this.ctx = ctx
    }

    this.width = 800
    this.height = 600

  }

  projection() {
    return d3.geoTransverseMercator()
      .center([14.50575149, 46.0569465]) // GPS of location to zoom on
      .scale(1020) // This is like the zoom
      .translate([this.width / 2, this.height / 2])
  }

  render() {

    // Load external data and boot
    let x = d3.json("https://raw.githubusercontent.com/overlordtm/COVID19.si/master/data/si-all.geo.json")
    // let x = d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")

    x.then(data => {
      let svg = this.ctx,
        width = this.width,
        height = this.height;

      // Map and projection

      // Create data for circles:
      let markers = [{
        long: 14.50575149,
        lat: 46.0569465,
        group: "A",
        size: 34
      }];

      // Filter data
      // data.features = data.features.filter(function (d) {
      //   return d.properties.name == "France"
      // })

      // Create a color scale
      var color = d3.scaleOrdinal()
        .domain(["A", "B", "C"])
        .range(["#402D54", "#D18975", "#8FD175"])

      // Add a scale for bubble size
      var size = d3.scaleLinear()
        .domain([1, 100]) // What's in the data
        .range([4, 50]) // Size in pixel

      // Draw the map
      svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("fill", "#b8b8b8")
        .attr("d", d3.geoPath()
          .projection(this.projection())
        )
        .style("stroke", "black")
        .style("opacity", .3)

      // Add circles:
      svg
        .selectAll("myCircles")
        .data(markers)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return projection([d.long, d.lat])[0]
        })
        .attr("cy", function (d) {
          return projection([d.long, d.lat])[1]
        })
        .attr("r", function (d) {
          return size(d.size)
        })
        .style("fill", function (d) {
          return color(d.group)
        })
        .attr("stroke", function (d) {
          return color(d.group)
        })
        .attr("stroke-width", 3)
        .attr("fill-opacity", .4)
    })
  }
}