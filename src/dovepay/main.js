import setIframe from '../dovemgr/iframe'
import iframeContentHandler from './contentDocument'

export default function() {
  try {
    const iframe = document.querySelector('#content_opr')
    setIframeHeight(iframe)
    window.addEventListener('resize', () => setIframeHeight(iframe))
    setIframe(iframe, iframeContentHandler)
  } catch(e) {
    console.error('页面框架main.js处理失败', e.stack)
  }
}

export function setIframeHeight(iframe) {
  try {
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const menu = document.querySelector('#my_menu')
    const headerh = header? window.getComputedStyle(header).getPropertyValue('height'): 0
    const footerh = footer? window.getComputedStyle(footer).getPropertyValue('height'): 0
    const menuh = menu? window.getComputedStyle(menu).getPropertyValue('height'): 0
    const minHeight = parseInt(window.innerHeight) - parseInt(headerh) - parseInt(footerh) - parseInt(menuh)
    const icd = iframe.contentDocument
    const body = icd.body
    const html = icd.querySelector('html')
    const bodyh = body? window.getComputedStyle(body).getPropertyValue('height'): 0
    const htmlh = html? window.getComputedStyle(html).getPropertyValue('height'): 0
    const height = Math.max(parseInt(bodyh), parseInt(htmlh), minHeight)
    iframe.style.height = `${height}px`
    return height
  } catch(e) {
    console.error('设置iframe高度失败', e.stack)
  }
}