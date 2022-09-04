// 错误处理
import dateFormat from './dateFormat'

function format(text) {
  console.error(`%c ${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}: %c [doveError]: `,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:red; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    text)
}

export default function(error, callback) {
  
  let errMsg = error? error: '未知错误'
  if (console) {
    format(errMsg)
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

export function errHandler(error, show) {
  try {
    format(error)
    if (show) {
      UIkit.modal.alert(error);
    }
  } catch(e) {
    alert(error);
  }
}