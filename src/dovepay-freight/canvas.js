import {
  getObjDocument,
  errlog,
  logDefault as log,
} from '../public'

import Chart from 'chart.js/auto'

export default function Canvas(selector, config) {
  if (!selector) {
    return errlog('缺少参数: ("#canvasID", {[iframeNode: DocumentIframeNode, ctx: "2d"]})')
  }
  const rootDocument = getObjDocument(config? config.iframeNode: null)
  const cvs = rootDocument.querySelector(selector)
  const ctx = config && config.ctx? config.ctx: '2d'
  if (!cvs) return errlog('不能初始化canvas，因为定位不到DOM')
  if (!cvs.getContext) return errlog('浏览器不支持canvas')
  this.node = cvs
  this.ctx = cvs.getContext(ctx)
  this.height = 300
  this.width = 150
  log('canvas初始化成功')
}

Canvas.prototype.setSize = function(ratio) {
  try {
    const canvasNode = this.node
    const parent = canvasNode.parentNode
    const parentWidth = window.getComputedStyle(parent).getPropertyValue('max-width')
    canvasNode.width = parseInt(parentWidth)
    const canvasRatio = ratio
    const canvasHeight = parseInt(canvasNode.width)*parseInt(canvasRatio[1])/parseInt(canvasRatio[0])
    canvasNode.height = canvasHeight
    this.width = canvasNode.width
    this.height = canvasNode.height
    log('canvas宽高设置成功')
    return this
  } catch(e) {
    errlog(e.stack)
    return this
  }
}

Canvas.prototype.buildChart = function(chartjsConfig) {
  try {
    const ctx = this.ctx
    Chart.defaults.font.size = 14
    const chart = new Chart(ctx, chartjsConfig)
    this.chart = chart
    this.chartjsConfig = chartjsConfig
    log('Chart.js配置成功')
    return this
  } catch(e) {
    errlog(e.stack)
    return this
  }
}

// Canvas.prototype.setChartTitle = function(titleText) {
//   try {
//     const ctx = this.ctx
//     const chartTitle = titleText? titleText: '未命名图表'
//     ctx.fillText(chartTitle, 10, 50)
//     return this
//   } catch(e) {
//     errlog(e.stack)
//     return this
//   }
  
// }

// Canvas.prototype.drawXYAxis = function(config) {
//   try {
//     const ctx = this.ctx
//     const xTitle = config.xTitle
//     const yTitle = config.yTitile
//     Canvas.drawX(this, xTitle)
//     Canvas.drawY(this, yTitle)
//     this.XYAxis = {
//       xTitle: xTitle,
//       yTitle: yTitle,
//     }
//     return this
//   } catch(e) {
//     errlog(e.stack)
//     return this
//   }
// }

// Canvas.drawX = function(canvas, titleArray) {
//   const width = canvas.width
//   const titleCount = titleArray.length

// }
// Canvas.drawY = function(canvas, titleArray) {

// }