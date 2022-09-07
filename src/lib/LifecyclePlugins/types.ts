import { Guwazi } from '../../core'

export type Plugin = {
  handle: (ctx: Guwazi) => void
  name?: string
}

export type PluginWrapper = {
  register: (ctx: Guwazi) => void
}
