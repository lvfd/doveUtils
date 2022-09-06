import {
  getNodeBase
} from '../load'
const basePath = getNodeBase

let info = [
  {name: 'abc', regExp: '(?:农行)|(?:农业银行)'},
  {name: 'boc', regExp: '(?:中行)|(?:中国银行)'},
  {name: 'bos', regExp: '上海银行'},
  {name: 'ccb', regExp: '(?:建行)|(?:建设银行)'},
  {name: 'ceb', regExp: '光大(?:银行)?'},
  {name: 'citic', regExp: '中信(?:银行)?'},
  {name: 'cmb', regExp: '招商银行'},
  {name: 'cmbc', regExp: '民生银行'},
  {name: 'comm', regExp: '(?:交行)|(?:交通银行)'},
  {name: 'czb', regExp: '浙商银行'},
  {name: 'gdb', regExp: '广发(?:银行)?'},
  {name: 'glb', regExp: '桂林银行'},
  {name: 'hzcb', regExp: '杭州银行'},
  {name: 'icbc', regExp: '(?:工行)|(?:工商银行)'},
  {name: 'lzccb', regExp: '柳州银行'},
  {name: 'nbcb', regExp: '宁波银行'},
  {name: 'qdccb', regExp: '青岛银行'},
  {name: 'spabank', regExp: '平安(?:银行)?'},
  {name: 'spdb', regExp: '浦发(?:银行)?'},
  {name: 'znx', regExp: '浙江农.*'},
  {name: 'bob', regExp: '北京银行'},
]
info.forEach(function(obj) {
  obj.path = `${basePath()}/doveutils/plugin/svg/banklogo/${obj.name}.svg`
})
export default info