import rechargeUi from './recharge'
import {
  logDefault,
  polyfill,
  adaptContentIframe,
  resizeMainContentIframe,
  hideAllNavDetails,
  errHandler,
} from '../public'
import {
  loadJquery,
  importUikit,
} from '../load'
import { 
  changeRechargeStepArrow,
  changeButtonStyle,
  changeMainContentWidth,
  buildBankLogoButton,
} from '../change'

document.addEventListener('DOMContentLoaded', function() {
  // log('DOM节点全部加载完毕')
  // 
  loadJquery()
  .then((res) => {
    log(`页面框架: ${res}`)  
  })

  importUikit()
  .then((res) => {
    log(`页面框架: ${res}`)
    Entry()
  })
})

function Entry() {
  /* 初始化导航菜单 */
  dovePayNavHandler()

  /* dialog的iframe框架自适应 */
  adaptContentIframe(document)

  /* 监听iframe */
  var iframe = document.getElementById('content_opr')? document.getElementById('content_opr'): null;
  if (iframe !== null) {
    iframe.addEventListener('load', iframeHandler)
  } else {
    pageHandler(document.body.id);
  }
}

function iframeHandler() {
  
  /* polyfill: */
  polyfill()

  const target = this
  const currentHref = target.contentWindow.location.href
  // log(`加载访问${currentHref} 的iframe已经完成`)
  loadJquery({root: target})
  .then((res) => {
    log(`iframe(url=${currentHref} ): ${res}`)
  })
  importUikit(target)
  .then((res) => {
    log(`iframe(url=${currentHref} ): ${res}`)
    resizeMainContentIframe(target)
    hideAllNavDetails()
    var idocument = target.contentDocument
    idocument.addEventListener('click', hideAllNavDetails)
    pageHandler(idocument.body.id, target)
  })
}

function pageHandler(id, iframe) {
  /* 多页应用*/
  try {
    changeMainContentWidth(iframe)
    changeRechargeStepArrow(iframe)
    changeButtonStyle(iframe)
    buildBankLogoButton(iframe)
  } catch(error) {
    console.error('[Multiple Page Style Error]', error.stack)
  }
  /* 单页应用 */
  try {
    if (!rechargeUi[id]) return;
    rechargeUi[id].call(this, iframe);
  } catch(e) {
    errHandler(e, true);
  }
}

function dovePayNavHandler() {
  const navChildLinkList = document.querySelectorAll('#my_menu a[target="content_opr"]')
  if (navChildLinkList.length === 0) {
    return
  }
  try {
    navChildLinkList.forEach(function(navChild) {
      navChild.style.fontSize = '0.5rem'
    })
  } catch(error) {
    console.error(error.stack)
  }  
}