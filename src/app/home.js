import * as d3 from 'd3';
import {
  TimeseriesChart
} from './chart';


import Chart from 'chart.js';

function render() {
  const home = require("../templates/home.hbs");

  let dataPromise = d3.csv("https://raw.githubusercontent.com/overlordtm/COVID19.si/master/data/full.csv");

  dataPromise.then(data => {
    // console.log("elem", data)

    let seriesPositive = data.map(p => {
      return {
        t: new Date(Date.parse(p['date'])),
        y: p['tests.positive.cum']
      }
    })

    let seriesPositiveNew = data.map(p => {
      return {
        t: new Date(Date.parse(p['date'])),
        y: p['tests.positive']
      }
    })

    console.log("series", seriesPositive)

    new Chart(document.querySelector("#chart-tests > canvas"), {
      type: 'line',
      data: {
        datasets: [{
            label: 'Pozitivnih testov',
            data: seriesPositive,
            backgroundColor: "rgba(153,255,51,0.4)",
            yAxisID: 'positive'
          },
          {
            label: 'Novih pozitivnih testov',
            data: seriesPositiveNew,
            backgroundColor: "rgba(50,255,91,0.4)",
            yAxisID: 'positive'
          }
        ]
      },
      options: {
        responsive: true,
        label: "Graf",
        scales: {
          yAxes: [{
            id: 'positive',
            type: 'linear'
          }],
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            }
          }]
        }
      }
    });
  })

  return home()
}


export {
  render
}