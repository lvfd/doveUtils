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

    if (MutationObserver) {
      try {
        const mo = new MutationObserver(() => updateIframeHeight(iframe))
        mo.observe(iframe.contentDocument.body, {
          childList: true, 
          subtree: true,
          attributes: true,
        })
      } catch(e) {
        console.error('绑定DOM树监听错误', e.stack)
      }
    }
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

