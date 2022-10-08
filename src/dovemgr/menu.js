export default function() {
  try {
    const aList = document.querySelectorAll('.showList')
    if (aList.length > 0) {
      aList.forEach(function(link) {
        $.ajax({
          type: 'POST',
          url: 'navAction.do',
          data: {
            m: 'display',
            rc: link.dataset.id,
          },
          dataType: 'html',
          success: function(res) {
            try {
              const ul = document.createElement('ul')
              ul.classList.add('uk-nav-sub')
              ul.classList.add('uk-nav-default')
              ul.innerHTML = res
              link.parentNode.appendChild(ul)
               // secondMenuHandler()
            } catch(e) {
              console.error('次级菜单设置错误', e.stack)
            }
          },
          error: function(e) {
            console.error(e)
          }
        })
      })
    }
  } catch(e) {
    console.error('次级菜单获取错误', e.stack)
  }
  // function secondMenuHandler() {
  //   try {
  //     const linkList = document.querySelectorAll('.uk-accordion-content li a')
  //     linkList.forEach(function(link) {
  //       link.addEventListener('click', clickHandler)
  //     })
  //   } catch(e) {
  //     console.error('绑定次级菜单函数错误', e.stack)
  //   }
  //   function clickHandler() {
  //     try {
  //       const iframe = document.querySelector('#frame_content')
  //       iframe.addEventListener('load', function(){
  //         try {
  //           const close = document.querySelector('.uk-offcanvas-close')
  //           close.click()
  //         } catch(e) {
  //           console.error('offcanvas关闭错误', e.stack)
  //         }
  //       })
  //     } catch (e) {
  //       console.error('iframe获取错误', e.stack)
  //     }
  //   }
  // }
}