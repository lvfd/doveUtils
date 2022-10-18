export default function (show, config/*{html: '<h1>loading</h1>', transparent: false}, iframe: '#iframeId'*/) {
  try {

    const html = config && config.html? config.html + '<span class="sr-only">加载中...</span>': '<div uk-spinner></div><span class="sr-only">加载中...</span>'
    const rootDocument = config && config.iframe? config.iframe.contentDocument: document
    const transparent = config && config.transparent === false? false: true
    const body = rootDocument.querySelector('body')
    const main = rootDocument.querySelector('main')
    const parentNode = main? main: body

    // /* dovePay项目存在zindex问题的nodelist */
    const nodelistCannotCover = rootDocument.querySelectorAll('.gblMHeader .nav ul li, .gblMHeader .nav ul li.dropdown a')

    /* 显示遮罩 */
    if (/^show/.test(show)) {

      if (rootDocument.querySelector('#loadingOverlay')) {
        return
      }

      /* 解决dovePay项目zindex问题 */
      if (nodelistCannotCover.length > 0) {
        nodelistCannotCover.forEach(function(nodeCannotCover) {
          nodeCannotCover.style.zIndex = 0
        })
      }

      /* parentNode隐藏滚动条 */
      parentNode.style.overflow = 'hidden'

      /* 建立遮罩层并添加 */
      const div = rootDocument.createElement('div')
      div.setAttribute('id', 'loadingOverlay')
      div.style.position = 'fixed'
      div.classList.add('uk-position-cover', 'uk-overlay', 'uk-flex', 'uk-flex-center', 'uk-flex-middle')
      if (transparent) {
        div.classList.add('uk-overlay-default')
      } else {
        div.style.backgroundColor = '#F4F6F6'
      }
      div.innerHTML = html
      parentNode.appendChild(div)

    }

    /* 隐藏遮罩 */
    if (/^hide/.test(show)) {

      const div = rootDocument.querySelectorAll('#loadingOverlay');
      if (div.length === 0) {
        return
      }
      
      /* 还原dovePay项目zindex */
      if (nodelistCannotCover.length > 0) {
        nodelistCannotCover.forEach(function(nodeCannotCover) {
          nodeCannotCover.style.zIndex = 2
        })
      }

      /* parentNode隐藏滚动条 */
      parentNode.style.overflow = 'initial'
      
      for (var i = 0; i < div.length; i++) {
        div[i].parentNode.removeChild(div[i]);
      }

    }
  } catch (e) {
    console.error(`遮罩层${show}操作失败`, e.stack)
  }
}