import { ILogArgvType, ILogArgvTypeWithError, ILogColor, ILogger, ILogType, logLevel } from './types'
import chalk from 'chalk'
import { Guwazi } from '../../core'

export class Logger implements ILogger {
  guwazi: Guwazi

  constructor(ctx: Guwazi) {
    this.guwazi = ctx
  }

  private handleLog(type: ILogType, ...msg: ILogArgvTypeWithError[]): void {
    const logHeader = chalk[logLevel[type] as ILogColor](`[Guwazi ${type.toUpperCase()}]:`)
    console.log(logHeader, ...msg)
  }

  success(...msg: ILogArgvType[]): void {
    this.handleLog(ILogType.success, ...msg)
  }
  info(...msg: ILogArgvType[]): void {
    this.handleLog(ILogType.info, ...msg)
  }
  error(...msg: ILogArgvTypeWithError[]): void {
    this.handleLog(ILogType.error, ...msg)
  }
  warn(...msg: ILogArgvType[]): void {
    this.handleLog(ILogType.warn, ...msg)
  }
}
