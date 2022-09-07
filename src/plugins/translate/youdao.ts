import axios from 'axios'
import { youdaoApiUrl } from '../../constants'
import { Plugin } from '../../lib/LifecyclePlugins'
import { YoudaoQueryRes } from './types'
import { generateYoudaoData } from './utils'

const youdaoTranslater: Plugin = {
  async handle(ctx) {
    try {
      const appKey = '796774f424aa0625'
      const key = ''
      const from = 'zh-CHS'
      const to = 'en'
      const query = ctx.input

      const queryData = new URLSearchParams(generateYoudaoData({ appKey, key, query, from, to }))

      const res = await axios.post<YoudaoQueryRes>(youdaoApiUrl, queryData)

      const { translation } = res.data

      ctx.output = translation?.[0]
    } catch (err) {
      ctx.log.error(err as any)
    }
  }
}

export default youdaoTranslater
