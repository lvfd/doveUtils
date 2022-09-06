export default function() {
  const nav = document.querySelector('.uk-subnav')
  if (!nav) return
  var nodelist = nav.querySelectorAll('div');
  if (nodelist.length === 0) return;
  for (var i = 0; i < nodelist.length; i++) {
    UIkit.dropdown(nodelist[i]).hide(false);
  }
}