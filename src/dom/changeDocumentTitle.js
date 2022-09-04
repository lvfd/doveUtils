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

export default function(string, iconpath) {
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
}