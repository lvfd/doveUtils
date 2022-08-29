import dateFormat from './dateFormat'

function logByType(type) {
  return function(logs) {
    log(logs, type)
  }
}

function log(logs, consoleType) {
  let defaultConfig = {}
  defaultConfig.text = 'doveTestLogger'
  defaultConfig.color = '#41b883'
  let consoleText = defaultConfig.text
  let consoleColor = defaultConfig.color
  if (consoleType) {
    consoleText = typeof consoleType === 'string'? consoleType: consoleType.text
    consoleColor = typeof consoleType === 'object'? consoleType.color: defaultConfig.color
  }
  const hostname = window.location.hostname
  const reg = /^test|^localhost/
  const isTest = hostname.search(reg) !== -1
  if (!isTest) return
  console.info(
    `%c ${dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}: %c ${consoleText}: %c ${logs}`,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    `background:${consoleColor}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff`,
    'background:transparent'
    )
}

export default logByType()
export var log_insteadJquery = logByType({text:'doveJqueryInsteadLogger', color:'#0769AD'})
export var log_recharge = logByType({text:'doveRecharge', color:'#FF0B00'})