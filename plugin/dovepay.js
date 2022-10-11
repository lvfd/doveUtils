//锁屏脚本
function lockCloseEvent(flag) {
    if (flag == 1) {//付款成功
        document.getElementById('content_opr').src = document.getElementById('succUrl').value;
    } else {
        document.getElementById('content_opr').src = document.getElementById('failUrl').value;
    }
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none'
}