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
      rc: aList[i].dataset.id,
    },
    dataType: 'html',
    success: function(res) {
      try {
        const ul = document.createElement('ul')
        ul.classList.add('uk-nav-sub')
        ul.classList.add('uk-nav-default')
        ul.innerHTML = res
        aList[i].parentNode.appendChild(ul)
        if (i < aList.length-1) {
          i++
          fetchDetailMenu(aList, i)
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