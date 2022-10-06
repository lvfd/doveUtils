import contentHandler from './contentDocument'

/* 配置: */
const show = (el) => el.classList.remove('uk-invisible')
const hide = (el) => el.classList.add('uk-invisible')

export default function(iframe) {
  if (!iframe) return
  try {
    hide(iframe)
    iframe.addEventListener('error', () => {
      show(iframe)
      alert('iframe加载错误')
    })
    iframe.addEventListener('load', iframeHandler)
  } catch(e) {
    show(iframe)
    console.error('绑定iframe函数错误', e.stack)
  }
}

function iframeHandler(e) {
  const iframe = e.target
  if (!iframe) return
  try {
    iframe.contentWindow.addEventListener('unload', () => {
      hide(iframe)
    })
    contentHandler(iframe.contentDocument)
  } catch(e) {
    console.error('iframe处理失败', e.stack)
  } finally {
    show(iframe)
  }
}
