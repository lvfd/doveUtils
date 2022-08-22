const common = {
  isJSON: function(str) {
    if (typeof str !== "string") return false;
    try {
        var object = JSON.parse(str);
        if(object && typeof object === "object"){
          return true
        } else {
          return false
        }
    }catch (e) {}
  },
  isDOM: function(item) {
    return (typeof HTMLElement === 'function')
      ? (item instanceof HTMLElement)
      : (item && (typeof item === 'object') && (item.nodeType === 1) && (typeof item.nodeName === 'string'));
  },
}
export default common
  