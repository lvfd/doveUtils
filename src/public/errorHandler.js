// 错误处理
export default function(error, callback) {
  
  let errMsg = error? error: '未知错误'
  if (console) {
    console.error('[doveErrorLog]', errMsg)
  }
  if (typeof UIkit !== 'undefined') {
    try {
      UIkit.modal.alert(errMsg).then(callback)
    } catch (e) {
      alert(errMsg)
    }
  } else {
    alert(errMsg)
  }

}