import { dovepay as dpublic, log, loadJquery, polyfill } from './public'
import rechargeUi from './recharge'
import { 
  changeRechargeStepArrow,
  changeButtonStyle,
  changeMainContentWidth,
} from './changeDom'

const importUikit = dpublic.importUikit

document.addEventListener('DOMContentLoaded', function(event) {
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
  dpublic.adaptContentIframe(document)

  /* 监听iframe */
  var iframe = document.getElementById('content_opr')? document.getElementById('content_opr'): null;
  if (iframe !== null) {
    iframe.addEventListener('load', iframeHandler)
  } else {
    pageHandler(document.body.id);
  }
}

function iframeHandler(event) {
  
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
    dpublic.resizeMainContentIframe(target)
    dpublic.hideAllNavDetails()
    var idocument = target.contentDocument
    idocument.addEventListener('click', dpublic.hideAllNavDetails)
    pageHandler(idocument.body.id, target)
  })
}

function pageHandler(id, iframe) {
  /* 多页应用*/
  try {
    changeMainContentWidth(iframe)
    changeRechargeStepArrow(iframe)
    changeButtonStyle(iframe)
  } catch(error) {
    console.error('[Multiple Page Style Error]', error.stack)
  }
  /* 单页应用 */
  try {
    if (!rechargeUi[id]) return;
    rechargeUi[id].call(this, iframe);
  } catch(e) {
    dpublic.errHandler(e, true);
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