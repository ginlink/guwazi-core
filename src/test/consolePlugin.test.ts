import { Guwazi } from '..'

describe('console plugin test', () => {
  it('works without third-plugin', async () => {
    const guwazi = new Guwazi()

    await guwazi.translate('input')
  })

  it('install and uninstall console plugin', async () => {
    const guwazi = new Guwazi()

    await guwazi.pluginHandler.install(['console'])
    // await guwazi.reload()
    await guwazi.pluginLoader.load()
    await guwazi.translate('input')
    await guwazi.pluginHandler.uninstall(['console'])
  })
})
