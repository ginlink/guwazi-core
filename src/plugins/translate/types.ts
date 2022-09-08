export type YoudaoQueryProps = {
  appKey: string
  key: string
  query: string
  from: string
  to: string
}

export type YoudaoQueryRes = {
  tSpeakUrl: string
  requestId: string
  query: string
  translation: string[]
  errorCode: string
  dict: Dict
  webdict: Webdict
  l: string
  isWord: boolean
  speakUrl: string
}

export interface Dict {
  url: string
}

export interface Webdict {
  url: string
}

export type YoudaoConfig = {
  appKey: string
  key: string
  from: string
  to: string
}
