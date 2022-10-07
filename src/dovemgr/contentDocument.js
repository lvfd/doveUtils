import importStyle from './importStyle'
import {mgrcss} from './importStyle'
import {show} from './functions'


export default function(iframe) {
  try {
    const icd = iframe.contentDocument
    importStyle(icd, mgrcss)
    const css = icd.querySelector(`link#${mgrcss[0]}`)
    css.addEventListener('error', () => {
      show(iframe)
      console.error('加载css错误')
    })
    css.addEventListener('load', () => {
      show(iframe)
    })
  } catch(e) {
    show(iframe)
    console.error('处理iframe.contentDocument失败', e.stack)
  }
}