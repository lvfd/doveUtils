import regExp from './filter'
import {
  log_changeDom as log,
  getObjWindow as getWindow,
  getObjDocument as getDocument,
} from '../public'

function changeButtonStyle(iframe) {
  const rootDoc = getDocument(iframe)
  const iframeSrc = getWindow(iframe).location.href
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

export default changeButtonStyle