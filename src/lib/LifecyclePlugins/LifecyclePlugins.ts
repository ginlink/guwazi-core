import { Plugin } from './types'

export class LifecyclePlugins {
  static currentPluginName: string | null

  private list: { [id: string]: Plugin } = {}
  private name: string

  constructor(name: string) {
    this.name = name
  }

  register(id: string, plugin: Plugin) {
    if (!id) throw new TypeError('id is required!')

    // 如果插件没有handle的方法，则不予注册
    if (typeof plugin.handle !== 'function') throw new TypeError('plugin.handle must be a function!')

    // 如果插件的id重复了，则不予注册
    if (this.list[id]) throw new TypeError(`duplicate id: ${id}!`)

    plugin.name = id
    this.list[id] = plugin
  }

  getName(): string {
    return this.name
  }

  get(id: string): Plugin | undefined {
    return this.list[id]
  }

  getList() {
    return Object.values(this.list)
  }

  getIdList() {
    return Object.keys(this.list)
  }
}

// 当前这个包，可能会安装多个plugin
export function setCurrentPluginName(name: string) {
  LifecyclePlugins.currentPluginName = name
}
