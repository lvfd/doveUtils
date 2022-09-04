
// 返回根据内容高度决定iframe高度
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

// 返回根据浏览器界面高度(和界面固定element高度)决定iframe最小高度
function getHeight_mainContent_minHeight(nodeArray) {
  const windowHeight = window.innerHeight
  if (!nodeArray ||!nodeArray.length) {
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

// 执行根据内容高度决定iframe(uikit-modal)高度
function adaptContentIframe(root) {
  var iframes = root? root.querySelectorAll('iframe[dp-adaptcontent]'):document.querySelectorAll('iframe[dp-adaptcontent]');
  if (iframes.length < 1) {
    return
  }
  for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    iframe.onload = resize;
  }
  function resize() {
    try {
      var wrap = this.parentElement;
      if (wrap.tagName.toLowerCase() === 'div') {
        wrap.style.overflow = 'auto';
        wrap.style.width = '100%';
      }
      var wrapPadding = parseInt(getComputedStyle(this).getPropertyValue('padding-top')) +
                        parseInt(getComputedStyle(this).getPropertyValue('padding-bottom'));
      this.style.width = 'inherit'
      const contentHeight = this.contentDocument.body.offsetHeight
      let finalHeight = parseInt(contentHeight + wrapPadding)
      const footDialog = this.contentDocument.querySelector('.foot.dialog')
      if (footDialog) {
        finalHeight += parseInt(window.getComputedStyle(footDialog).getPropertyValue('margin-bottom'))
      }
      this.style.height = finalHeight + 'px'
    } catch (e) {
      if (console) console.error(e);
    }
  }
}

// 执行根据内容高度或浏览器高度决定iframe(系统界面)高度
function resizeMainContentIframe(iframe) {
  const subNavNode = document.querySelector('#mainContent .uk-subnav')
  const subNavMarginBottom = window.getComputedStyle(subNavNode).getPropertyValue('margin-bottom')
  const height = getHeight_iframe_adaptiveContent(iframe, {type: 'body'})
  const minHeight = getHeight_mainContent_minHeight([
    document.querySelector('.gblMHeader'),
    document.querySelector('#gblMarketingFooter'),
    document.querySelector('#my_menu')
  ]) - parseInt(subNavMarginBottom)
  // log(`[iframe框架高度初始化] height: ${height}, minHeight: ${minHeight}`)
  iframe.height = Math.max(height, minHeight);
}

export {
  adaptContentIframe,
  resizeMainContentIframe,
}