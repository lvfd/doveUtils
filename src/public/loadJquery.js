import common from './common'

const loadFile = common.loadfile
const serverUrl = common.getNodeBase()
const suffix = common.getNodeSuffix()
const jqueryName = 'jquery'

function loadJquery(config) {
    const version = config.version || '3.6.0'
    const root = config.root || document
    const src = `${serverUrl}/plugin/${jqueryName}-${version}${suffix}js`
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
    return scriptList
}
