import { dovepay as dpublic, log } from './public'
import rechargeUi from './recharge'

const importUikit = dpublic.importUikit

document.addEventListener('DOMContentLoaded', function(event) {
  log('------PROCESS START------')
  importUikit()
  .then((res) => {
    log(res)
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
  importUikit(this)
  .then((res) => {
    log(res)
    dpublic.resizeMainContentIframe(this)
    dpublic.hideAllNavDetails()
    var idocument = this.contentDocument
    idocument.addEventListener('click', dpublic.hideAllNavDetails)
    pageHandler(idocument.body.id, this)
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