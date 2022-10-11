import {importCss, payiframecss, importJs, showModalDialog, importUk} from '../dovemgr/import'
import {show, transLinks} from '../dovemgr/functions'
import {hideDropdown} from './functions'
import contentDocumentHandler from './contentDocumentHandler'

export default function(iframe) {
  try {

    /* 绑定点击事件 */
    iframe.contentDocument.body.addEventListener('click', () => hideDropdown())

    /* 过滤器 */
    const href = iframe.contentWindow.location.href
    const userweb = /dovepayUserWebMgrAction/
    if (userweb.test(href)) {
      console.log('用户系统')
      display(iframe)
      return
    }

    /* 转移body下的link */
    transLinks(iframe)

    /* 异步import */
    const js = importJs(iframe, showModalDialog)
    js.addEventListener('error', () => console.error('加载polyfill错误'))

    /* 同步import */
    importUk(iframe)
    .then(() => syncImport(iframe))
    .then(() => contentDocumentHandler(iframe))
    .catch((reject) => {
      console.error('引入uikit组件错误:', reject)
      display(iframe)
    })

  } catch(e) {
    display(iframe)
    console.error('处理iframe.contentDocument失败', e.stack)
  }
}

export function display(iframe) {
  hideDropdown()
  show(iframe)
}

function syncImport(iframe) {
  return new Promise((resolve, reject) => {
    const css = importCss(iframe, payiframecss)
    css.addEventListener('error', () => reject('加载iframe内css失败'))
    css.addEventListener('load', () => resolve())
  })
}