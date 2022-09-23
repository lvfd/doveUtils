import Glob_fn from './Global'
import fn_initPaginate from './Paginate'
import {
  logDefault as log,
  errlog,
  errorHandler,
} from '../public'
import Canvas from './canvas'
import chartConfig from './dataStatisticChartConfig'
import {
  fetchData, fetch_exportExcel, fn_initSubmitBtn, fn_initExportBtn
} from './AjaxManager'

export function dsIndex() {
  log('进入 ----------> dataStatistic Index')
  initWdatePicker()
  queryBillRule()
  .then(response => setBillRule(response))
  .then(() => bindButtons(loadData, saveBillRuleId))
  .catch(error => errorHandler(error))
}

export function dsDetails() {
  log('进入 ----------> dataStatistic Details')
  
  /* table */
  bindButtons(loadDataDetails)
  
  /* chart */
  const cvs = new Canvas('#dataStatisticChart')
  .setSize([16, 9])
  .buildChart(chartConfig)

  log(cvs)
}

function initWdatePicker() {
  try {
    const billTimeInp = document.querySelector('input[name="billTime"]')
    billTimeInp.addEventListener('click', function() {
      WdatePicker({
        el:this,
        dateFmt:'yyyy',
        maxDate:'%y',
      })
    })
  } catch (e) {
    errorHandler(e.stack)
  }
}
function queryBillRule() {
  return new Promise((res, rej) => {
    try {
      const url = document.querySelector('input[name="api_queryEffectiveBillRule"]').value
      fetchData(url, '', res)
    } catch (e) {
      rej(e.stack)
    }
  })
}
function setBillRule(response) {
  return new Promise((resolve, rej) => {
    try {
      const billRuleIdSel = document.querySelector('select[name="billRuleId"]')
      const dataArr = response.data
      if (dataArr.length > 0) {
        dataArr.forEach((data) => {
          const option = document.createElement('option')
          option.setAttribute('value', data.billRuleId)
          option.innerText = data.billRuleName
          billRuleIdSel.appendChild(option)
        })
      } 
      resolve('success')
    } catch(e) {
      rej(e.stack)
      // errorHandler(e.stack)
    }
  })
}
function bindButtons(cb, dataHandler) {
  return new Promise((res, rej) => {
    try {
      fn_initExportBtn(fetch_exportExcel)
    } catch(e) {
      errlog(e.stack)
    }
    try {
      fn_initSubmitBtn(1, 15, fetchData, cb, dataHandler)
    } catch(e) {
      rej(e.stack)
    }
  })
}
function saveBillRuleId(data) {
  try {
    document.querySelector('input[name="billRuleIdValue"]').value = data.billRuleId
  } catch(e) {
    errlog(e.stack)
  }
}
function loadData(response, pageNumber, pageSize) {
  try {
    log(response)
    const table = document.getElementById('dataTable')
    const trInThead = Glob_fn.Table.getThTr(table)
    setThead(trInThead)
    setTbody(table, response)
    fn_initPaginate(response, pageNumber, pageSize, fetchData, loadData)
  } catch(e) {
    errorHandler(e.stack)
  }
  function setThead(tr) {
    const set = Glob_fn.Table.setTh
    const textArr = ['排名', '往来户编码', '商户编号', '往来户名称', '年度', '总金额', '操作']
    textArr.forEach((text) => {
      set(tr, text)
    })
  }
  function setTbody(table, res) {
    const tbody = table.querySelector('tbody')
    tbody.innerHTML = ''
    const data = res.data.summaryList
    if (!data || data.length < 1) {
      const tab = Glob_fn.Table
      const tr0 = tab.showNoData(tab.getThTr(table).querySelectorAll('th').length)
      tbody.appendChild(tr0)
      return
    }
    data.forEach((line/*, index*/) => {
      const tr = document.createElement('tr')
      tbody.appendChild(tr)
      // const tdSerial = document.createElement('td')
      // tr.appendChild(tdSerial)
      // tdSerial.innerText = index + 1 + (parseInt(pageNumber) - 1) * parseInt(pageSize)
      const set = Glob_fn.Table.setTd
      const propArr = ['serialNumber', 'esbCustomerId', 'accountId',
        'esbCustomerName', 'billTime', 'totalAmount']
      propArr.forEach((prop) => {
        set(tr, line[prop])
      })
      /* 查看详情 */
      const tdAction = document.createElement('td')
      const tdActionLink = document.createElement('a')
      tdAction.appendChild(tdActionLink)
      tr.appendChild(tdAction)
      tdActionLink.innerText = '查看详细'
      // const sendDataArr = ['billTime', 'esbCustomerId', 'billRuleId']
      propArr.forEach((prop) => {
        tdActionLink.dataset[prop] = line[prop]
        // tdActionLink.setAttribute(`data-${prop}`, line[prop])
      })
      tdActionLink.addEventListener('click', toDetails)
    })
  }
}
function toDetails(event) {
  event.preventDefault()
  const el = event.target
  const url = './dataStatistic/details'
  let postData = {
    billRuleId: document.querySelector('input[name=billRuleIdValue]').value
  }
  if (el.dataset) {
    for(let prop in el.dataset) {
      postData[prop] = el.dataset[prop]
    }
  }
  Glob_fn.submVirtForm(url, postData)
}
function loadDataDetails(response, pageNumber, pageSize) {
  log(response)
}




// canvas.setChartTitle(cvs, '图表')
