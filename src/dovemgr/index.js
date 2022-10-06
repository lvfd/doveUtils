import { polyfill } from '../public'
import mainHandler from './main'
import { setIframeHeight } from './main'

polyfill()

window.addEventListener('DOMContentLoaded', mainHandler)
window.addEventListener('resize', setIframeHeight)