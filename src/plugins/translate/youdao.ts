import axios from 'axios'
import { youdaoApiUrl } from '../../constants'
import { Plugin, PluginConfig } from '../../lib/LifecyclePlugins'
import { YoudaoConfig, YoudaoQueryRes } from './types'
import { generateYoudaoData } from './utils'

const youdaoTranslater: Plugin = {
  async handle(ctx) {
    const youdaoConfig = ctx.getConfig<YoudaoConfig>('translate.youdao')

    if (!youdaoConfig) {
      throw new Error("Can't find youdao translate config")
    }

    try {
      // const appKey = '796774f424aa0625'
      const appKey = youdaoConfig.appKey
      const key = youdaoConfig.key
      const from = youdaoConfig.from || 'zh-CHS'
      const to = youdaoConfig.to || 'en'
      const query = ctx.input

      const queryData = new URLSearchParams(generateYoudaoData({ appKey, key, query, from, to }))

      const res = await axios.post<YoudaoQueryRes>(youdaoApiUrl, queryData)

      const { translation } = res.data

      ctx.output = translation?.[0]
    } catch (err) {
      ctx.log.error(err as any)
    }

    return ctx
  },
  config(ctx) {
    const userConfig = ctx.getConfig<YoudaoConfig>('translate.youdao') || {}

    const config: PluginConfig[] = [
      {
        name: 'appKey',
        type: 'input',
        alias: '应用ID',
        default: userConfig.appKey || '',
        required: true
      },
      {
        name: 'key',
        type: 'input',
        alias: '秘钥',
        default: userConfig.key || '',
        required: true
      }
    ]
    return config
  }
}

export default youdaoTranslater
