export function dovePayNavHandler() {
  const navChildLinkList = document.querySelectorAll('#my_menu a[target="content_opr"]')
  if (navChildLinkList.length === 0) {
    return
  }
  const wrap = document.querySelector('#my_menu')
  const container = wrap.querySelector('.menu')
  if (!wrap || !container) {
    return
  }
  try {
    // if (/dovePay/.test(window.location.href)) {
      wrap.style.backgroundColor = 'rgb(3,78,162)'
      container.classList.add('uk-container', 'uk-container-expand')
      // const ul = container.querySelector('.uk-subnav')
      // ul.style.justifyContent = 'left'
      navChildLinkList.forEach(function(navChild) {
        navChild.style.fontSize = '0.5rem'
      })
    // }
  } catch(error) {
    console.error(error.stack)
  }  
}