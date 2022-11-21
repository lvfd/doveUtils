import BrowserDetector from 'browser-dtector'
import uk_css_v2 from 'uikit-v2/dist/css/uikit.min.css'
import 'uikit-v2/dist/fonts/fontawesome-webfont.ttf'
import 'uikit-v2/dist/fonts/fontawesome-webfont.woff'
import 'uikit-v2/dist/fonts/fontawesome-webfont.woff2'
import 'uikit-v2/dist/fonts/FontAwesome.otf'
import uk_js_v2 from 'uikit-v2/dist/js/uikit.min.js'
import uk_css_lts from 'uikit-lts/dist/css/uikit.dove-theme.min.css'
import uk_js_lts from 'uikit-lts/dist/js/uikit.min.js'
import uk_icons_js_lts from 'uikit-lts/dist/js/uikit-icons.min.js'
import jquery_v2 from 'jquery-v2'
import jquery_lts from 'jquery-lts'
import dom4 from 'dom4'
import showmodaldialog from 'showmodaldialog'
import addDom from '@dove/import'
import dovemgr_css from '@dove-css/dovemgr.css'

const browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent()

export default (iframe) => {
  if (browser.isIE) {
    return iframe? 
    addDom({url: dovemgr_css, type: 'link', root: iframe})
    .catch(e => console.log(e))
    : document.write(`
      <link type="text/css" rel="stylesheet" href="${uk_css_v2}">
      <script type="text/javascript" src="${jquery_v2}"></script>
      <script type="text/javascript" src="${uk_js_v2}"></script>
      <script type="text/javascript" src="${dom4}"></script>
    `)
  }
  else {
    return iframe?
    Promise.all([
      addDom({url: dovemgr_css, type: 'link', root: iframe}),
      addDom({url: showmodaldialog, type: 'script', root: iframe})
    ])
    .catch(e => console.log(e))
    : document.write(`
      <link type="text/css" rel="stylesheet" href="${uk_css_lts}">
      <script type="text/javascript" src="${jquery_lts}"></script>
      <script type="text/javascript" src="${uk_js_lts}"></script>
      <script type="text/javascript" src="${uk_icons_js_lts}"></script>
      <script type="text/javascript" src="${showmodaldialog}"></script>
    `)
  }
}

// export var byAddDom = (iframe) => {
//   if (browser.isIE) {

//   }
//   else {

//   }
// }