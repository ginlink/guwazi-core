export type ILogArgvType = string | number
export type ILogArgvTypeWithError = ILogArgvType | Error

export interface ILogger {
  success: (...msg: ILogArgvType[]) => void
  info: (...msg: ILogArgvType[]) => void
  error: (...msg: ILogArgvTypeWithError[]) => void
  warn: (...msg: ILogArgvType[]) => void
}

export enum ILogType {
  success = 'success',
  info = 'info',
  warn = 'warn',
  error = 'error'
}

export const logLevel = {
  [ILogType.success]: 'green',
  [ILogType.info]: 'blue',
  [ILogType.warn]: 'yellow',
  [ILogType.error]: 'red'
}

export type ILogColor = 'blue' | 'green' | 'yellow' | 'red'
