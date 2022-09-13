import {
  logDefault as log,
} from '../public'
import Canvas from './canvas'
import chartConfig from './dataStatisticChartConfig'

export function dsIndex() {
  log('进入 ----------> dataStatistic Index')
}

export function dsDetails() {
  log('进入 ----------> dataStatistic Details')
  const cvs = new Canvas('#dataStatisticChart')
  .setSize([16, 9])
  .buildChart(chartConfig)

  log(cvs)
}


// canvas.setChartTitle(cvs, '图表')

