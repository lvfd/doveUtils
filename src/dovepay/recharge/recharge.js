import { dovepay as dpublic, log_recharge as log, encryptMobileNumber } from './public'

function RechargeUi() {}

RechargeUi.getRootNode = function(iframe) {
  if (!iframe) return document;
  return iframe.contentDocument? iframe.contentDocument: document;
}

RechargeUi.init_accountName = function(node) {
  var showLength = 3;
  var specStr = '***';
  var input = node.querySelector('input#inp_accountName').value;
  try {
    var position = input.search('@');
    if ( position === -1 ) {
      throw new Error('发生错误: 用户名不是邮箱格式');
    }
  } catch (e) {
    dpublic.errHandler(e, true);
  }
  if ( position < 4 ) {
    input = input.slice(0, position) + specStr + input.slice(position);
  } else {
    input = input.slice(0, showLength) + specStr + input.slice(position);
  }
  var acc_outp = node.querySelector('span#accountName');
  acc_outp.innerText = input;
}

RechargeUi.prototype.accountsRecConfirmUi = function(iframe) {
  var root = RechargeUi.getRootNode(iframe);
  dpublic.width_resize(iframe);
  dpublic.changeDocumentTitle('德付通 - 请确认充值信息');
  dpublic.init_step(root.querySelector('#rechargeStep'), [1, 3]); // 进度条+1: total 3
  RechargeUi.init_accountName(root); // 邮箱脱敏
//  dpublic.initModalShower(root);
}

RechargeUi.prototype.accountsRechargeUi = function(iframe) {
  var root = RechargeUi.getRootNode(iframe);
  dpublic.width_resize(iframe);
  dpublic.initModalShower(root);
  init_recharge_input(root);
  
  function init_recharge_input(root) {
    dpublic.changeDocumentTitle('德付通 - 请输入充值信息');
    dpublic.init_step(root.querySelector('#rechargeStep'), [1, 3]); // 进度条+1: total 3
    handle_rechargeInput(root.querySelector('input[name=amt]'));  // 处理充值金额输入
    RechargeUi.init_accountName(root); // 邮箱脱敏
    init_tab(root.querySelectorAll('li.bankstyle>a'), root.querySelectorAll('.SelectBank'));  // 注册选项卡(充值渠道)
    init_links_cardType([{name:'储蓄卡', value: 'debit'}, {name:'信用卡', value: 'credit'}], root.querySelectorAll('.classified')); // 生成银行卡类型选项卡链接
    init_tab(root.querySelectorAll('ul.cardTypeTrigger > li > a'), root.querySelectorAll('.classified'));  // 注册选项卡(银行卡类型)
    init_bankRadio(root.querySelectorAll('.bankRadios')); // 银行list单选UI效果
    check_banklogo(root.querySelectorAll('.dove-banklogo'));  // check银行logo显示状态
    
    function handle_rechargeInput(node) {
      var input = node;
      
      // Add listeners:
      input.addEventListener('paste', forbid)
      input.addEventListener('change', checkValue)
      input.addEventListener('change', toDigitUppercase)
      input.addEventListener('keyup', toDigitUppercase)
      input.addEventListener('keyup', forbidKeys)
      input.addEventListener('input', limitLength)
      input.addEventListener('focus', setSelectAll)

      // Init input
      input.value = 0
      toDigitUppercaseHandler(input.value)
      input.setAttribute('min', 0)

      function forbid(e) {
        e.preventDefault();
        alert('不允许此操作')
        return false;
      }
      function forbidKeys(event) {
        const keycode = event.keyCode
        // log(keycode)
        /* left& right */
        if (keycode === 37 || keycode === 39 ) {
          this.select()
        }
        /* +- */
        if (keycode === 109 || keycode === 189 || keycode === 107 || keycode === 187) {
          let val = this.value
          // this.value = val.substring(val.length - 1, val.length)
          event.preventDefault()
          // this.value = val.replace(/[^\0-9\.]/g,'')
        }
      }
      function toDigitUppercase(e){
        toDigitUppercaseHandler(this.value);
      }
      function toDigitUppercaseHandler(num) {
        var uppercaseSpan = root.getElementById('uppercase');
        var str = dpublic.digitUppercase(num);
        uppercaseSpan.innerText = str;
        uppercaseSpan.classList.add('orange01');
      }
      function limitLength(e) {
        var length = this.getAttribute('maxlength')? this.getAttribute('maxlength'): 9;
        if (this.value.length > length) {
          this.value = this.value.slice(0, length);
        };
      }
      function setSelectAll(e) {
        this.select()
      }
      function checkValue(e) {
        let value = this.value
        if (value === null || value === undefined || value < 0) {
          this.value = 0
        }
      }
    }

    function init_links_cardType(array, contents) {
      if (!contents.length) return;
      var ul = root.querySelector('.cardTypeTrigger');
      ul.innerHTML = '';
      for (var i = 0; i < array.length; i++) {
        var cardType = array[i].value;
        var cardName = array[i].name;
        for (var j = 0; j < contents.length; j++) {
          if (contents[j].classList.contains(cardType)) {
            var li = document.createElement('li');
            li.innerHTML = '<a href="#" data-value="' + cardType + '">' + cardName + '</a>';
            ul.appendChild(li);
            break;
          }
        }
      }
    }

    function init_tab(links, contents, config) {
      var link = links;
      if (!link || link.length < 1) return;
      for (var i = 0; i < link.length; i++) {
        link[i].addEventListener('click', changeTab.call(this, links, contents, config));
      }
      if (link.length > 0) {
        link[0].click();
      }
      function changeTab(links, contents, config) {
        return function(e) {
          e.preventDefault();
          try {
            var radio = this.parentElement.querySelector('input[type="radio"]');
            if(radio) radio.click();
            var activedColor = config && config.color ? config.color: 'rgb(250,166,26)';
            removeOthersStyle(links);
            this.style.color = activedColor;
            var value = this.getAttribute('data-value');
            if (!contents || contents.length < 1) {
              throw new Error('参数非法');
              return;
            }
            hideAllTab(contents);
            var parent = contents[0].parentElement;
            var pointer_bankInput = parent.querySelector('#bankInput_' + value.split("_")[1]);
            var content = pointer_bankInput? pointer_bankInput: parent.querySelectorAll('.' + value);
            showPointedTab(parent, content);
          } catch(e) {
            dpublic.errHandler(e);
          }
          function removeOthersStyle(links) {
            for (var i = 0; i < links.length; i++) {
              links[i].style.color = 'initial';
            }
          }
          function hideAllTab(tabs) {
            var ols = tabs;
            for (var i = 0; i < ols.length; i++) {
              ols[i].classList.remove('uk-animation-fade');
              ols[i].setAttribute('hidden', '');
              ols[i].style.display = 'none';
            }
          }
          function showPointedTab(parent, content) {
            if (content.length) {
              for (var i = 0; i < content.length; i++) {
                show(content[i]);
              }
            } else if (content.length === 0) {
              return;
            } else {
              show(content);
            }
            function show(node) {
              node.removeAttribute('hidden');
              node.style.display = '';
              node.classList.add('uk-animation-fade');
            }
          }
        }
      }
    }
    
    function init_bankRadio(node) {
      var div = node;
      for (var i = 0; i < div.length; i++) {
        var button = div[i].querySelector('button');
        var radio = div[i].querySelector('input[type=radio]');
        button.addEventListener('click', clickHandler);
        radio.addEventListener('change', changeStyle);
      }
      function clickHandler(e) {
        e.preventDefault();
        this.parentElement.querySelector('input[type=radio]').click();
      }
      function changeStyle(e) {
        for (var j = 0; j < div.length; j++) {
          div[j].querySelector('button').classList.remove('activateButton');
        }
        if (this.checked) {
          var thisButton = this.parentElement.querySelector('button');
          thisButton.classList.add('activateButton');
        }
      }
    }

    function check_banklogo(nodelist) {
      if (!nodelist.length) return;
      for (var i = 0; i < nodelist.length; i++) {
        var logo = nodelist[i];
        logo.setAttribute('data-content', '银行和机构logo');
        var haveSVG = getComputedStyle(logo).getPropertyValue('background-image');
        if (!haveSVG || haveSVG === 'none') {
          logo.setAttribute('data-content', '');
          var span = document.createElement('span');
          span.innerText = logo.getAttribute('title')? logo.getAttribute('title'): '银行图标待更新';
          span.style.color = '#666';
          logo.innerHTML = '';
          logo.appendChild(span);
        }
      }
    }
    
  }
  
};

RechargeUi.prototype.addFastCardUi = function(iframe) {
  var root = RechargeUi.getRootNode(iframe);
  dpublic.width_resize(iframe);
  dpublic.changeDocumentTitle('德付通 - 添加银行卡');
  dpublic.initModalShower(root);
  
  var holderCardType_value = '01';  // 身份证
  
  var btn_callmodal = root.querySelector('#nextStep_CallSMS');
  var callsms_modal = document.querySelector('#getCode_addFastCard');
  var btn_callsms_modal = callsms_modal.querySelector('.action_callSendsms');
  
  btn_callsms_modal.addEventListener('click', getSMSCode);
  btn_callmodal.addEventListener('click', getSMSCode);
  
  var btn_toAddCard = callsms_modal.querySelector('.action-toAddCard');
  btn_toAddCard.addEventListener('click', checkSmsCode(toAddCard));
  
  function getSMSCode(e) {
    e.preventDefault();
    var trigger = this;
    return checkAllInput(trigger, fetchData(callSmsModal));
  }
  function checkAllInput(trigger, callback) {
    var trigger = trigger;
    var inputlist = root.querySelectorAll('input[type="text"][needCheck]');
    var checkboxlist = root.querySelectorAll('input[type="checkbox"][needCheck]');
    var mobile = root.querySelector('#holderPhone');
    for (var i = 0; i < inputlist.length; i++) {
      inputlist[i].focus();
      inputlist[i].blur();
    }
    var errlist = root.querySelectorAll('.uk-label-danger[needCheck]');
    for (var i = 0; i < errlist.length; i++) {
      if (errlist[i].innerText) return;
    }
    var data = {
        trigger: trigger,
        mobileNode: mobile,
    };
    for (var i = 0; i < inputlist.length; i++) {
      inputlist[i].setAttribute('disabled', 'disabled');
    }
    for (var i = 0; i < checkboxlist.length; i++) {
      checkboxlist[i].setAttribute('disabled', 'disabled');
    }
    callback.call(this, data);
  }
  function fetchData(callback) {
    return function (data) {
      var modal = document.getElementById('getCode_addFastCard');
      data.modal = modal;
      var mobile = modal.querySelector('.mobile');
      if (data.trigger === btn_callmodal) {
        UIkit.modal(modal).show();
        mobile.innerText = encryptMobileNumber(data.mobileNode.value);
        var btn = document.querySelector('.action_callSendsms');
        btn.click();
        return;
      }
      $.ajax({
        type : 'POST',
        contentType : 'application/x-www-form-urlencoded;charset=utf-8',
        url: "./protected/accountAction.do",
        data : {
          m : 'sendCode',
          holderID : root.querySelector("#holderID").value,
          cardNo : root.querySelector("#cardNo").value,
          cardHolder : root.querySelector("#cardHolder").value,
          holderPhone : root.querySelector("#holderPhone").value,
          holderCardType : holderCardType_value,
          bankstyle: root.querySelector("#bankstyle").value,
        },
        dataType : 'json',
        cache : false,
        traditional : true,
        success : callback.call(this, data),
      });
    };
  }
  function callSmsModal(data) {
    return function(res) {
      var modal = data.modal;
      if (!res) {
        UIkit.modal.alert('远程请求短信验证码无返回');
      };
      if(res.code == '1'){
        root.querySelector("#smskey").value = res.smskey;
       
        var codeInput = modal.querySelector('input[name="smsCode"]');
        var regetBtn = modal.querySelector('.action_callSendsms');
        
        codeInput.focus();
        dpublic.init_btn_countdown({
          text: '点击获取验证码',
          textDisable: '重新获取',
          button: regetBtn,
          count: 10,
        });
      } else {
        UIkit.modal(modal).hide();
        UIkit.modal.alert('持卡人信息验证失败');
      }
    }
  }
  function checkSmsCode(callback) {
    return function(e) {
      e.preventDefault();
      var modal = document.getElementById('getCode_addFastCard');
      var smsInput = modal.querySelector('input[name="smsCode"');
      var val = smsInput.value;
      if (!val) {
        UIkit.modal.alert("验证码不能为空").then(function(){
          return;
        });
      }
      var result = null;
      $.ajax({
        type : 'POST',
        url : "./protected/accountAction.do",
        data : {
          m : 'validSmsCode',
          smsCode : val
        },
        dataType : 'json',
        async : false,//设成同步
        cache : false,
        traditional : true,
        success : function(res) {
          result = res;
        }
      });
      if(!result){
        UIkit.modal.alert("远程数据获取失败").then(function(){
          smsInput.focus();
        });
        return;
      }
      if(result == '1'){
        UIkit.modal.alert("验证码已失效").then(function(){
          smsInput.focus();
        });
        return;
      }
      if(result == '2'){
        UIkit.modal.alert("输入的验证码不正确").then(function(){
          smsInput.focus();
        });
        return;
      }
      callback.call();
    }
  }
  function toAddCard() {
    $.ajax({
      type : 'POST',
      contentType : 'application/x-www-form-urlencoded;charset=utf-8',
      url : "./protected/accountAction.do",
      data : {
        m : 'realNameAuthen',
        holderID : root.querySelector("#holderID").value,
        cardNo : root.querySelector("#cardNo").value,
        cardHolder : root.querySelector("#cardHolder").value,
        holderPhone : root.querySelector("#holderPhone").value,
        holderCardType : holderCardType_value,  // 身份证
        smsCode : document.querySelector('input[name="smsCode"]').value,
        fastCardDate : '',
        bankstyle: root.querySelector("#bankstyle").value,
        smskey: root.querySelector("#smskey").value,
      },
      dataType : 'text',
      cache : false,
      traditional : true,
      success : function(data) {
        if(data == '1'){
          UIkit.modal.alert('添加银行卡成功。').then(function(){
            window.location.href="accountAction.do?m=managerFastCard";
          });
        } else {
          UIkit.modal.alert("添加银行卡失败。");
        }
      },
      error: function () {
        UIkit.modal.alert("远程请求异常");
      }
    });
  }
};


var rechargeUi = new RechargeUi();

export default rechargeUi