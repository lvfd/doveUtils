import {importCss, importJs} from '../public/import'
import urls from '../public/urls'
import {show, setInlineStyle, transLinks} from '@dove/functions'

export default function(iframe) {
  try {

    /* 过滤器 */
    const href = iframe.contentWindow.location.href
    const userweb = /dovepayUserWebMgrAction/
    if (userweb.test(href)) {
      console.log('用户系统')
      show(iframe)
      return
    }

    /* 转移body下的link */
    transLinks(iframe)

    /* import files into iframe (async) */
    const js = importJs(iframe, `${urls.host.inTime}${urls.plugin.js.showModalDialog}`)
    js.addEventListener('error', () => console.error('加载polyfill错误'))
    const css = importCss(iframe, `${urls.host.inTime}${urls.plugin.css.dovemgr}`)
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
  setInlineStyle('div[style*="820px"]', expW, {iframe: iframe})
  setInlineStyle('div[style*="800px"]', expWH, {iframe: iframe})
  setInlineStyle('div[style*="810px"]', expW, {iframe: iframe})
  setDivFixedWidthInMainContent(iframe)
}

function setDivFixedWidthInMainContent(iframe) {
  excute(iframe)
  window.addEventListener('resize', () => {excute(iframe)})
  function excute(iframe) {
    try {
      const mainContent = iframe.contentDocument.querySelector('div.mainContent')
      const table = iframe.contentDocument.querySelector('div.mainContent table[class="tb_con_border1 tableBorder"]')
      if (!mainContent) return
      if (!table) return
      const div = table.parentNode
      if (!div) return
      if (div.tagName !== 'DIV') return
      const widthMain = window.getComputedStyle(mainContent).getPropertyValue('width')
      div.style.width = widthMain
    } catch(e) {
      console.error('设置超宽table失败', e.stack)
    }
  }
}
  