/* 配置: */
const expandWidth = (el) => {
  el.style.width = '100%'
  el.style.boxSizing = 'border-box'
}
const expandHeight = (el) => {
  el.style.height = '100%'
  el.style.boxSizing = 'border-box'
}
const noBorder = (el) => el.style.border = 'hidden'
const breakWord = (el) => el.style.wordBreak = 'break-all'

export default function(icd) {
  containerHandler(icd, '.width02')
  containerHandler(icd, 'div[style*="825px"]', {expandHeight: true})
  containerHandler(icd, 'div[style*="800px"]', {expandHeight: true})
  containerHandler(icd, 'div[style*="810px"]')
  tableHandler(icd, 1000)
  tableHandler(icd, 810)
  tableHandler(icd, 805)
  tableHandler(icd, 800)
  // try {
  //   tabcoHandler(icd)
  // } catch(e) {
  //   console.error('iframe内嵌内容处理错误', e.stack)
  // }
}

function containerHandler(icd, selector, config) {
  try {
    const el = icd.querySelector(selector)
    if (!el) return
    expandWidth(el)
    if (config) {
      if (config.noBorder) noBorder(el)
      if (config.expandHeight) expandHeight(el)
    }
  } catch(e) {
    console.error('container处理错误', e.stack)
  }
}

function tableHandler(icd, selector) {
  try {
    const els = icd.querySelectorAll(`table[width*="${selector}"]`)
    if (!els || els.length < 1) return
    els.forEach((el) => {
      expandWidth(el)
      breakWord(el)
    })
  } catch(e) {
    console.error('table处理错误', e.stack)
  }
}