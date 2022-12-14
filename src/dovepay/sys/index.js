import Canvas from '../../dovepay-freight/canvas'

window.addEventListener('load', () => {
  try {
    const dataEl = document.querySelector('input#accountData')
    if (!dataEl) return

    const cvs = new Canvas('#accountDetails')
    .setSize([7, 2])
    .buildChart(config(dataEl))
    
    // triggerTooltip(cvs.chart)
    
    console.log('chart初始化完毕')
  } catch(e) {
    console.error('chart初始化失败', e.stack)
  }
})

const config = (el) => {
  const data = el.dataset
  let theConfig = {
    type: 'bar',
    data: {
      labels: [data.sumAmtStrDisc, data.baseAmtDisc, data.otherBalanceDisc, 
        data.freezetotalDisc, data.jibenBalanceDisc, data.freezeBalanceDisc],
      datasets: [{
        data: [data.sumAmtStr, data.baseAmt, data.otherBalance, 
          data.freezetotal, data.jibenBalance, data.freezeBalance],
        backgroundColor: 'rgb(3, 78, 162)',
        borderColor: 'rgb(3, 78, 162)',
        // maxBarThickness: 100,
      }]
    },
    options: {
      indexAxis: 'y',
      interaction: {
        intersect: false,
        axis: 'y',
        mode: 'nearest'
      },
      // layout: {
      //   padding: 20
      // },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (item) => '￥' + item.parsed.x,
          }
        }
      },
      /*scales: {
        x: {
          position: 'top',
        },
      }*/
    }
  }
  return theConfig
}