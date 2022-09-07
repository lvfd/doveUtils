import {
  log_insteadJquery as log,
  errorHandler
} from '../public'

import {
  getNodeBase,
  getNodeSuffix,
} from './utils'

import filter from '../change/filter'

const serverUrl = getNodeBase()
const suffix = getNodeSuffix()
const jqueryName = 'jquery'

function insteadJquery(config) {
    try {
        const root = config && config.root? config.root: 'document'

        /* 不处理userweb */
        const winRoot = config && config.root? config.root.contentWindow: window
        const isUserWeb = filter.userweb.test(winRoot.location.href)
        if (isUserWeb) {
          return new Promise((resolve) => {
            resolve('属于用户系统, 不更新jquery')
          })
        }

        const oldScripts = getOldJquery(root)
        if (oldScripts.length < 1) {
            return new Promise((resolve) => {
                resolve('不需要替换Jquery')
            })
        }
        let newJquery = {}
        newJquery.version = config && config.version? config.version: '3.6.0'
        newJquery.src = `${serverUrl}/doveutils/plugin/${jqueryName}/${jqueryName}-${newJquery.version}${suffix}js`
        // let targetJquery
        let promise
        for (let i = 0; i < oldScripts.length; i++) {
            let targetScript = oldScripts[i]
            const parent = targetScript.parentNode
            if (i === 0) {
                const newJqueryNode = document.createElement('script')
                promise = new Promise((resolve, reject) => {
                    newJqueryNode.onload = function() {
                        resolve(`${this.src}加载完毕`)
                    }
                    newJqueryNode.onerror = function() {
                        reject(`[更新jquery]加载失败`)
                    }
                    newJqueryNode.src = newJquery.src
                    parent.insertBefore(newJqueryNode, targetScript)
                })
            }
            parent.removeChild(targetScript)
        }
        return promise
    } catch(e) {
        errorHandler(e)
    }
}

function getOldJquery(rootNode) {
    const root = rootNode === 'document'? document: rootNode.contentDocument
    const scriptList = root.querySelectorAll('script')
    if (!scriptList) throw new Error('scriptList报错')
    if (scriptList.length < 1) {
        // log('没有找到script标签')
        return {}
    }
    for (let i = 0; i < scriptList.length; i++) {
        const script = scriptList[i]
        if (!script.src) continue
        let src = script.src
        // if (src.search(/jquery(?!-migrate)/) === -1) continue
        if (src.search(/jquery/) === -1) continue
        script.setAttribute('data-isJquery', true)
    }
    const jqueryList = root.querySelectorAll('script[data-isJquery=true]')
    const currentWindow = rootNode === 'document'? window: rootNode.contentWindow
    log(`在${currentWindow.location.href} 中找到${jqueryList.length}个jquery引用`)
    return jqueryList
}

function DoveUpdateJquery() {}
DoveUpdateJquery.prototype.exec = insteadJquery

export default insteadJquery
export { DoveUpdateJquery }
