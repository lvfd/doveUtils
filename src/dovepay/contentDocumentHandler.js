import {display} from './main'
import {setIframeHeight as updateIframeHeight} from './main'
import checkExpiredInfo from './page/checkExpiredInfo'
import router from './router'
import rechargeUi from './recharge'
import {buildBankLogoButton} from '../change'

export default function(iframe) {
  try {

    if (new RegExp(router.index).test(iframe.contentWindow.location.href)) {
      checkExpiredInfo()
    }
    
    rechargeExec(iframe)

    window.setTimeout(() => updateIframeHeight(iframe), 100)

  } catch(e) {
    console.error('处理iframe页面出错', e.stack)
  } finally {
    display(iframe)
  }
}

function rechargeExec(iframe) {
  try {
    buildBankLogoButton(iframe)
    if (iframe.contentDocument.body.id) {
      const id = iframe.contentDocument.body.id
      if (!rechargeUi[id]) return
      rechargeUi[id].call(this, iframe)
    }
  } catch(e) {
    console.error('充值UI界面处理错误', e.stack)
  }
}

