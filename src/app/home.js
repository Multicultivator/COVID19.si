import * as d3 from 'd3';
import {
  TimeseriesChart
} from './chart';


function render() {
  const home = require("../templates/home.hbs");

  let dataPromise = d3.csv("https://raw.githubusercontent.com/overlordtm/COVID19.si/master/data/full.csv", function (d) {
    return {
      date: d3.timeParse("%Y-%m-%d")(d.date),
      value: d['tests.positive.cum']
    }
  });

  dataPromise.then(data => {
    let c = new TimeseriesChart(data)
    c.render("#chart")
  })

  return home()
}


export {
  render
}