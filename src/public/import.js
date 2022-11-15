import BrowserDetector from 'browser-dtector'
import urls from '../public/urls'

const browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent()

const host = urls.host.inTime
export var paycss = `${host}${urls.plugin.css.dovepay}`
export var payiframecss = `${host}${urls.plugin.css['dovepay-iframe']}`
export var ukcss = `${host}${urls.uikit.v3.css}`
export var ukjs = `${host}${urls.uikit.v3.js}`
export var ukiconjs = `${host}${urls.uikit.v3.icon}`
export var v2css = `${host}${urls.uikit.v2.css}`
export var v2js = `${host}${urls.uikit.v2.js}`
export var v2convert = `${host}${urls.uikit.v2.convert}`

export function importCss(iframe, url) {
  try {
    const icd = iframe === document? document: iframe.contentDocument
    const ready = icd.querySelector(`link[href="${url}"]`)
    if (ready) return 'ready'
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', url)
    const head = icd.querySelector('head')
    head.appendChild(link)
    return link
  } catch(e) {
    console.error('引入css错误', e.stack)
  }
}

export function importJs(iframe, url) {
  try {
    const icd = iframe === document? document: iframe.contentDocument
    const ready = icd.querySelector(`script[src="${url}"]`)
    if (ready) return 'ready'
    const script = document.createElement('script')
    script.setAttribute('src', url)
    const head = icd.querySelector('head')
    const firstScript = head.querySelector('script')
    if (firstScript) {
      head.insertBefore(script, firstScript)
    } else {
      head.appendChild(script)
    }
    return script
  } catch(e) {
    console.error('引入js错误', e.stack)
  }
}

export function importUk(iframe) {
  if (browser.isIE) {
    return new Promise((resolve, reject) => {
      const css_1 = importCss(iframe, v2css)
      if (css_1 === 'ready') {
        importUkV3Css()
      } else {
        css_1.addEventListener('error', () => reject('加载uikitV2css失败'))
        css_1.addEventListener('load', importUkV3Css)
      }
      function importUkV3Css() {
        const css_2 = importCss(iframe, ukcss)
        if (css_2 === 'ready') {
          importUkV2js()
        } else {
          css_2.addEventListener('error', () => reject('加载uikitV3CSS失败'))
          css_2.addEventListener('load', importUkV2js)
        }
      }
      function importUkV2js() {
        const jsV2 = importJs(iframe, v2js)
        if (jsV2 === 'ready') {
          importConvertJs()
        } else {
          jsV2.addEventListener('error', () => reject('加载uikitV2js失败'))
          jsV2.addEventListener('load', importConvertJs)
        }
      }
      function importConvertJs() {
        const convertJs = importJs(iframe, v2convert)
        if (convertJs === 'ready') {
          resolve()
        } else {
          convertJs.addEventListener('error', () => reject('加载convertjs失败'))
          convertJs.addEventListener('load', () => resolve())
        }
      } 
    })
  } else {
    return new Promise((resolve, reject) => {
      const css = importCss(iframe, ukcss)
      if (css === 'ready') {
        importUkjs()
      } else {
        css.addEventListener('error', () => reject('加载uikit.css失败'))
        css.addEventListener('load', importUkjs)
      }
      function importUkjs() {
        const js = importJs(iframe, ukjs)
        if (js === 'ready') {
          importUkiconjs()
        } else {
          js.addEventListener('error', () => reject('加载uikit.js失败'))
          js.addEventListener('load', importUkiconjs)
        }
      }
      function importUkiconjs() {
        const js = importJs(iframe, ukiconjs)
        if (js === 'ready') {
          resolve()
        } else {
          js.addEventListener('error', () => reject('加载uikit-icon.js失败'))
          js.addEventListener('load', () => resolve())
        }
      }
    })
  }
}