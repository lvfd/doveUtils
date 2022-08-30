function getHeight_iframe_adaptiveContent(iframe, config) {
  var content = iframe.contentDocument? iframe.contentDocument: iframe.contentWindow.document;
  var documentElement_height = content.documentElement.scrollHeight;
  var html_height = content.querySelector('html').scrollHeight;
  var body_height = content.body.scrollHeight;
  if (config && config.type === 'body') return body_height;
  var height = Math.max(documentElement_height, html_height, body_height);
  return height;
}
/* 测试： */
// getHeight_iframe_adaptiveContent(iframe, {type: 'body'})

function getHeight_mainContent_minHeight(nodeArray) {
  const windowHeight = window.innerHeight
  if (!nodeArray ||　!nodeArray.length) {
    return windowHeight
  }
  let finalHeight = windowHeight
  for (let i = 0; i < nodeArray.length; i++) {
    let height = nodeArray[i].offsetHeight
    finalHeight = finalHeight - height
  }
  return finalHeight
}
/* 测试： */
// const test = getHeight_mainContent_minHeight([
//  document.querySelector('.gblMHeader'),
//  document.querySelector('#gblMarketingFooter'),
// ])
// console.log(`%c --------------${test}`, 'color: green')

export {
  getHeight_iframe_adaptiveContent,
  getHeight_mainContent_minHeight,
}