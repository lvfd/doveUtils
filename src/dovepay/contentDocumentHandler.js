import {display} from './contentDocument'
import {setIframeHeight as updateIframeHeight} from './main'


export default function(iframe) {
  try {
     /* 更新iframe高度 */
    updateIframeHeight(iframe)
    
    // const mo = new MutationObserver((mutations) => {console.log(mutations)})
    // mo.observe(iframe.contentDocument.body, {
    //   childList: true, 
    //   subtree: true
    // })
    console.log('处理iframe页面')
  } catch(e) {
    console.error('处理iframe页面出错', e.stack)
  } finally {
    display(iframe)
  }
}

