function Common() {}

Common.prototype.isJSON = function(str) {
  if (typeof str !== "string") return false;
  try {
      var object = JSON.parse(str);
      if(object && typeof object === "object"){
        return true
      } else {
        return false
      }
  }catch (e) {}
}

Common.prototype.isDOM = function(item) {
  return (typeof HTMLElement === 'function')
    ? (item instanceof HTMLElement)
    : (item && (typeof item === 'object') && (item.nodeType === 1) && (typeof item.nodeName === 'string'));
}

Common.prototype.getNodeBase = function(type) {
  const localhostPort = 3013
  const root = window.location
  const protocol = root.protocol
  const host = root.host
  let hostname = root.hostname
  if (hostname === 'localhost') {
    hostname += `:${localhostPort}`
  }
  if (type && type === 'java') {
    return `${protocol}//${host}`
  }
  return `${protocol}//${hostname}`
}

Common.prototype.getNodeSuffix = function() {
  const hostname = window.location.hostname
  const suffixPro = '.min.'
  const suffixDev = '.'
  if (hostname === 'localhost') return suffixDev
  return suffixPro
}

Common.prototype.loadfile = function(fileType, config) {
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
  const promise = new Promise((resolve, reject) => {
    return node.onload = function() {
      const trigger = this
      const url = trigger.src? trigger.src: trigger.href
      resolve(`来自${url}的${trigger.tagName}加载完毕`)
    }
  })
  return promise
}


const common = new Common()

export default common
  