function logByType(type) {
  return function(logs) {
    log(logs, type)
  }
}

function log(logs, consoleType) {
  const type = consoleType? consoleType: 'doveTestLogger'
  const hostname = window.location.hostname
  const reg = /^test|^localhost/
  const isTest = hostname.search(reg) !== -1
  if (!isTest) return
  console.log(`[${type}]:${logs}`)
}

export default logByType()
export var log_insteadJquery = logByType('doveJqueryInsteadLogger')