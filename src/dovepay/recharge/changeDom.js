import {
  log_changeDom as log,
  dovepay,
} from './public'

const regExp = {
  accountAction: new RegExp(/dovePay.protected.accountAction/, 'i'),
}

function changeMainContentWidth(iframe) {
  const rootDoc = iframe.contentDocument
  const iframeSrc = iframe.contentWindow.location.href
  const entryReg = regExp.accountAction
  /* 不设置拦截 */
  // const key = entryReg.test(iframeSrc)
  // if (key === false) {
  //   return
  // }
  log(`--------> ${iframeSrc} 进入changeWidth方法`)
  dovepay.width_resize(iframe)
}

function changeButtonStyle(iframe) {
  const rootDoc = iframe.contentDocument
  const iframeSrc = iframe.contentWindow.location.href
  const entryReg = regExp.accountAction
  const key = entryReg.test(iframeSrc)
  if (key === false) {
    return
  }
  log(`--------> ${iframeSrc} 进入changeButtonStyle方法`)
  let countOfChange = 0
  const submitBtnList = rootDoc.querySelectorAll('input.bt01')
  if (submitBtnList.length > 0) {
    for (let i = 0; i < submitBtnList.length; i++) {
      const submitBtn = submitBtnList[i]
      if (submitBtn.classList.contains('uk-button')) {
        continue
      }
      submitBtn.classList.remove('bt01')
      submitBtn.classList.add('uk-button')
      if (submitBtn.value === '下一步') {
        submitBtn.classList.add('uk-button-secondary')
      }
      else {
        submitBtn.classList.add('uk-button-primary')
      }
      countOfChange++
    }
  }
  log(`--------> ${iframeSrc} 完成changeButtonStyle: ${countOfChange}项更改`)
}

function changeRechargeStepArrow(iframe) {
  const rootDoc = iframe.contentDocument
  const iframeSrc = iframe.contentWindow.location.href
  const entryReg = regExp.accountAction
  const key = entryReg.test(iframeSrc)
  if (key === false) {
    return
  }
  log(`--------> ${iframeSrc} 进入changeRechargeStepArrow方法`)
  
  const alreadyUpdate = rootDoc.querySelector('progress.uk-progress')
  if (alreadyUpdate) {
    return
  }
  const oldTd = rootDoc.querySelectorAll('td[background]')
  if (oldTd.length < 1) {
    return
  }
  const imgReg = new RegExp(/images.cz.03.bg/, 'i')
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
    dovepay.init_step(progress, [1, stepNumberTotal])
  }, 0)

  return {
    text: tdNode.parentNode,
    progress: trPr,
  }
}

function buildBankLogoButton(iframe) {
  const rootDoc = iframe.contentDocument
  const iframeSrc = iframe.contentWindow.location.href
  const entryReg = regExp.accountAction
  const key = entryReg.test(iframeSrc)
  if (key === false) {
    return
  }
  log(`--------> ${iframeSrc} 进入 buildBankLogoButton 方法`)
  
  let logoBtn = document.createElement('button')
  logoBtn.classList.add('uk-button')
  logoBtn.classList.add('uk-button-default')
  logoBtn.setAttribute('type', 'button')
  let logoSpan = document.createElement('span')
  logoSpan.classList.add('dove-banklogo')
  logoSpan.setAttribute('data-content', '银行和机构logo')
  logoBtn.appendChild(logoSpan)



  return logoBtn
}

export {
  changeRechargeStepArrow,
  changeButtonStyle,
  changeMainContentWidth,
}