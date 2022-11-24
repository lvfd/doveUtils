/* 
Usage:
  dovemgr 
*/

export default function(config) {
  try {
    const url = config.url
    const type = config.type
    const root = config.root? config.root.contentDocument: document
    const isReady = type === 'script'?
      root.querySelector(`script[src="${url}"`):
      root.querySelector(`link[href="${url}]`)
    if (isReady) return Promise.resolve('ready')
    const el = document.createElement(type)
    if (type === 'script') {
      el.setAttribute('src', url)
    }
    if (type === 'link') {
      el.setAttribute('rel', 'stylesheet')
      el.setAttribute('type', 'text/css')
      el.setAttribute('href', url)
    }
    const parent = root.querySelector('head')?
      root.querySelector('head'):
      root.querySelector('body')
    parent.appendChild(el)
    return new Promise((resolve, reject) => {
      el.addEventListener('load', event => resolve(event))
      el.addEventListener('error', event => reject(event))
    })
  } catch(e) {
    console.log(e, e.stack)
    return Promise.reject(new Error(e))
  }
}