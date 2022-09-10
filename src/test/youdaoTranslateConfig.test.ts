import { Guwazi } from '..'

describe('plugin test', () => {
  it('show plugin config', async () => {
    const guwazi = new Guwazi()

    const config = getConfig('guwazi-plugin-youdao', 'translatePlugins', guwazi)

    expect(config).toEqual([
      {
        name: 'appKey',
        type: 'input',
        alias: '应用ID',
        default: '',
        required: true
      },
      {
        name: 'key',
        type: 'input',
        alias: '秘钥',
        default: '',
        required: true
      }
    ])
  })
})
