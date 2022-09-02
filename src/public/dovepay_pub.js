import common from './common'
import errorHandler from './errorHandler'
import log from './logger'
import {
  getHeight_iframe_adaptiveContent as getContentHeight,
  getHeight_mainContent_minHeight as getContentMinHeight,
} from './adaptiveHandler'

function DovePayPublic() {}

DovePayPublic.faviconUrl = 'images/favicon.ico';

DovePayPublic.prototype.adaptContentIframe = function(root) {
  var iframes = root.querySelectorAll('iframe[dp-adaptcontent]');
  for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    iframe.onload = resize;
  }
  function resize() {
    try {
      var wrap = this.parentElement;
      if (wrap.tagName.toLowerCase() === 'div') {
        wrap.style.overflow = 'auto';
        wrap.style.width = '100%';
      };
      var wrapPadding = parseInt(getComputedStyle(this).getPropertyValue('padding-top')) +
                        parseInt(getComputedStyle(this).getPropertyValue('padding-bottom'));
      this.style.width = 'inherit'
      const contentHeight = this.contentDocument.body.offsetHeight
      let finalHeight = parseInt(contentHeight + wrapPadding)
      const footDialog = this.contentDocument.querySelector('.foot.dialog')
      if (footDialog) {
        finalHeight += parseInt(window.getComputedStyle(footDialog).getPropertyValue('margin-bottom'))
      }
      this.style.height = finalHeight + 'px'
    } catch (e) {
      if (console) console.error(e);
      return;
    }
  }
};

DovePayPublic.prototype.changeDocumentTitle = function(string) {
  try {
    DovePayPublic.initDocumentIcon(DovePayPublic.faviconUrl);
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
};

DovePayPublic.prototype.errHandler = function(error, show, config) {
  try {
    console.error("ERROR!!: " + error.stack);
    if (show) {
      UIkit.modal.alert(error);
    }
  } catch(e) {
    alert(error);
  }
};

DovePayPublic.prototype.digitUppercase = function(n) {
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
  for (var i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
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
};

DovePayPublic.prototype.hideAllNavDetails = function() {
  var nodelist = document.querySelector('.uk-subnav').querySelectorAll('div');
  if (!nodelist) return;
  for (var i = 0; i < nodelist.length; i++) {
    UIkit.dropdown(nodelist[i]).hide(false);
  }
};

DovePayPublic.prototype.resizeMainContentIframe = function(iframe, config) {
  const subNavNode = document.querySelector('#mainContent .uk-subnav')
  const subNavMarginBottom = window.getComputedStyle(subNavNode).getPropertyValue('margin-bottom')
  const height = getContentHeight(iframe, {type: 'body'})
  const minHeight = getContentMinHeight([
    document.querySelector('.gblMHeader'),
    document.querySelector('#gblMarketingFooter'),
    document.querySelector('#my_menu')
  ]) - parseInt(subNavMarginBottom)
  // log(`[iframe框架高度初始化] height: ${height}, minHeight: ${minHeight}`)
  iframe.height = Math.max(height, minHeight);
}

DovePayPublic.prototype.init_btn_countdown = function(config) {
  config.button.setAttribute('disabled', 'disabled');
  config.button.classList.remove('dove-yellow');
  var count = parseInt(config.count)*1000;   //控制发送按钮时间
  var showingCount = count;//显示倒计时数字
  var tik = setInterval(time, 1000);
  config.button.querySelector('.text').innerText = '秒后' + config.textDisable;
  config.button.querySelector('.count').innerText = config.count;
  setTimeout(reset, count);
  function time() {
    showingCount = showingCount - 1000; 
    config.button.querySelector('.count').innerText = showingCount/1000;
  }
  function reset() {
    config.button.removeAttribute('disabled');
    config.button.classList.add('dove-yellow');
    config.button.querySelector('.count').innerText = '';
    config.button.querySelector('.text').innerText = config.text;
    showingCount = count;
    clearTimeout(tik);
  }
};

DovePayPublic.prototype.init_step = function(progress, configArray) {
  if (!progress) return;
  var value = progress.value? progress.value: 0;
  var addvalue = configArray[0];
  var max = configArray[1]? configArray[1]: progress.max;
  var time = time? time: 1000;
  progress.max = max;
  progress.value = value + addvalue;
};

DovePayPublic.prototype.importUikit = function(iframe) {  // rewrite
  const root = iframe? iframe.contentDocument: document
  const base = `${common.getNodeBase()}/doveuikit/dist`
  const baseJava = `${common.getNodeBase('java')}/dovePay`  /* deprec. */
  const basePlugin = `${common.getNodeBase()}/doveuikit/plugin`
  const cssName = ['uikit.dove-theme', 'uikit.custom']
  const jsName = ['uikit', 'uikit-icons']
  const suffix = common.getNodeSuffix()
  const promise = common.loadfile('css', {
    url: `${base}/css/${cssName[0]}${suffix}css`,
    root: root,
  })
  .then((res) => {
    log(res)
    const rootWindow = iframe? iframe.contentWindow: window
    if (/\.dovepay\.com\/dovePay/.test(rootWindow.location.href)) {
      return common.loadfile('css', {
        url: `${base}/css/${cssName[1]}.css`,
        root: root
      })
    }
    else {
      return new Promise((resolve) => {
        resolve(`不需要加载${cssName[1]}.css`)
      })
    }
  })
  .then((res) => {
    log(res)
    return common.loadfile('js', {
      url: `${base}/js/${jsName[0]}${suffix}js`,
      root: root,
    })
  })
  .then((res) => {
    log(res)
    return common.loadfile('js', {
      url: `${base}/js/${jsName[1]}${suffix}js`,
      root: root,
    })
  })
  return promise
};

DovePayPublic.prototype.initModalShower = function(root) {
  var nodelist = root.querySelectorAll('*[data-showmodal]');
  if (nodelist.length < 1) return;
  for (var i = 0; i < nodelist.length; i++) {
    var node = nodelist[i];
    node.addEventListener('click', function(e) {
      var showid = this.getAttribute('data-showmodal');
      e.preventDefault();
      UIkit.modal(document.getElementById(showid)).show();
    });
  }
};

DovePayPublic.prototype.width_resize = function(iframe){
  if (!iframe) return 'no';
  try {
    const rootDoc = iframe.contentDocument
    if (rootDoc.querySelector('.uk-container')) {
      return 'no'
    }
    iframe.parentElement.style.width = '100%';
    let wrap
    const rightContent = rootDoc.querySelector('body > #rightContent')
    const wrapTableList = rootDoc.querySelectorAll('table[width="810"], table[width="988"]')
    const allDiv = rootDoc.querySelectorAll('div')
    const wrapDiv_BOP = rootDoc.querySelector('div[style*=height][style*=overflow-y][style*=overflow-x][style*=auto][style*=hidden]')
    
    /* 去除所有具有固定宽度的div宽度 */
    if (allDiv.length > 0) {
      for (let i = 0; i < allDiv.length; i++) {
        const div = allDiv[i]
        const divWidth = window.getComputedStyle(div).getPropertyValue('width')
        if (parseInt(divWidth) === 988 || parseInt(divWidth) === 810) {
          div.style.width = '100%'
        }
      }
    }

    /* 处理前台BOP页面 */
    if (wrapDiv_BOP) {
      wrapDiv_BOP.removeAttribute('style')
      wrapDiv_BOP.classList.add('uk-container')
    }

    /* 具有id=rightContent的div直接处理*/
    if (rightContent) {
      wrap = rightContent
      wrap.classList.add('uk-container')
    }

    /* 去除所有具有固定宽度的table宽度并处理 */
    if (wrapTableList.length > 0) {
      for (let i = 0; i < wrapTableList.length; i++) {
        wrapTableList[i].removeAttribute('width')
        wrapTableList[i].style.width = '100%'
      }
      wrap = document.createElement('div')
      wrap.classList.add('uk-container')
      const wrapTable = wrapTableList[0]
      wrapTable.parentNode.insertBefore(wrap, wrapTable)
      wrap.appendChild(wrapTable)
    }

    /* 检查经过以上处理后.uk-container的兄弟Table元素 */
    if (rootDoc.querySelector('.uk-container')) {
      const parentNode = rootDoc.querySelector('.uk-container').parentNode
      if (parentNode && parentNode.hasChildNodes()) {
        const childNodeList = parentNode.childNodes
        for (let i = 0; i < childNodeList.length; i++) {
          const childNode = childNodeList[i]
          if (/table/i.test(childNode.tagName)){
            childNode.removeAttribute('width')
            childNode.classList.add('uk-container')
          }
        }
      }
    }

    /* 如果不是以上所有情况： */
    if (!rootDoc.querySelector('.uk-container')) {
      const body = rootDoc.body
      body.classList.add('uk-container')
    }

    /* 输出结果*/
    const result = rootDoc.querySelector('.uk-container')? 'success': 'no'
    return result
  } catch(error) {
    throw new Error(error)
  }
};

DovePayPublic.initDocumentIcon = function(path) {
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
};

DovePayPublic.getScript = function(address, base) {
  var basePath = base? base: '';
  var tag = document.createElement('script');
  tag.setAttribute('src', basePath + address);
  tag.setAttribute('async', 'false');
  return tag;
};

DovePayPublic.getStyle = function(address, base) {
  var basePath = base? base: '';
  var tag = document.createElement('link');
  tag.setAttribute('rel', 'stylesheet');
  tag.setAttribute('type', 'text/css');
  tag.setAttribute('href', basePath + address);
  return tag;
};

var dpublic = new DovePayPublic();

// Output Module:
export default dpublic;
