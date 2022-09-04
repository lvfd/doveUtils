export function getNodeBase(type) {
  const localhostPort = 3013
  const root = window.location
  const protocol = root.protocol
  const host = root.host
  let hostname = root.hostname
  if (/(^localhost$)|(^10\.1\.\d+\.\d+$)/.test(hostname)) {
    hostname += `:${localhostPort}`
  }
  if (type && type === 'java') {
    if (/^10\.1\.\d+\.\d+$/.test(root.hostname)) {
      return 'https://test.dovepay.com'
    }
    return `${protocol}//${host}`
  }
  return `${protocol}//${hostname}`
}

export function getNodeSuffix() {
  const hostname = window.location.hostname
  const suffixPro = '.min.'
  const suffixDev = '.'
  if (hostname === 'localhost') return suffixDev
  return suffixPro
}

export function loadfile(fileType, config) {
  if (!fileType || !config || !config.url) throw new Error('缺少参数')
  const type = fileType === 'js'? 'script': 'link'
  const url = config.url
  const root = config.root || document
  
  let node = document.createElement(type)
  if (type === 'script') {
    node.src = url
  }
  if (type === 'link') {
    node.href = url
    node.rel = 'stylesheet'
  }
  const head = root.querySelector('head')
  const body = root.querySelector('body')
  if (!head && !body) throw new Error('没有head和body节点')
  if (head) {
    head.appendChild(node)
  } else {
    body.insertBefore(node, body.firstChild)
  }
  const promise = new Promise((resolve) => {
    return node.onload = function() {
      const trigger = this
      const url = trigger.src? trigger.src: trigger.href
      resolve(`来自${url}的${trigger.tagName}加载完毕`)
    }
  })
  return promise
}