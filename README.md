## Guwazi

guwazi是一个跨平台翻译软件，通过 [electron]() 构建

灵感来源于 [Picgo]() 和 [Bob]()

### 插件

示例插件格式

```ts
import { Guwazi } from '..'

const myPlugin = {
  register: (ctx: Guwazi) => {
    ctx.helper.beforeTransformPlugins.register('xxx', {
      handle(ctx) {
        console.log('[我是打印插件，我正在执行中]:')
        // console.log(ctx.output)
      }
    })
  }
}

export default myPlugin
```

### 进度

- [x] 插件系统
- [ ] GUI配置插件原型、UI、功能
- [x] 翻译UI
- [ ] 主界面原型、UI
- [ ] 动态表单

