import getVendor from '@dove-pay/vendor'
import {transLinks} from '@dove/functions'
import {hideDropdown, display, setIframeHeight as updateIframeHeight,
  filter, catalog} from '@dove-pay/functions'
import checkExpiredInfo from '@dove-pay/page/checkExpiredInfo'
import buildBankLogoButton from '@dove-pay/buildBankLogoButton'
import rechargeUi from '@dove-pay/recharge'

export default function(iframe) {
  try {
    /* 绑定点击事件 */
    iframe.contentDocument.addEventListener('click', () => hideDropdown())
    /* iframeDOM变动自动调整iframe高度 */
    if (typeof MutationObserver === 'function') {
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
    /* 不处理用户系统 */
    const href = iframe.contentWindow.location.href
    if (/dovepayUserWebMgrAction/.test(href)) {
      console.log('用户系统')
      display(iframe)
      return
    }
    /* 转移body下的link */
    transLinks(iframe)
    /* 过滤器 */
    let idArr = []
    catalog.forEach((page) => {
      idArr.push(page.id)
    })
    if (filter(iframe, idArr)) {
      iframe.style.width = '100%'
    }
    else {
      iframe.style.width = '980px'
      updateIframeHeight(iframe)
      return display(iframe)
    }
    /* continue: */
    getVendor(iframe)
    .then(() => iframeHandler(iframe))
    .catch(e => console.error(e))
    .finally(() => display(iframe))

  } catch(e) {
    console.error('处理iframe.contentDocument失败', e.stack)
    return display(iframe)   
  }
}

function iframeHandler(iframe) {
  try {
    /* 主页提示过期更新 */
    if (/rightByUserWeb\.jsp/.test(iframe.contentWindow.location.href)) {
      checkExpiredInfo()
    }
    /* 充值UI */
    rechargeExec(iframe)
    /* 重设高度 */
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
    if (iframe.contentDocument.body) {
      const id = iframe.contentDocument.body.id
      if (!rechargeUi[id]) return
      rechargeUi[id].call(this, iframe)
    }
  } catch(e) {
    console.error('充值UI界面处理错误', e.stack)
  }
}