import { Guwazi } from '../../core'

export type PluginConfig = {
  name: string
  type: string
  required: boolean
  default?: any
  alias?: string
  [propName: string]: any
}

export type Plugin = {
  handle: (ctx: Guwazi) => Promise<Guwazi>
  name?: string
  config?: (ctx: Guwazi) => PluginConfig[]
}

export type PluginWrapper = {
  register: (ctx: Guwazi) => void
}
