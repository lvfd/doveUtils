import checkMobileNumber from './checkMobileNumber'

function encryptMobileNumber(number) {
  try {
    const checkResult = checkMobileNumber(number)
    if (checkResult === false) {
      throw new Error('decryptMobileNumber不能解析非法字符')
    }
    const tag = checkResult.tag
    const mobile = checkResult.mobile
    if (tag === 'chinamainland') {
      return encryptMobileNumberByRules(mobile, 3, '****', 4)
    }
    if (tag === 'hongkong' || tag === 'macau') {
      return encryptMobileNumberByRules(mobile, 2, '****', 2)
    }
    if (tag === 'taiwan') {
      return encryptMobileNumberByRules(mobile, 2, '****', 3)
    }
    return '[缺省脱敏加密方法]'
  } catch (e) {
    console.error(e.stack)
    return '[手机号码格式错误]'
  }
}
function encryptMobileNumberByRules(mobile, headDigit, string, lastDigit) {
  const encryptString = string
  const str = mobile.toString()
  const len = str.length
  const head = str.substring(0, parseInt(headDigit))
  const last = str.substring(len - parseInt(lastDigit), len)
  return `${head}${encryptString}${last}`
}



// 测试代码:
// const t1 = encryptMobileNumber(13581234567)
// const t2 = encryptMobileNumber('13581678948')
// const t3 = encryptMobileNumber('06578')
// const t4 = encryptMobileNumber('爱思比')
// console.log(t1, t2, t3, t4)

// 测试结果:
// 135****4567 135****8948 [缺省脱敏加密方法] [手机号码格式错误]


export default encryptMobileNumber