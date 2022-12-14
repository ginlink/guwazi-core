import EventEmitter from 'events'
import { Guwazi } from '.'
import { LifecyclePlugins } from '../lib/LifecyclePlugins'
import { BuildInEvent } from '../types'

export class Lifecycle extends EventEmitter {
  private ctx: Guwazi

  constructor(ctx: Guwazi) {
    super()
    this.ctx = ctx
  }

  async start(input: any): Promise<void> {
    try {
      this.ctx.input = input

      await this.beforeTransform()
      await this.doTransform()
      await this.beforeTranslate()
      await this.doTranslate()
      await this.afterTranslate()
    } catch (err) {
      this.emit(BuildInEvent.FAILED, err)
      this.ctx.log.error(err as any)
    }
  }

  private async beforeTransform() {
    this.emit('beforeTransform', this.ctx)
    await this.handlePlugins(this.ctx.helper.beforeTransformPlugins)

    return this.ctx
  }

  private async doTransform() {
    this.emit('doTransform', this.ctx)
    await this.handlePlugins(this.ctx.helper.transformPlugins)

    return this.ctx
  }

  private async beforeTranslate() {
    this.emit('beforeTranslate', this.ctx)

    await this.handlePlugins(this.ctx.helper.beforeTranslatePlugins)
    return this.ctx
  }

  private async doTranslate() {
    this.emit('doTranslate', this.ctx)
    await this.handlePlugins(this.ctx.helper.translatePlugins)

    return this.ctx
  }

  private async afterTranslate() {
    this.emit('afterTranslate', this.ctx)
    await this.handlePlugins(this.ctx.helper.afterTranslatePlugins)

    return this.ctx
  }

  private async handlePlugins(lifecyclePlugins: LifecyclePlugins) {
    const plugins = lifecyclePlugins.getList()

    await Promise.all(
      plugins.map(async plugin => {
        await plugin.handle(this.ctx)
      })
    )
  }
}
