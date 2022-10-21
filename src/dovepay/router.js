export default {
  index: '/protected/rightByUserWeb.jsp',
}

export var filter = (iframe, idArray/*, parameters*/) => {
  try {
    if (!iframe || !idArray) throw new Error('缺少参数')
    const id = iframe.contentDocument.body.id
    if (id) {
      return idArray.some((bodyId) => id === bodyId)
    }
    // const href = iframe.contentWindow.location.href
    // return parameters.some((action) => {
    //   const actionName = action.action
    //   const paramIndex = action.paramIndex? action.paramIndex: 'm'
    //   const suffix = action.suffix? action.suffix: '.do'
    //   const params = action.param
    //   return params.some((param) => {
    //     const reg = {
    //       id: new RegExp(`^${param}`, 'i'),
    //       href: new RegExp(`${actionName}${suffix}\\?${paramIndex}\\=${param}`, 'i'),
    //     }
    //     return reg.href.test(href) || reg.id.test(id)
    //   })
    // })
  } catch(e) {
    console.error('定位iframe的href时出错', e.stack)
  }
}

// export var href = [
//   {
//     action: '\\/protected\\/accountAction',
//     param: [
//       'accountsRecharge',
//       'rechargeConfirm',
//     ]
//   }
// ]