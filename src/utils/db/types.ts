/** PicGo 配置文件类型定义 */
export interface IConfig {
  picBed: {
    uploader: string
    current?: string
    transformer?: string
    /** for uploader */
    proxy?: string
    [others: string]: any
  }
  guwaziPlugins: {
    [pluginName: string]: boolean
  }
  debug?: boolean
  silent?: boolean
  settings?: {
    logLevel?: string
    logPath?: string
    /** for npm */
    registry?: string
    /** for npm */
    proxy?: string
    [others: string]: any
  }
  [configOptions: string]: any
}
