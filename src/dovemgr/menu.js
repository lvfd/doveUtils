import BrowserDetector from 'browser-dtector'
const browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent()
export default function() {
  try {
    const aList = document.querySelectorAll('.showList')
    if (aList.length > 0) {
      let i = 0
      fetchDetailMenu(aList, i)
    }
  } catch(e) {
    console.error('次级菜单获取错误', e.stack)
  }
}

function fetchDetailMenu(aList, i) {
  $.ajax({
    type: 'POST',
    url: 'navAction.do',
    data: {
      m: 'display',
      rc: aList[i].getAttribute('data-id'),
    },
    dataType: 'html',
    success: function(res) {
      try {
        const ul = aList[i].parentNode.querySelector('ul.uk-nav-sub')
        if (!browser.isIE) ul.classList.add('uk-nav-default')
        ul.innerHTML = res
        if (i < aList.length-1) {
          i++
          fetchDetailMenu(aList, i)
        } else {
          if (browser.isIE) document.querySelectorAll('.uk-nav-divider').forEach(el => el.classList.remove('uk-nav-divider'))
          document.querySelector('button.toMenu').click()
        }
      } catch(e) {
        console.error('次级菜单设置错误', i, aList[i], e.stack)
      }
    },
    error: function(e) {
      console.error(e)
      if (i < aList.length-1) {
        i++
        fetchDetailMenu(aList, i)
      }
    }
  })
}