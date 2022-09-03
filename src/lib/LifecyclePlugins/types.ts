import { Guawazi } from '../../core'

export type Plugin = {
  handle: (ctx: Guawazi) => void
  name?: string
}

export type PluginWrapper = {
  register: (ctx: Guawazi) => void
}
