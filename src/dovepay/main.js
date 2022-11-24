import setIframe from '@dove/iframe'
import dominit from '@dove/dominit'
import iframeContentHandler from '@dove-pay/contentDocument'
import {setIframeHeight, display, hide, setSubNav, adaptContentIframe} from '@dove-pay/functions'
import getVendor from '@dove-pay/vendor'
import dovepay_css from '@dove-css/dovepay.css'

getVendor()
document.write(`<link type="text/css" rel="stylesheet" href="${dovepay_css}">`)
window.addEventListener('DOMContentLoaded', main)

function main() {
  try {
    dominit()
    setSubNav()
    adaptContentIframe()
    const iframe = document.querySelector('#content_opr')
    setIframeHeight(iframe)
    window.addEventListener('resize', () => setIframeHeight(iframe))
    setIframe(iframe, iframeContentHandler, {show: display, hide: hide})
  } catch(e) {
    console.error('页面框架main.js处理失败', e.stack)
  }
}