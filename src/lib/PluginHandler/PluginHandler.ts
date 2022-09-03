import { Guawazi } from '../../core'
import { CMDResult, CMDType, PluginHandlerOptions } from './types'
import spawn from 'cross-spawn'
import { BuildInEvent } from '../../types'

export class PluginHandler {
  private ctx: Guawazi
  constructor(ctx: Guawazi) {
    this.ctx = ctx
  }

  private execCommand(
    cmd: CMDType,
    modules: string[],
    where: string,
    options: PluginHandlerOptions = {}
  ): Promise<CMDResult> {
    return new Promise(resolve => {
      try {
        let args = [cmd as string]
          .concat(modules)
          .concat('--color=always')
          .concat('--save')

        if (options.proxy) {
          args = args.concat(`--proxy=${options.proxy}`)
        }

        const npm = spawn('npm', args, {
          cwd: where
        })

        let output = ''
        npm.stdout?.on('data', (data: string) => (output += data)).pipe(process.stdout)
        npm.stderr?.on('data', (data: string) => (output += data)).pipe(process.stderr)

        npm.on('close', code => {
          if (!code) {
            resolve({ code: 0, data: output })
          } else {
            resolve({ code, data: output })
          }
        })

        // for users who haven't installed node.js
        npm.on('error', (err: Error) => {
          this.ctx.log.error(err)
          this.ctx.log.error('NPM is not installed')
          this.ctx.emit(BuildInEvent.FAILED, 'NPM is not installed')
        })
      } catch (err) {
        this.ctx.log.error(err as Error)
        this.ctx.emit(BuildInEvent.FAILED, err)
      }
    })
  }

  async install(plugins: string[], options?: PluginHandlerOptions) {
    plugins = plugins.map(x => `guwazi-plugin-${x}`)
    const result = await this.execCommand('install', plugins, this.ctx.baseDir, options)

    if (!result.code) {
      this.ctx.log.success('Install Success')
      this.ctx.emit(BuildInEvent.INSTALL_SUCCESS, {
        title: '插件安装成功',
        body: plugins
      })
    } else {
      this.ctx.log.error(`Install failed, code:${result.code}, data:${result.data}`)
      this.ctx.emit(BuildInEvent.INSTALL_FAILED, {
        title: '插件安装失败',
        body: plugins
      })
    }
  }

  async uninstall(plugins: string[], options?: PluginHandlerOptions) {
    plugins = plugins.map(x => `guwazi-plugin-${x}`)
    const result = await this.execCommand('uninstall', plugins, this.ctx.baseDir, options)

    if (!result.code) {
      this.ctx.log.success('Uninstall Success')
      this.ctx.emit(BuildInEvent.INSTALL_SUCCESS, {
        title: '插件卸载成功',
        body: plugins
      })
    } else {
      this.ctx.log.error(`Uninstall failed, code:${result.code}, data:${result.data}`)
      this.ctx.emit(BuildInEvent.INSTALL_FAILED, {
        title: '插件卸载失败',
        body: plugins
      })
    }
  }
}
