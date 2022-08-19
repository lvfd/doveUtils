import { dovepay as dpublic } from './public'
import rechargeUi from './recharge'

Entry();
function Entry() {
//  dpublic.importUikit();
  dpublic.adaptContentIframe(document);
  var iframe = document.getElementById('content_opr')? document.getElementById('content_opr'): null;
  if (iframe !== null) {
    iframe.onload = function() {
//      dpublic.importUikit(iframe);
      dpublic.resizeMainContentIframe(this);
      dpublic.hideAllNavDetails();
      var idocument = this.contentDocument;
      idocument.addEventListener('click', dpublic.hideAllNavDetails);
      pageHandler(idocument.body.id, this);
    };
  } else {
    pageHandler(document.body.id);
  }
  
  function pageHandler(id, iframe) {
    try {
//      dpublic.importPolyfill(iframe);
      if (!rechargeUi[id]) return;
      rechargeUi[id].call(this, iframe);
    } catch(e) {
      dpublic.errHandler(e, true);
    }
  }
}