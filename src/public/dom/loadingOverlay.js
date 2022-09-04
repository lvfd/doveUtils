function loadingOverlay(show, html) {
  const body = document.querySelector('body')
  const main = document.querySelector('main')
  const parentNode = main? main: body
  if (show || !/^hide/.test(show)) {
    if (document.querySelector('#loadingOverlay')) {
      return
    }
    const div = document.createElement('div')
    div.setAttribute('id', 'loadingOverlay')
    div.setAttribute('uk-sticky', '')
    div.setAttribute('class', 'uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle')
    div.innerHTML = html? html: '<span class="sr-only">加载中...</span>'
    parentNode.appendChild(div)
  }
  else {
    const div = document.querySelectorAll('#loadingOverlay');
      if (div.length === 0) {
        return
      }
      for (var i = 0; i < div.length; i++) {
        div[i].parentNode.removeChild(div[i]);
      }
  }
}

export default loadingOverlay