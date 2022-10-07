export var mgrcss = ['mgrcss', 'http://localhost:3013/doveutils/plugin/css/dovemgr.css']

export default function (icd, url) {
  try {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('id', url[0])
    link.setAttribute('href', url[1])
    const head = icd.querySelector('head')
    head.appendChild(link)
  } catch(e) {
    console.error('引入css错误', e.stack)
  }
}