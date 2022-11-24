import abc from '@dove-img/banklogo/abc.svg'
import boc from '@dove-img/banklogo/boc.svg'
import bos from '@dove-img/banklogo/bos.svg'
import ccb from '@dove-img/banklogo/ccb.svg'
import ceb from '@dove-img/banklogo/ceb.svg'
import citic from '@dove-img/banklogo/citic.svg'
import cmb from '@dove-img/banklogo/cmb.svg'
import cmbc from '@dove-img/banklogo/cmbc.svg'
import comm from '@dove-img/banklogo/comm.svg'
import czb from '@dove-img/banklogo/czb.svg'
import gdb from '@dove-img/banklogo/gdb.svg'
import glb from '@dove-img/banklogo/glb.svg'
import hzcb from '@dove-img/banklogo/hzcb.svg'
import icbc from '@dove-img/banklogo/icbc.svg'
import lzccb from '@dove-img/banklogo/lzccb.svg'
import nbcb from '@dove-img/banklogo/nbcb.svg'
import qdccb from '@dove-img/banklogo/qdccb.svg'
import spabank from '@dove-img/banklogo/spabank.svg'
import spdb from '@dove-img/banklogo/spdb.svg'
import znx from '@dove-img/banklogo/znx.svg'
import bob from '@dove-img/banklogo/bob.svg'
import cib from '@dove-img/banklogo/cib.svg'
import psbc from '@dove-img/banklogo/psbc.svg'

let info = [
  {name: 'abc', regExp: '(?:农行)|(?:农业银行)', logo: abc},
  {name: 'boc', regExp: '(?:中行)|(?:中国银行)', logo: boc},
  {name: 'bos', regExp: '上海银行', logo: bos},
  {name: 'ccb', regExp: '(?:建行)|(?:建设银行)', logo: ccb},
  {name: 'ceb', regExp: '光大(?:银行)?', logo: ceb},
  {name: 'citic', regExp: '中信(?:银行)?', logo: citic},
  {name: 'cmb', regExp: '招商银行', logo: cmb},
  {name: 'cmbc', regExp: '民生银行', logo: cmbc},
  {name: 'comm', regExp: '(?:交行)|(?:交通银行)', logo: comm},
  {name: 'czb', regExp: '浙商银行', logo: czb},
  {name: 'gdb', regExp: '广发(?:银行)?', logo: gdb},
  {name: 'glb', regExp: '桂林银行', logo: glb},
  {name: 'hzcb', regExp: '杭州银行', logo: hzcb},
  {name: 'icbc', regExp: '(?:工行)|(?:工商银行)', logo: icbc},
  {name: 'lzccb', regExp: '(?:柳州银行)|(?:柳江柳银村镇银行)', logo: lzccb},
  {name: 'nbcb', regExp: '宁波银行', logo: nbcb},
  {name: 'qdccb', regExp: '青岛银行', logo: qdccb},
  {name: 'spabank', regExp: '平安(?:银行)?', logo: spabank},
  {name: 'spdb', regExp: '浦发(?:银行)?', logo: spdb},
  {name: 'znx', regExp: '浙江农.*', logo: znx},
  {name: 'bob', regExp: '北京银行', logo: bob},
  {name: 'cib', regExp: '兴业银行', logo: cib},
  {name: 'psbc', regExp: '(?:邮储银行)|(?:邮政储蓄银行)', logo: psbc},
]

export default info