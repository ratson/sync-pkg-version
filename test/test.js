import fs from 'fs'

import tempWrite from 'temp-write'
import test from 'ava'

import {updateCordovaPluginVersion} from '../lib'

test(async t => {
  const pluginXml = `${__dirname}/fixtures/plugin.xml`
  const filename = await tempWrite(fs.readFileSync(pluginXml, 'utf8'))
  return updateCordovaPluginVersion(filename, '0.0.1').then(({before, after}) => {
    t.is(before, '0.0.0')
    t.is(after, '0.0.1')
  })
})
