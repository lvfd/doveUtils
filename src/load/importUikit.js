import {
  getNodeBase,
  getNodeSuffix,
  loadfile
} from './utils'

import {
  // logDefault as log,
  errorHandler,
} from '../public'

import filter from '../change/filter'

export default function(iframe) {  // rewrite
  const root = iframe? iframe.contentDocument: document
  const rootWindow = iframe? iframe.contentWindow: window
  
  /* 不处理userweb */
  const isUserWeb = filter.userweb.test(rootWindow.location.href)
  if (isUserWeb) {
    return new Promise((resolve) => {
      resolve('属于用户系统, 不引入uikit')
    })
  }

  const base = `${getNodeBase()}/doveuikit/dist`
  // const baseJava = `${getNodeBase('java')}/dovePay`  /* deprec. */
  const basePlugin = `${getNodeBase()}/doveutils/plugin`
  const cssName = ['uikit.dove-theme', 'uikit.custom']
  const jsName = ['uikit', 'uikit-icons']
  const suffix = getNodeSuffix()
  const promise = loadfile('css', {
    url: `${base}/css/${cssName[0]}${suffix}css`,
    root: root,
  })
  .then((/*res*/) => {
    // log(res)
    if (/((\.dovepay\.com.*)|(localhost.*))\/dovePay/.test(rootWindow.location.href)) {
      // log(`${basePlugin}/css/${cssName[1]}.css`)
      return loadfile('css', {
        url: `${basePlugin}/css/${cssName[1]}.css`,
        root: root
      })
    }
    else {
      return new Promise((resolve) => {
        resolve(`不需要加载${cssName[1]}.css`)
      })
    }
  })
  .then((/*res*/) => {
    // log(res)
    return loadfile('js', {
      url: `${base}/js/${jsName[0]}${suffix}js`,
      root: root,
    })
  })
  .then((/*res*/) => {
    // log(res)
    return loadfile('js', {
      url: `${base}/js/${jsName[1]}${suffix}js`,
      root: root,
    })
  })
  .then(() => {
    return new Promise((resolve) => {
      resolve('uikit加载完成')
    })
  })
  .catch((error) => {
    errorHandler(error)
  })
  return promise
}