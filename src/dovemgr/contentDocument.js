import {importCss, mgrcss} from './import'
import {importJs, showModalDialog} from './import'
import {show, setInlineStyle} from './functions'

export default function(iframe) {
  try {

    const href = iframe.contentWindow.location.href
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
      inlineStyleHandler(iframe)
      show(iframe)
    })

  } catch(e) {
    show(iframe)
    console.error('处理iframe.contentDocument失败', e.stack)
  }
}

function inlineStyleHandler(iframe) {
  const expW = { width: '100%', boxSizing: 'border-box'}
  const expWH = { width: '100%', height: '100%', boxSizing: 'border-box'}
  setInlineStyle('div[style*="825px"]', expWH, {iframe: iframe})
  setInlineStyle('div[style*="800px"]', expWH, {iframe: iframe})
  setInlineStyle('div[style*="810px"]', expW, {iframe: iframe})
}
