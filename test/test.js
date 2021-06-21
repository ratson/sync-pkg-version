'use strict'

const fse = require('fs-extra')
const tempWrite = require('temp-write')
const path = require('path')
const { updateCordovaPluginVersion } = require('..')

test('updateCordovaPluginVersion', async () => {
  const pluginXml = path.join(__dirname, 'fixtures/plugin.xml')
  const filename = await tempWrite(await fse.readFile(pluginXml, 'utf8'))
  const { before, after } = await updateCordovaPluginVersion(filename, '0.0.1')
  expect(before).toBe('0.0.0')
  expect(after).toBe('0.0.1')
})
