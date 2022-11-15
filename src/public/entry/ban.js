function IEVersion() {
  // 取得浏览器的userAgent字符串
  var userAgent = navigator.userAgent;
  // 判断是否为小于IE11的浏览器
  var isLessIE11 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
  // 判断是否为IE的Edge浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isLessIE11;
  // 判断是否为IE11浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isLessIE11) {
    var IEReg = new RegExp('MSIE (\\d+\\.\\d+);');
    // 正则表达式匹配浏览器的userAgent字符串中MSIE后的数字部分，，这一步不可省略！！！
    IEReg.test(userAgent);
    // 取正则表达式中第一个小括号里匹配到的值
    var IEVersionNum = parseFloat(RegExp['$1']);
    if (IEVersionNum === 7) {
        // IE7
        return 7
    } else if (IEVersionNum === 8) {
        // IE8
        return 8
    } else if (IEVersionNum === 9) {
        // IE9
        return 9
    } else if (IEVersionNum === 10) {
        // IE10
        return 10
    } else {
        // IE版本<7
        return 6
    }
  } else if (isEdge) {
    // edge
    return 'edge'
  } else if (isIE11) {
    // IE11
    return 11
  } else {
    // 不是ie浏览器
    return -1
  }
}

if (IEVersion() === 6 || IEVersion() === 7 || IEVersion() === 8) {
  document.write('<h1 style="text-align: center">浏览器版本低，请升级至Edge, Opera, Safari, Chrome中任意最新版本后继续使用。</h1>')
  return document.execCommand("Stop")
}