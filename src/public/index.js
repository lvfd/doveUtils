// 汇总
import dpublic from './dovepay_pub'
import common_public from './common'
import log from './logger'
import {
  log_recharge,
  log_changeDom,
} from './logger'
import errorHandler from './errorHandler'
import loadJquery from './loadJquery'
import encryptMobileNumber from './mobile/encryptMobileNumber'
import polyfill from './polyfill'
import bankInfo from './bankInfo'

export var dovepay = dpublic
export var common = common_public
export { polyfill }
export { bankInfo }
export { log, log_recharge, log_changeDom, errorHandler, loadJquery, encryptMobileNumber }
