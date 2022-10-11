export var hideDropdown = () => {
  try {
    hide(document.querySelector('.uk-subnav'))
  } catch(e) {
    console.error('隐藏下拉菜单失败', e.stack)    
  }
  function hide(nav) {
    if (!nav) return
    const nodelist = nav.querySelectorAll('div[class*="dropdown"]');
    if (nodelist.length === 0) return;
    for (var i = 0; i < nodelist.length; i++) {
      UIkit.dropdown(nodelist[i]).hide(false);
    }
  }
}