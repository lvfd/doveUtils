import BrowserDetector from 'browser-dtector'
import convert from '@dove/convert'

export default () => {
  const browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent()
  if (!browser.isIE) return
  convert()
  transOffcanvas()
  transContainer()
  removeSticky()
  style()
}

function removeSticky() {
  try {
    document.querySelectorAll('.uk-position-sticky').forEach(el => el.classList.remove('uk-position-sticky'))
    document.querySelectorAll('.uk-position-top').forEach(el => el.classList.remove('uk-position-top'))
  } catch(e) {
    console.error(e, e.stack)
  }
}

function transContainer() {
  try {
    document.querySelectorAll('.uk-container').forEach(el => el.style.maxWidth = '100%') 
  } catch(e) {
    console.error(e, e.stack)
  }
}

function transOffcanvas() {
  try {
    const btn = document.querySelector('button.toMenu[uk-toggle]')
    btn.setAttribute('data-uk-offcanvas', '{target:"#menu"}')
    document.querySelector('.uk-offcanvas-close').style.display = 'none'
    document.querySelectorAll('.uk-nav-divider').forEach(el => el.classList.remove('uk-nav-divider'))
    document.querySelectorAll('.uk-accordion-title').forEach(el => el.classList.remove('uk-accordion-title'))
  } catch(e) {
    console.error(e, e.stack)
  }
}

function style() {
  document.querySelector('#header').classList.add('uk-block-muted')
  document.querySelector('#footer').classList.add('uk-width-expand')
}