import {importCss, mgrcss} from './import'
import {importJs, showModalDialog} from './import'
import {show} from './functions'

export default function(iframe) {
  try {

    const href = iframe.contentWindow.location.href
    console.log(href)

    const userweb = /dovepayUserWebMgrAction/
    if (userweb.test(href)) {
      console.log('用户系统')
      show(iframe)
      return
    }

    const js = importJs(iframe, showModalDialog)
    js.addEventListener('error', () => console.error('加载polyfill错误'))

    const css = importCss(iframe, mgrcss)
    css.addEventListener('error', () => {
      show(iframe)
      console.error('加载css错误')
    })
    css.addEventListener('load', () => {
      show(iframe)
    })
    
  } catch(e) {
    show(iframe)
    console.error('处理iframe.contentDocument失败', e.stack)
  }
}