// 错误处理
import dateFormat from './dateFormat'

function format(text) {
  console.error(`%c ${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}: %c [doveError]: `,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:red; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    text)
}

export default function(error, callback) {
  let errMsg = Array.isArray(error)? error[0]: error
  format(errMsg)
  if (Array.isArray(error) && error[1] === 'console') {
    return
  }
  try {
    return UIkit.modal.alert(errMsg)
    .then(callback)
    .catch(error => format(error))
  } catch (e) {
    return alert(errMsg)
  }
}

export function errHandler(error, show) {
  format(error)
  try {
    if (show) {
      return UIkit.modal.alert(error);
    }
  } catch(e) {
    return alert(error);
  }
}