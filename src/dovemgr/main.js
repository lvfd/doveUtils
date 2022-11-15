import setIframe from '@dove/iframe'
import {show} from '@dove/functions'
import dominit from '@dove/dominit'
import getVendor from '@dove-mgr/vendor'
import setMenu from '@dove-mgr/menu'
import iframeContentHandler from '@dove-mgr/contentDocument'
import uk2dom from '@dove-mgr/uk2dom'

window.addEventListener('DOMContentLoaded', () => getVendor().then(() => mainHandler()).catch(e => console.error(e)))
window.addEventListener('resize', setIframeHeight)

function mainHandler() {
  try {
    import ('@dove-css/dovemgr.css')
    dominit()
    uk2dom()
    const iframe = document.querySelector('#frame_content')
    setIframe(iframe, iframeContentHandler)
    setIframeHeight(iframe)
    setMenu()
  } catch(e) {
    console.error(e, e.stack)
  } finally {
    const footer = document.querySelector('footer')
    if (footer) show(footer)
  }
}

function setIframeHeight(iframe) {
  try {
    const iframeHeight = getIframeHeight()
    iframe.height = iframeHeight
  } catch(e) {
    console.error(e, e.stack)
  }
  function getIframeHeight() {
    const hh = window.getComputedStyle(document.querySelector('header')).getPropertyValue('height')
    const fh = window.getComputedStyle(document.querySelector('footer')).getPropertyValue('height')
    const deciHeight = parseInt(hh) + parseInt(fh)
    return window.innerHeight - deciHeight
  }
}