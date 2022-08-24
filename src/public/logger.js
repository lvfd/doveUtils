function log(logs) {
  const hostname = window.location.hostname
  const reg = /^test|^localhost/
  const isTest = hostname.search(reg) !== -1
  if (!isTest) return
  console.log(`[doveTestLogger]:${logs}`)
}

export default log