import {
  log_insteadJquery as log,
  errorHandler
} from '../public'
import {
  getNodeBase,
  getNodeSuffix,
} from './utils'

const serverUrl = getNodeBase()
const suffix = getNodeSuffix()
const jqueryName = 'jquery'

function insteadJquery(config) {
    try {
        const root = config && config.root? config.root: 'document'
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
                    try {
                        newJqueryNode.onload = function() {
                            const trigger = this
                            const url = trigger.src? trigger.src: trigger.href
                            resolve(`来自${url}的${trigger.tagName}加载完毕`)
                        }
                        newJqueryNode.src = newJquery.src
                        parent.insertBefore(newJqueryNode, targetScript)
                        log('jquery替换完成')
                    } catch(e) {
                        reject(e)
                    }
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
        log('没有找到script标签')
        return {}
    }
    for (let i = 0; i < scriptList.length; i++) {
        const script = scriptList[i]
        if (!script.src) continue
        let src = script.src
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
