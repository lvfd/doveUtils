import {show as defaultShow, hide as defaultHide} from './functions'

export default function(iframe, loadHandler, config) {
  if (!iframe) return
  const show = config && config.show? config.show: defaultShow
  const hide = config && config.hide? config.hide: defaultHide
  try {
    hide(iframe)
    iframe.addEventListener('error', () => {
      show(iframe)
      alert('iframe加载错误')
    })
    iframe.addEventListener('load', iframeHandler(loadHandler, show, hide))
  } catch(e) {
    show(iframe)
    console.error('绑定iframe函数错误', e.stack)
  }
}

function iframeHandler(loadHandler, show, hide) {
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
      console.error('iframe.onload无法处理', e.stack)
    }
  }  
}