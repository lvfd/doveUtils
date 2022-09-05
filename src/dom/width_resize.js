export default function(iframe){
  if (!iframe) return 'no';
  const containerClassList = ['uk-container-large']
  function addClass(node, list) {
    list.forEach(function(className) {
      node.classList.add(className)
    })
  }
  try {
    const rootDoc = iframe.contentDocument
    if (rootDoc.querySelector('.uk-container')) {
      return 'no'
    }
    iframe.parentElement.style.width = '100%';
    let wrap
    const rightContent = rootDoc.querySelector('body > #rightContent')
    const wrapTableList = rootDoc.querySelectorAll('table[width*="810"], table[width*="988"]')
    const allDiv = rootDoc.querySelectorAll('div')
    const allTab = rootDoc.querySelectorAll('table[width*="780"]')
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

    /* 去除所有具有固定宽度的table宽度 */
    if (allTab.length > 0) {
      allTab.forEach(function(table) {
        table.removeAttribute('width')
        table.style.width = '100%'
      })
    }

    /* 处理前台BOP页面 */
    if (wrapDiv_BOP) {
      wrapDiv_BOP.removeAttribute('style')
      wrapDiv_BOP.classList.add('uk-container')
      addClass(wrapDiv_BOP, containerClassList)
    }

    /* 具有id=rightContent的div直接处理*/
    if (rightContent) {
      wrap = rightContent
      wrap.classList.add('uk-container')
      addClass(wrap, containerClassList)
    }

    /* 去除所有具有固定宽度的table宽度并处理 */
    if (wrapTableList.length > 0) {
      for (let i = 0; i < wrapTableList.length; i++) {
        wrapTableList[i].removeAttribute('width')
        wrapTableList[i].style.width = '100%'
      }
      wrap = document.createElement('div')
      wrap.classList.add('uk-container')
      addClass(wrap, containerClassList)
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
            addClass(childNode, containerClassList)
          }
        }
      }
    }

    /* 如果不是以上所有情况： */
    if (!rootDoc.querySelector('.uk-container')) {
      const body = rootDoc.body
      body.classList.add('uk-container')
      addClass(body, containerClassList)
    }

    /* 输出结果*/
    const result = rootDoc.querySelector('.uk-container')? 'success': 'no'
    return result
  } catch(error) {
    throw new Error(error)
  }
}