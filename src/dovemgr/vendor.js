import BrowserDetector from 'browser-dtector'

export default () => {
  const browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent()
  if (browser.isIE) {
    return Promise.all([
      import ('uikit-v2/dist/css/uikit.min.css'),
      import ('uikit-v2/dist/js/uikit.min.js'),
      import ('dom4'),
      // import ('@dove-css/dovemgr.css')
    ])
  }
  else {
    return Promise.all([
      import ('uikit-lts/dist/css/uikit.dove-theme.min.css'),
      import ('uikit-lts/dist/js/uikit.min.js'),
      import ('uikit-lts/dist/js/uikit-icons.min.js'),
      import ('showmodaldialog')
    ])
  }
}