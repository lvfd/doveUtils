export default function(root) {
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
}