import { Guwazi } from '..'

describe('console plugin test', () => {
  it('works without youdao-translate-plugin', async () => {
    const guwazi = new Guwazi()

    guwazi.setConfig({
      'translate.youdao': {
        appKey: '796774f424aa0625',
        key: 'YKnbybN4JaVm2prhirUGbVa0sUNvnoCx'
      }
    })

    await guwazi.translate('哈哈哈哈，你是谁？')

    console.log('[结果]:', guwazi.output)
  })
})
