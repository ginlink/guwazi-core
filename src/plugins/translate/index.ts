import { Guwazi } from '../../core'
import { PluginWrapper } from '../../lib/LifecyclePlugins'
import youdaoTranslate from './youdao'

const translatesPluginWrapper: PluginWrapper = {
  register(ctx: Guwazi) {
    ctx.helper.translatePlugins.register('guwazi-plugin-youdao', youdaoTranslate)
  }
}

export default translatesPluginWrapper
