import rechargeUi from './recharge'
import {
  logDefault as log,
  errorHandler,
  polyfill,
} from '../public'
import {
  adaptContentIframe,
  resizeMainContentIframe,
  hideAllNavDetails,
  loadingOverlay
} from '../dom'
import {
  loadJquery,
  importUikit,
} from '../load'
import { 
  dovePayNavHandler,
  changeRechargeStepArrow,
  changeButtonStyle,
  changeMainContentWidth,
  buildBankLogoButton,
} from '../change'

document.addEventListener('DOMContentLoaded', function() {

  /* 添加遮罩 */
  /* (关闭条件：1、iframe加载错误; 2、pageHandler执行完毕) */
  loadingOverlay('show', { transparent: false })

  /* jquery更新 */
  loadJquery()
  .then(success => log(`页面框架: ${success}`))
  .catch(error => errorHandler([error, 'console']))

  /* 加入uikit */
  importUikit()
  .then(success => log(`页面框架${success}`))
  .catch(error => errorHandler([error, 'console']))

  /* 初始化 */
  .then(() => Entry())
})

function Entry() {

   /* polyfill: */
  polyfill()

  /* 初始化导航菜单 */
  dovePayNavHandler()

  /* dialog的iframe框架自适应 */
  adaptContentIframe(document)

  /* 有iframe监听load */
  var iframe = document.getElementById('content_opr')? document.getElementById('content_opr'): null;
  if (iframe !== null) {
  
    /* 线路 1: */
    iframe.addEventListener('load', iframeHandler)

    /* 线路 2: */
    iframe.addEventListener('error', function() {
      return errorHandler('iframe加载失败', loadingOverlay.call(this, 'hide'))
    })
  }

  /* 没有iframe直接执行 */
  else {

    /* 线路 3: */
    pageHandler(document.body.id);
  }
}

function iframeHandler() {
  const target = this
  const currentHref = target.contentWindow.location.href

  /* 添加iframe遮罩 */
  /* (关闭条件：1、pageHandler执行完毕) */
  loadingOverlay('show', { transparent: false, iframe: target })

  loadJquery({root: target})
  .then(success => log(`iframe(${currentHref} ): ${success}`))
  .catch(error => errorHandler([error, 'console']))

  importUikit(target)
  .then(success => log(`iframe(${currentHref} ): ${success}`))
  .catch(error => errorHandler([error, 'console']))
  
  .then(() => {
    
    /* 初始化 iframe */
    try {
      // log('Entry')
      resizeMainContentIframe(target)
      hideAllNavDetails()
      var idocument = target.contentDocument
      idocument.addEventListener('click', hideAllNavDetails)
    } catch (error) {
      errorHandler([error.stack, 'console'])
    } 

    /* 必须启动pageHandler */
    finally {
      pageHandler(idocument.body.id, target)
    }
  
  })
}

function pageHandler(id, iframe) {
  try {

    /* both iframe and window&document*/
    /* 多页应用*/
    changeMainContentWidth(iframe)
    changeRechargeStepArrow(iframe)
    changeButtonStyle(iframe)
    buildBankLogoButton(iframe)

    /* 单页应用 */
    if (!rechargeUi[id]) return;
    rechargeUi[id].call(this, iframe);

  } catch(error) {
    errorHandler(error.stack, 'console')
  } 

  /* 必须启动loadingOverlay */
  finally {
    loadingOverlay('hide', { iframe: iframe })
    loadingOverlay('hide')
  }
}