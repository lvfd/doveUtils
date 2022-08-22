import errorHandler from './errorHandler'

export var setAjaxError = function(root) {
  let root = root? root: document
  if (typeof $ === 'undefined') throw new Error('错误处理方法定义失败: 未定义jQuery')
  $(root).ajaxError(function(event, xhr, settings){
    let reqUrl = settings.url;
    let reqData = settings.data;
    let res = xhr.status + xhr.statusText;
    if (console) console.error(reqUrl, reqData, res);
    errorHandler('服务器数据获取失败: 错误码: ' + xhr.status + ';<br>错误描述: ' + getStatusText(xhr.statusText));
    function getStatusText(statusStr) {
      let text = statusStr;
      if (statusStr === 'timeout') text = '请求超时';
      return text;
    }
  });
}