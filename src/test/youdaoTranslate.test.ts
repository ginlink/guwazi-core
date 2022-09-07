import { Guwazi } from '..'

describe('console plugin test', () => {
  it('works without youdao-translate-plugin', async () => {
    const guwazi = new Guwazi()

    await guwazi.translate('哈哈哈哈，你是谁？')

    console.log('[结果]:', guwazi.output)
  })
})
