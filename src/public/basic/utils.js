export function isJSON(str) {
  if (typeof str !== "string") return false;
  try {
      var object = JSON.parse(str);
      if(object && typeof object === "object"){
        return true
      } else {
        return false
      }
  }catch (e) {
    console.error(e)
  }
}

export function isDOM(item) {
  return (typeof HTMLElement === 'function')
    ? (item instanceof HTMLElement)
    : (item && (typeof item === 'object') && (item.nodeType === 1) && (typeof item.nodeName === 'string'));
}

export function getObjWindow(iframeNode) {
  return iframeNode? iframeNode.contentWindow: window
}

export function getObjDocument(iframeNode) {
  return iframeNode? iframeNode.contentDocument: document
}