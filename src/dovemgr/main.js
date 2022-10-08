import setIframe from './iframe'
import setMenu from './menu'
import {show} from './functions'

export default function() {
  try {
    const iframe = document.querySelector('#frame_content')
    setIframe(iframe)
    setIframeHeight()
    setMenu()
  } catch(e) {
    console.error('页面框架main.js处理失败', e.stack)
  } finally {
    const footer = document.querySelector('footer')
    if (footer) show(footer)
  }
}

export function setIframeHeight() {
  try {
    const iframeHeight = getIframeHeight()
    const iframe = document.querySelector('#frame_content')
    iframe.height = iframeHeight
  } catch(e) {
    console.error('初始化iframe错误', e.stack)
  }
}

function getIframeHeight() {
  const hh = window.getComputedStyle(document.querySelector('header')).getPropertyValue('height')
  const fh = window.getComputedStyle(document.querySelector('footer')).getPropertyValue('height')
  const deciHeight = parseInt(hh) + parseInt(fh)
  return window.innerHeight - deciHeight
}