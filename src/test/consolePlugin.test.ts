import { Guawazi } from '..'
import _ from 'lodash'

describe('console plugin test', () => {
  it('console plugin run normally', () => {
    const guwazi = new Guawazi()

    guwazi.translate('input')
  })
})
