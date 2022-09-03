import { Logger } from '../lib/Logger'
import { Config, Helper, IGuwazi, StringKeyMap } from './types'
import EventEmitter from 'events'
import fs from 'fs-extra'
import path from 'path'
import { homedir } from 'os'
import { DB } from '../utils/db'
import { get, set } from 'lodash'
import { LifecyclePlugins, setCurrentPluginName } from '../lib/LifecyclePlugins'
import { PluginLoader } from '../lib/PluginLoader'
import { Lifecycle } from './Lifecycle'
import { consolePluginWrapper } from '../plugins/console'

export class Guawazi extends EventEmitter implements IGuwazi {
  private db!: DB
  private _config!: Config
  private _pluginLoader!: PluginLoader
  private lifeCycle!: Lifecycle
  configPath: string
  baseDir!: string
  log: Logger
  helper: Helper

  input: any

  constructor(configPath = '') {
    super()

    this.configPath = configPath
    this.log = new Logger(this)
    this.helper = {
      beforeTransformPlugins: new LifecyclePlugins('beforeTransformPlugins'),
      transformPlugins: new LifecyclePlugins('transformPlugins'),
      beforeTranslatePlugins: new LifecyclePlugins('beforeTranslatePlugins'),
      translatePlugins: new LifecyclePlugins('translatePlugins'),
      afterTranslatePlugins: new LifecyclePlugins('afterTranslatePlugins')
    }

    this.initConfigPath()
    this.initConfig()
    this.init()
  }

  private init() {
    this._pluginLoader = new PluginLoader(this)

    // load self plugins
    setCurrentPluginName('guwazi')
    consolePluginWrapper.register(this)
    setCurrentPluginName('')

    // load third-party plugins
    this._pluginLoader.load()
    this.lifeCycle = new Lifecycle(this)
  }

  private initConfigPath() {
    if (this.configPath === '') {
      // 如果不提供配置文件路径，就使用默认配置
      this.configPath = homedir() + '/.guwazi/config.json'
    }

    if (path.extname(this.configPath).toUpperCase() !== '.JSON') {
      // 如果配置文件的格式不是JSON就返回错误日志
      this.configPath = ''
      return this.log.error('The configuration file only supports JSON format.')
    }

    const exist = fs.pathExistsSync(this.configPath)
    if (!exist) {
      // 如果不存在就创建
      fs.ensureFileSync(`${this.configPath}`)
    }

    this.baseDir = path.dirname(this.configPath)
  }

  private initConfig() {
    this.db = new DB(this)
    this._config = (this.db.read(true) as unknown) as Config
  }

  getConfig<T = Config>(name?: string): T {
    if (!name) {
      return (this._config as unknown) as T
    } else {
      return get(this._config, name)
    }
  }

  saveConfig(config: StringKeyMap<any>) {
    this.setConfig(config)
    this.db.saveConfig(config)
  }

  setConfig(config: StringKeyMap<any>) {
    Object.keys(config).forEach((name: string) => {
      set(this._config, name, config[name])
    })
  }

  translate(input?: string) {
    this.lifeCycle.start(input)
  }
}