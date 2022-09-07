import CryptoJS from 'crypto-js'
import { YoudaoQueryProps } from './types'

export function truncate(q: string) {
  const len = q.length
  if (len <= 20) return q
  return q.substring(0, 10) + len + q.substring(len - 10, len)
}

export function generateYoudaoData({ appKey, key, query, from, to }: YoudaoQueryProps) {
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'

  const salt = new Date().getTime()
  const curtime = Math.round(new Date().getTime() / 1000)

  const str1 = appKey + truncate(query) + salt + curtime + key

  const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex)
  var vocabId = '您的用户词表ID'

  return {
    q: query,
    appKey: appKey,
    salt: String(salt),
    from: from,
    to: to,
    sign: sign,
    signType: 'v3',
    curtime: String(curtime),
    vocabId: vocabId
  }
}
