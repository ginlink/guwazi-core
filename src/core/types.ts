import { LifecyclePlugins } from '../lib/LifecyclePlugins'

export type Config = {
  guwaziPlugins: {
    [name: string]: boolean
  }
}

export type StringKeyMap<T> = {
  [key: string]: T extends T ? T : any
}

export type Helper = {
  beforeTransformPlugins: LifecyclePlugins
  transformPlugins: LifecyclePlugins
  beforeTranslatePlugins: LifecyclePlugins
  translatePlugins: LifecyclePlugins
  afterTranslatePlugins: LifecyclePlugins
}
