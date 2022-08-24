import common from './common'
import log from './logger'

const loadFile = common.loadfile
const serverUrl = common.getNodeBase()
const suffix = common.getNodeSuffix()
const jqueryName = 'jquery'

function loadJquery(config) {
    const version = config.version || '3.6.0'
    const root = config.root || document
    const src = `${serverUrl}/plugin/${jqueryName}/${jqueryName}-${version}${suffix}js`
    const oldScripts = getOldJquery(root)
    if (oldScripts.length < 1) {
        const head = root.querySelector('head')
        let newScript = document.createElement('script')
        newScript.src = src
        newScript.insertBefore()
    }  
}

function getOldJquery(root) {
    const root = root || document
    const scriptList = root.querySelectorAll('script')
    if (!scriptList) throw new Error('scriptList报错')
    if (scriptList.length < 1) {
        log('没有找到script标签')
        return
    }
    for (let i = 0; i < scriptList.length; i++) {
        const script = scriptList[i]
        if (!script.src) continue
        let src = script.src
        if (src.search(/jquery/) === -1) continue
        script.setAttribute('data-isJquery', true)
    }
    const jqueryList = root.querySelectorAll('script["data-isJquery"=true]')
    log(`找到${jqueryList.length}个jquery引用`)
    return jqueryList
}
