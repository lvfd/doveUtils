export default (iframe) => {
  try {
    const rd = iframe? iframe.contentDocument: document
    rd.querySelectorAll('.uk-container').forEach((el) => {
      el.classList.add('uk-container-center')
    })
    rd.querySelectorAll('.uk-flex-between').forEach((el) => {
      el.classList.add('uk-flex-space-between')
    })
    rd.querySelectorAll('.uk-flex-around').forEach((el) => {
      el.classList.add('uk-flex-space-around')
    })
    rd.querySelectorAll('.uk-container-expand').forEach((el) => {
      el.classList.add('uk-width-1-1')
    })
    rd.querySelectorAll('[uk-navbar]').forEach((el) => el.classList.add('uk-navbar'))
    rd.querySelectorAll('.uk-navbar-dropdown').forEach((el) => {
      el.classList.add('uk-dropdown')
      el.parentNode.setAttribute('data-uk-dropdown', '{mode:"click"}')
    })
    rd.querySelectorAll('[uk-dropdown*="click"]').forEach((el) => {
      el.classList.add('uk-dropdown')
      el.removeAttribute('uk-dropdown')
      el.parentNode.setAttribute('data-uk-dropdown', '{mode:"click"}')
    })
    rd.querySelectorAll('[uk-modal]').forEach((el) => {
      el.classList.add('uk-modal')
    })
    rd.querySelectorAll('[uk-offcanvas]').forEach(div => div.classList.add('uk-offcanvas'))
  } catch(e) {
    console.error(e, e.stack)
  }
}