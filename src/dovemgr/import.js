const host = 'https://test.dovepay.com'
export var showModalDialog = `${host}/doveutils/plugin/showModalDialog.js`
export var mgrcss = `${host}/doveutils/plugin/css/dovemgr.css`
export var paycss = `${host}/doveutils/plugin/css/dovepay.css`
export var payiframecss = `${host}/doveutils/plugin/css/dovepay-iframe.css`
export var ukcss = `${host}/doveuikit/dist/css/uikit.dove-theme.min.css`
export var ukjs = `${host}/doveuikit/dist/js/uikit.min.js`
export var ukiconjs = `${host}/doveuikit/dist/js/uikit-icons.min.js`

export function importCss(iframe, url) {
  try {
    const icd = iframe.contentDocument
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
    console.error('ÒıÈëcss´íÎó', e.stack)
  }
}

export function importJs(iframe, url) {
  try {
    const icd = iframe.contentDocument
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
    console.error('ÒıÈëjs´íÎó', e.stack)
  }
}

export function importUk(iframe) {
  return new Promise((resolve, reject) => {
    const css = importCss(iframe, ukcss)
    if (css === 'ready') {
      importUkjs()
    } else {
      css.addEventListener('error', () => reject('¼ÓÔØuikit.cssÊ§°Ü'))
      css.addEventListener('load', importUkjs)
    }
    function importUkjs() {
      const js = importJs(iframe, ukjs)
      if (js === 'ready') {
        importUkiconjs()
      } else {
        js.addEventListener('error', () => reject('¼ÓÔØuikit.jsÊ§°Ü'))
        js.addEventListener('load', importUkiconjs)
      }
    }
    function importUkiconjs() {
      const js = importJs(iframe, ukiconjs)
      if (js === 'ready') {
        resolve()
      } else {
        js.addEventListener('error', () => reject('¼ÓÔØuikit-icon.jsÊ§°Ü'))
        js.addEventListener('load', () => resolve())
      }
    }
  })
}