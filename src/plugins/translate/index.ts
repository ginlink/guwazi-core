import { Guwazi } from '../../core'
import { PluginWrapper } from '../../lib/LifecyclePlugins'
import youdaoTranslate from './youdao'

const translatesPluginWrapper: PluginWrapper = {
  register(ctx: Guwazi) {
    ctx.helper.translatePlugins.register('path', youdaoTranslate)
  }
}

export default translatesPluginWrapper
