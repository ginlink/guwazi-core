import path from 'path'
import fs from 'fs-extra'
import { Guwazi } from '../../core'
import { PluginWrapper, setCurrentPluginName } from '../LifecyclePlugins'

export class PluginLoader {
  ctx: Guwazi
  list: Set<string> = new Set()
  fullList: Set<string> = new Set()

  constructor(ctx: Guwazi) {
    this.ctx = ctx
    this.init()
  }

  init() {
    const pkgPath = path.join(this.ctx.baseDir, 'package.json')
    if (!fs.existsSync(pkgPath)) {
      const pkg = {
        name: 'guwazi-plugins',
        description: 'guwazi-plugins',
        repository: 'https://github.com/ginlink/guwazi-core',
        license: 'MIT'
      }

      fs.writeFileSync(pkgPath, JSON.stringify(pkg), 'utf-8')
    }
  }

  load() {
    const pkgPath = path.join(this.ctx.baseDir, 'package.json')
    const pluginDir = path.join(this.ctx.baseDir, 'node_modules')

    if (!fs.existsSync(pluginDir)) {
      return false
    }

    const pkgJson = fs.readJsonSync(pkgPath)
    const deps = Object.keys(pkgJson.dependencies || {})
    const devDeps = Object.keys(pkgJson.devDependencies || {})

    const moduleNames = deps.concat(devDeps).filter((name: string) => {
      if (!/^guwazi-plugin-/.test(name)) {
        return false
      }

      const pluginPath = this.resolvePluginPath(name)
      return fs.existsSync(pluginPath)
    })

    for (const name of moduleNames) {
      this.registerPlugin(name)
    }

    return true
  }

  registerPlugin(name: string) {
    try {
      this.fullList.add(name)
      setCurrentPluginName(name)

      const pluginConfig = this.ctx.getConfig<boolean>(`guwaziPlugins.${name}`)
      if (pluginConfig === true || pluginConfig === undefined) {
        this.list.add(name)

        // 未被禁用或者未被注册
        this.getPlugin(name).register(this.ctx)

        const plugin = `guwaziPlugins[${name}]`
        this.ctx.saveConfig({
          [plugin]: true
        })
      }
    } catch (err) {
      this.fullList.delete(name)
      this.list.delete(name)
      this.ctx.log.error(err as Error)
    }
  }

  getPlugin(name: string): PluginWrapper {
    const pluginPath = path.join(this.ctx.baseDir, 'node_modules', name)
    return require(pluginPath).default
  }

  resolvePluginPath(name: string) {
    return path.join(this.ctx.baseDir, 'node_modules', name)
  }

  /**
   * Get the list of enabled plugins
   */
  getList(): string[] {
    return [...this.list]
  }

  /**
   * Get the full list of plugins, whether it is enabled or not
   */
  getFullList(): string[] {
    return [...this.fullList]
  }
}
