import { Guawazi } from '../../core'
import { Plugin, PluginWrapper } from '../../lib/LifecyclePlugins'

const consolePlugin0: Plugin = {
  handle(ctx) {
    ctx.log.info('hello，我是consolePlugin0，我在beforeTransformPlugins中调用')
  }
}
const consolePlugin1: Plugin = {
  handle(ctx) {
    ctx.log.info('hello，我是consolePlugin1，我在transformPlugins中调用')
  }
}

export const consolePluginWrapper: PluginWrapper = {
  register: (ctx: Guawazi) => {
    ctx.helper.beforeTransformPlugins.register('console0', consolePlugin0)
    ctx.helper.transformPlugins.register('console1', consolePlugin1)
  }
}
