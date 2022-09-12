import {
  logDefault as log,
} from '../public'
import Canvas from './canvas'
import chartConfig from './dataStatisticChartConfig'

log('进入 ----------> dovepay-freight')

const cvs = new Canvas('#dataStatisticChart')
.setSize([16, 9])
.buildChart(chartConfig)

log(cvs)
// canvas.setChartTitle(cvs, '图表')

