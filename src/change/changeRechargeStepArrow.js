// import regExp from './filter'
import {
  log_changeDom as log,
  getObjWindow as getWindow,
  getObjDocument as getDocument,
} from '../public'
import {
  init_step,
} from '../dom'

function changeRechargeStepArrow(iframe) {
  const rootDoc = getDocument(iframe)
  const iframeSrc = getWindow(iframe).location.href
  // const entryReg = regExp.accountAction
  // const key = entryReg.test(iframeSrc)
  // if (key === false) {
  //   return
  // }
  log(`--------> ${iframeSrc} 进入changeRechargeStepArrow方法`)
  
  const alreadyUpdate = rootDoc.querySelector('progress.uk-progress')
  if (alreadyUpdate) {
    return
  }
  const oldTd = rootDoc.querySelectorAll('td[background]')
  if (oldTd.length < 1) {
    return
  }
  const imgReg = new RegExp(/images.cz.0\d.bg/, 'i')
  let tdNode = null
  for (let i = 0; i < oldTd.length; i++) {
    const tdBgVal = oldTd[i].getAttribute('background')
    if (imgReg.test(tdBgVal)) {
      tdNode = oldTd[i]
      break
    }
  }
  if (tdNode === null) {
    return
  }
  // console.log(tdNode)
  const stepTds = tdNode.querySelectorAll('td')
  if (!stepTds || stepTds.length < 1) {
    return
  }
  let stepNumber = 0
  let stepNumberTotal = stepTds.length
  for (let i = 0; i < stepTds.length; i++) {
    if (/whiteblod/.test(stepTds[i].getAttribute('class'))) {
      stepNumber = i +1
      stepTds[i].setAttribute('class', 'blod01')
      break
    }
  }
  if (stepNumber === 0) {
    return
  }
  // log(`----------->${stepNumber}, ${stepNumberTotal}`)
  const progress = document.createElement('progress')
  progress.setAttribute('class', 'uk-progress')
  progress.value = stepNumber -1
  progress.setAttribute('max', stepNumberTotal)
  const hr = document.createElement('hr')
  const tdPr = document.createElement('td')
  const trPr = document.createElement('tr')
  tdPr.appendChild(progress)
  tdPr.appendChild(hr)
  trPr.appendChild(tdPr)
  try {
    const tdNodesTr = tdNode.parentNode
    tdNodesTr.parentNode.insertBefore(trPr, tdNodesTr.nextSibling)
  } catch (e) {
    console.error(e.stack)
  }

  tdNode.removeAttribute('height')
  tdNode.removeAttribute('background')
  tdNode.style.height = '3em'
  log(`--------> ${iframeSrc} 完成changeRechargeStepArrow方法`)

  window.setTimeout(function() {
    init_step(progress, [1, stepNumberTotal])
  }, 0)

  return {
    text: tdNode.parentNode,
    progress: trPr,
  }
}
 export default changeRechargeStepArrow