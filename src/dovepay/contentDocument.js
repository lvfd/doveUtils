import {importCss, payiframecss, importJs, showModalDialog, importUk} from '../dovemgr/import'
import {transLinks} from '../dovemgr/functions'
import {hideDropdown} from './functions'
import {display} from './main'
import contentDocumentHandler from './contentDocumentHandler'
import {setIframeHeight as updateIframeHeight} from './main'
import {filter} from './router'
import catalog from './catalog'

export default function(iframe) {
  try {
    console.info('------>onload', `href=${iframe.contentWindow.location.href}`)

    /* 绑定点击事件 */
    iframe.contentDocument.addEventListener('click', () => hideDropdown())

    /* 过滤器 */
    const href = iframe.contentWindow.location.href
    if (/dovepayUserWebMgrAction/.test(href)) {
      console.log('用户系统')
      display(iframe)
      return
    }


    /* 转移body下的link */
    transLinks(iframe)

    /* 异步import */
    const js = importJs(iframe, showModalDialog)
    js.addEventListener('error', () => console.error('加载polyfill错误'))

    /* iframeDOM变动自动调整iframe高度 */
    if (typeof MutationObserver === 'function') {
      try {
        const mo = new MutationObserver(() => updateIframeHeight(iframe))
        mo.observe(iframe.contentDocument.body, {
          childList: true, 
          subtree: true,
          attributes: true,
        })
      } catch(e) {
        console.error('绑定DOM树监听错误', e.stack)
      }
    }

    /* 过滤器 */
    let idArr = []
    catalog.forEach((page) => {
      idArr.push(page.id)
    })
    if (filter(iframe, idArr)) {
      iframe.style.width = '100%'
    } else {
      iframe.style.width = '980px'
      updateIframeHeight(iframe)
      display(iframe)
      return
    }

    /* import uikit */
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



function syncImport(iframe) {
  return new Promise((resolve, reject) => {
    const css = importCss(iframe, payiframecss)
    css.addEventListener('error', () => reject('加载iframe内css失败'))
    css.addEventListener('load', () => resolve())
  })
}