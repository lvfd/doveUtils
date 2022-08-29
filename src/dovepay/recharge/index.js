import { dovepay as dpublic, log, loadJquery } from './public'
import rechargeUi from './recharge'

const importUikit = dpublic.importUikit

document.addEventListener('DOMContentLoaded', function(event) {
  // log('DOM节点全部加载完毕')
  // 
  loadJquery()
  .then((res) => {
    log(`页面框架: ${res}`)
    return importUikit()
  })
  .then((res) => {
    log(`页面框架: ${res}`)
    Entry()
  })
})

function Entry() {
  dpublic.adaptContentIframe(document);
  var iframe = document.getElementById('content_opr')? document.getElementById('content_opr'): null;
  if (iframe !== null) {
    iframe.addEventListener('load', iframeHandler)
  } else {
    pageHandler(document.body.id);
  }
}

function iframeHandler(event) {
  const target = this
  const currentHref = target.contentWindow.location.href
  log(`加载访问${currentHref} 的iframe已经完成`)
  loadJquery({root: target})
  .then((res) => {
    log(`iframe(url=${currentHref} ): ${res}`)
    return importUikit(target)
  })
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
  try {
    if (!rechargeUi[id]) return;
    rechargeUi[id].call(this, iframe);
  } catch(e) {
    dpublic.errHandler(e, true);
  }
}