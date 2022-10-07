export var mgrcss = 'http://localhost:3013/doveutils/plugin/css/dovemgr.css'

export default function (icd, url) {
  try {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', url)
    const head = icd.querySelector('head')
    head.appendChild(link)
  } catch(e) {
    console.error('引入css错误', e.stack)
  }
}