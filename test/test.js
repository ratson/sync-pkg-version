import fs from 'fs'

import tempWrite from 'temp-write'
import test from 'ava'

import {updateCordovaPluginVersion} from '../lib'

test((t) => {
  const filename = tempWrite.sync(fs.readFileSync('fixtures/plugin.xml', 'utf8'))
  return updateCordovaPluginVersion(filename, '0.0.1').then(({before, after}) => {
    t.is(before, '0.0.0')
    t.is(after, '0.0.1')
  })
})
