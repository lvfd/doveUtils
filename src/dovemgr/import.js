export var showModalDialog = 'https://test.dovepay.com/doveutils/plugin/showModalDialog.js'
export var mgrcss = 'https://test.dovepay.com/doveutils/plugin/css/dovemgr.css'

export function importCss(iframe, url) {
  try {
    const icd = iframe.contentDocument
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
    const icd = iframe.contentDocument
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