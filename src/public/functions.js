/* 
Usage:
  dovemgr
  dovepay 
*/

export var show = (el) => el.classList.remove('uk-invisible')
export var hide = (el) => el.classList.add('uk-invisible')
/* 动态修改行内style */
export var setInlineStyle = (selector, styles, config) => {
  try {
    let root = document
    if (config) {
      if (config.iframe) {
        root = config.iframe.contentDocument
      }
    }
    const els = root.querySelectorAll(selector)
    if (els.length < 1) return
    if (typeof styles !== 'object') throw new Error('参数格式错误')
    els.forEach((el) => {
      for (let prop in styles) {
        el.style[prop] = styles[prop]
      }
    })
  } catch(e) {
    console.error('设置行内style失败', e.stack)
  }
}
/* 动态转移body内的link标签至head */
export var transLinks = (iframe) => {
  try {
    let root = iframe? iframe.contentDocument: document
    const links = root.body.querySelectorAll('link')
    if (links.length < 1) return
    const head = root.querySelector('head')
    links.forEach((link) => head.appendChild(link))
    return links
  } catch(e) {
    console.log('转移link失败', e.stack)
  }
}
/* 数字转大写金额 */
export var digitUppercase = (n) => {
  var fraction = ['角', '分'];
  var digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
  ];
  // 不能输入负数
  if (n < 0) {
    return '不能输入负数'
  }
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
      var p = '';
      for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整');
}
/* 电话号码加密 */
export function encryptMobileNumber(number) {
  try {
    const checkResult = checkMobileNumber(number)
    if (checkResult === false) {
      throw new Error('decryptMobileNumber不能解析非法字符')
    }
    const tag = checkResult.tag
    const mobile = checkResult.mobile
    if (tag === 'chinamainland') {
      return encryptMobileNumberByRules(mobile, 3, '****', 4)
    }
    if (tag === 'hongkong' || tag === 'macau') {
      return encryptMobileNumberByRules(mobile, 2, '****', 2)
    }
    if (tag === 'taiwan') {
      return encryptMobileNumberByRules(mobile, 2, '****', 3)
    }
    return '[缺省脱敏加密方法]'
  } catch (e) {
    console.error(e.stack)
    return '[手机号码格式错误]'
  }
}
function checkMobileNumber(mobileNumber) {
  try {
    const numSrc = parseInt(mobileNumber)
    if (isNaN(numSrc)) {
      throw new Error('checkMobileNumber需要传入数字参数')
    }
    const regs = [
      ['^(86)?', '1(3\\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\\d|9[0-35-9])\\d{8}$', '中国大陆', 'chinamainland'],
      ['^(852)?', '([6|9])\\d{7}$', '香港', 'hongkong'],
      ['^(853)?', '[6]([8|6])\\d{5}$', '澳门', 'macau'],
      ['^(886)?', '[0][9]\\d{8}$', '台湾', 'taiwan'],
    ]
    let description = '其他地区'
    let tag = 'other'
    let numDist = numSrc
    for (let i = 0; i < regs.length; i++) {
      const area = regs[i]
      let reg = new RegExp(area[0] + area[1])
      let regForDist = new RegExp(area[1])
      if (!reg.test(numSrc)) {
        continue
      }
      description = area[2]
      tag = area[3]
      numDist = regForDist.exec(numSrc)[0]
      break
    }
    return {
      mobile: numDist,
      address: description,
      tag: tag,
    }
  } catch (e) {
    console.error(e.stack)
    return false
  }
}
function encryptMobileNumberByRules(mobile, headDigit, string, lastDigit) {
  const encryptString = string
  const str = mobile.toString()
  const len = str.length
  const head = str.substring(0, parseInt(headDigit))
  const last = str.substring(len - parseInt(lastDigit), len)
  return `${head}${encryptString}${last}`
}
/* 更改网页Title */
export function changeDocumentTitle(string, iconpath) {
  let url = iconpath? iconpath: 'images/favicon.ico'
  try {
    initDocumentIcon(url);
    if (!string) return;
    var head = document.querySelector('head');
    if (!head) return;
    var title = document.querySelector('title');
    if (!title) {
      title = document.createElement('title');
      head.appendChild(title);
    }
    title.innerText = string;
    return title;
  } catch(error) {
    if (console) console.error(error.stack);
    // 不处理异常
  }
  function initDocumentIcon(path) {
  if (document.querySelector('head > link[type="image/x-icon"]')) return;
  if (!path) return;
  createIconLink('shortcut icon', path);
  createIconLink('Bookmark', path);
  function createIconLink(relValue, path) {
    var head = document.querySelector('head');
    if (!head) return;
    var link = document.createElement('link');
    link.setAttribute('rel', relValue);
    link.setAttribute('href', path);
    link.setAttribute('type', 'image/x-icon');
    head.appendChild(link);
    return link;
  }
}
}