// 汇总
import dpublic from './dovepay_pub'
import common_public from './common'
import log from './logger'
import {log_recharge} from './logger'
import errorHandler from './errorHandler'
import loadJquery from './loadJquery'
import encryptMobileNumber from './mobile/encryptMobileNumber'

export var dovepay = dpublic
export var common = common_public
export { log, log_recharge, errorHandler, loadJquery, encryptMobileNumber }
