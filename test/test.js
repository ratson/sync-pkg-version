import fs from 'fs'

import tempWrite from 'temp-write'
import test from 'ava'

import { updateCordovaPluginVersion } from '..'

test(async t => {
  const pluginXml = `${__dirname}/fixtures/plugin.xml`
  const filename = await tempWrite(fs.readFileSync(pluginXml, 'utf8'))
  const { before, after } = await updateCordovaPluginVersion(filename, '0.0.1')
  t.is(before, '0.0.0')
  t.is(after, '0.0.1')
})
