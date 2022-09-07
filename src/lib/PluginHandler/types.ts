export type CMDType = 'install' | 'uninstall' | 'update'
export type CMDResult = {
  code: number
  data: string
}
export type PluginHandlerOptions = {
  proxy?: string
}
