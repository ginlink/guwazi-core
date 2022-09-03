import { JSONStore } from '@picgo/store'
import { IJSON } from '@picgo/store/dist/types'
import { IGuwazi } from '../../core'
import { IConfig } from './types'

export class DB {
  private readonly ctx: IGuwazi
  private readonly db: JSONStore
  constructor(ctx: IGuwazi) {
    this.ctx = ctx
    this.db = new JSONStore(this.ctx.configPath)

    // if (!this.db.has('picBed')) {
    //   try {
    //     this.db.set('picBed', {
    //       uploader: 'smms',
    //       current: 'smms'
    //     })
    //   } catch (e) {
    //     this.ctx.log.error(e as any)
    //     throw e
    //   }
    // }
    if (!this.db.has('guwaziPlugins')) {
      try {
        this.db.set('guwaziPlugins', {})
      } catch (e) {
        this.ctx.log.error(e as any)
        throw e
      }
    }
  }

  read(flush?: boolean): IJSON {
    return this.db.read(flush)
  }

  get(key: string = ''): any {
    this.read(true)
    return this.db.get(key)
  }

  set(key: string, value: any): void {
    this.read(true)
    return this.db.set(key, value)
  }

  has(key: string): boolean {
    this.read(true)
    return this.db.has(key)
  }

  unset(key: string, value: any): boolean {
    this.read(true)
    return this.db.unset(key, value)
  }

  saveConfig(config: Partial<IConfig>): void {
    Object.keys(config).forEach((name: string) => {
      this.set(name, config[name])
    })
  }

  removeConfig(config: IConfig): void {
    Object.keys(config).forEach((name: string) => {
      this.unset(name, config[name])
    })
  }
}
