import mainHandler from './main'
import { setIframeHeight } from './main'

window.addEventListener('DOMContentLoaded', mainHandler)
window.addEventListener('resize', setIframeHeight)