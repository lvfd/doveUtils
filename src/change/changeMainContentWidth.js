// import regExp from './filter'
import {
  log_changeDom as log,
  getObjWindow as getWindow,
  // getObjDocument as getDocument,
} from '../public'
import width_resize from './width_resize'

function changeMainContentWidth(iframe) {
  // const rootDoc = getDocument(iframe)
  const iframeSrc = getWindow(iframe).location.href
  // const entryReg = regExp.accountAction
  /* 不设置拦截 */
  // const key = entryReg.test(iframeSrc)
  // if (key === false) {
  //   return
  // }
  log(`--------> ${iframeSrc} 进入changeWidth方法`)
  width_resize(iframe)
}

export default changeMainContentWidth