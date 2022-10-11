export var show = (el) => el.classList.remove('uk-invisible')
export var hide = (el) => el.classList.add('uk-invisible')

/* 动态修改行内style */
export var setInlineStyle = (selector, styles, config) => {
  try {
    let root = document
    if (config) {
      if (config.iframe) {
        root = config.iframe.contentDocument
      }
    }
    const els = root.querySelectorAll(selector)
    if (els.length < 1) return
    if (typeof styles !== 'object') throw new Error('参数格式错误')
    els.forEach((el) => {
      for (let prop in styles) {
        el.style[prop] = styles[prop]
      }
    })
  } catch(e) {
    console.error('设置行内style失败', e.stack)
  }
}

/* 动态转移body内的link标签至head */
export var transLinks = (iframe) => {
  try {
    let root = iframe? iframe.contentDocument: document
    const links = root.body.querySelectorAll('link')
    if (links.length < 1) return
    const head = root.querySelector('head')
    links.forEach((link) => head.appendChild(link))
    return links
  } catch(e) {
    console.log('转移link失败', e.stack)
  }
}