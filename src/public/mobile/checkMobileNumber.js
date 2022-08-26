function checkMobileNumber(mobileNumber) {
  try {
    const numSrc = parseInt(mobileNumber)
    if (isNaN(numSrc)) {
      throw new Error('checkMobileNumber需要传入数字参数')
    }
    const regs = [
      ['^(86)?', '1(3\\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\\d|9[0-35-9])\\d{8}$', '中国大陆', 'chinamainland'],
      ['^(852)?', '([6|9])\\d{7}$', '香港', 'hongkong'],
      ['^(853)?', '[6]([8|6])\\d{5}$', '澳门', 'macau'],
      ['^(886)?', '[0][9]\\d{8}$', '台湾', 'taiwan'],
    ]
    let description = '其他地区'
    let tag = 'other'
    let numDist = numSrc
    for (let i = 0; i < regs.length; i++) {
      const area = regs[i]
      let reg = new RegExp(area[0] + area[1])
      let regForDist = new RegExp(area[1])
      if (!reg.test(numSrc)) {
        continue
      }
      description = area[2]
      tag = area[3]
      numDist = regForDist.exec(numSrc)[0]
      break
    }
    return {
      mobile: numDist,
      address: description,
      tag: tag,
    }
  } catch (e) {
    console.error(e.stack)
    return false
  }
}



/* 测试代码: */
// // const hk = checkMobileNumber()
// // const ma = checkMobileNumber()
// // const tw = checkMobileNumber()
// const cn = checkMobileNumber('13584677688')
// const cn2 = checkMobileNumber('8613584677688')
// const cn3 = checkMobileNumber('008613584677688')
// const cn4 = checkMobileNumber(008613584677688)
// const cn5 = checkMobileNumber('asd')
// const cn6 = checkMobileNumber('8513584677688')
// // const un = checkMobileNumber()
// // console.log(hk, ma, tw, cn, un)
// console.log(cn, cn2, cn3, cn4, cn5, cn6)


/* 测试结果: */
// // {mobile: '13584677688', address: '中国大陆', tag: 'chinamainland'}
// // {mobile: '13584677688', address: '中国大陆', tag: 'chinamainland'}
// // {mobile: '13584677688', address: '中国大陆', tag: 'chinamainland'}
// // {mobile: '13584677688', address: '中国大陆', tag: 'chinamainland'}
// // false
// // {mobile: 8513584677688, address: '其他地区', tag: 'other'}

export default checkMobileNumber