const crypto = require('crypto')
const {
    throwServiceError
} = require('./errors')
const constant = require('./constant')

class WXBizDataCrypt {
    constructor() {
        this.appId = constant.WEI_XIN.APP_ID
    }

    decryptData(sessionKey, encryptedData, iv) {
        sessionKey = new Buffer(sessionKey, 'base64')
        encryptedData = new Buffer(encryptedData, 'base64')
        iv = new Buffer(iv, 'base64')
        let userInfo = null
        try {
            let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
            decipher.setAutoPadding(true)
            let decoded = decipher.update(encryptedData, 'binary', 'utf8')
            decoded += decipher.final('utf8')
            userInfo = JSON.parse(decoded)
        } catch (err) {
            throwServiceError({
                code: constant.STATUS_CODE.WECHAT_DECODE_ERROR.code,
                message: `${constant.STATUS_CODE.WECHAT_DECODE_ERROR.message}:${err.message}`
            })
        }
        if (userInfo.watermark.appid !== this.appId) {
            throwServiceError(constant.STATUS_CODE.WECHAT_DECODE_ERROR)
        }
        return userInfo
    }
}

module.exports = WXBizDataCrypt
