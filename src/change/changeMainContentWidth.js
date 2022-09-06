import regExp from './filter'
import {
  log_changeDom as log,
  getObjWindow as getWindow,
  // getObjDocument as getDocument,
} from '../public'
import {
  width_resize
} from '../dom'

function changeMainContentWidth(iframe) {
  // const rootDoc = getDocument(iframe)
  const iframeSrc = getWindow(iframe).location.href
  const userwebReg = regExp.userweb
  
  /* 设置拦截 */
  const isUserWeb = userwebReg.test(iframeSrc)
  if (isUserWeb) {
    return
  }

  log(`--------> ${iframeSrc} 进入changeWidth方法`)
  width_resize(iframe)
}

export default changeMainContentWidth