import * as d3 from 'd3'
import BubbleMap from './viz/bubblemap'

export function render() {
  console.log("renderam")
  const tmpl = require("../templates/map.hbs");

  let map = new BubbleMap('svg')
  map.render()
  return tmpl()
}