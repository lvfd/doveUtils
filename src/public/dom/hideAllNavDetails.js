export default function() {
  var nodelist = document.querySelector('.uk-subnav').querySelectorAll('div');
  if (!nodelist) return;
  for (var i = 0; i < nodelist.length; i++) {
    UIkit.dropdown(nodelist[i]).hide(false);
  }
}