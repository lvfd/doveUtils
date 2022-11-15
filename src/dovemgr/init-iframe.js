import BrowserDetector from 'browser-dtector'
import '@dove-css/dovemgr-iframe.css'

try {
  const browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent()
  if (browser.isIE) {
    import ('dom4')
      .then()
  } else {

  }
} catch(e) {

}