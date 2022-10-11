import {show, hide} from './functions'

export default function(iframe, loadHandler) {
  if (!iframe) return
  try {
    hide(iframe)
    iframe.addEventListener('error', () => {
      show(iframe)
      alert('iframe加载错误')
    })
    iframe.addEventListener('load', iframeHandler(loadHandler))
  } catch(e) {
    show(iframe)
    console.error('绑定iframe函数错误', e.stack)
  }
}

function iframeHandler(loadHandler) {
  return (e) => {
    const iframe = e.target
    if (!iframe) return
    try {
      iframe.contentWindow.addEventListener('unload', () => {
        hide(iframe)
      })
      loadHandler(iframe)
    } catch(e) {
      show(iframe)
      console.error('iframe处理失败', e.stack)
    }
  }  
}
