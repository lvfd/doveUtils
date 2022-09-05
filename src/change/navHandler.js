export function dovePayNavHandler() {
  const navChildLinkList = document.querySelectorAll('#my_menu a[target="content_opr"]')
  if (navChildLinkList.length === 0) {
    return
  }
  try {
    // if (/dovePay/.test(window.location.href)) {
      const wrap = document.querySelector('#my_menu')
      wrap.style.backgroundColor = 'rgb(3,78,162)'
      const container = wrap.querySelector('.menu')
      container.classList.add('uk-container', 'uk-container-xlarge')
      const ul = container.querySelector('.uk-subnav')
      ul.style.justifyContent = 'left'
      navChildLinkList.forEach(function(navChild) {
        navChild.style.fontSize = '0.5rem'
      })
    // }
  } catch(error) {
    console.error(error.stack)
  }  
}