import { Guawazi } from '..'

module.exports = {
  register: (ctx: Guawazi) => {
    ctx.helper.beforeTransformPlugins.register('xxx', {
      handle(ctx) {
        console.log('[我是打印插件，我正在执行中]:')
        // console.log(ctx.output)
      }
    })
  }
}
