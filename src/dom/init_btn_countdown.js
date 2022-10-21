export default function(config) {
  config.button.setAttribute('disabled', 'disabled');
  config.button.classList.remove('uk-button-secondary');
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
    config.button.classList.add('uk-button-secondary');
    config.button.querySelector('.count').innerText = '';
    config.button.querySelector('.text').innerText = config.text;
    showingCount = count;
    clearTimeout(tik);
  }
}