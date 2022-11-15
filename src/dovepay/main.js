import setIframe from '../dovemgr/iframe'
import iframeContentHandler from './contentDocument'
import {hideDropdown} from './functions'
import {show as mgrShow, hide as mgrHide} from '../dovemgr/functions'
import overlay from '../dom/loadingOverlay'
import {adaptContentIframe} from '../dom'
import {checkBrowser} from '../public/browser'

export default function() {
  try {
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
    // console.log('----------------------->', height, bodyh, htmlh )
    return height
  } catch(e) {
    console.error('设置iframe高度失败', e.stack)
  }``
}

export function display(iframe) {
  hideDropdown()
  mgrShow(iframe)
  if (checkBrowser.notIE) {
    overlay('hide')
  }
}

function hide(iframe) {
  try {
    if (checkBrowser.notIE) {
      overlay('show', {transparent: true})
    }
    mgrHide(iframe)
  } catch(e) {
    console.error('隐藏iframe失败', e.stack)    
  }
}

function setSubNav() {
  try {
    if (checkBrowser.isIE) return
    UIkit.util.on('#my_menu div[uk-dropdown]', 'beforeshow', setActiveStyle)
    UIkit.util.on('#my_menu div[uk-dropdown]', 'hidden', removeActiveStyle)
  } catch(e) {
    console.error('绑定UIkit事件失败', e.stack)
  }
  function setActiveStyle(e) {
    const li = e.srcElement.parentElement
    if (!li) return
    li.classList.add('active')
  }
  function removeActiveStyle(e) {
    const li = e.srcElement.parentElement
    if (!li) return
    li.classList.remove('active')
  }
}