'use strict'

const fse = require('fs-extra')

async function updateCordovaPluginVersion(filename, version) {
  const versionRE = /<plugin [\s\S]*? version=\s*["']?([^\s'"]+)/m
  const data = await fse.readFile(filename, 'utf8')
  const match = versionRE.exec(data)
  if (!match) {
    throw new Error(`cannot find version property in ${filename}`)
  }
  if (match[1] === version) {
    return {
      filename,
      before: match[1],
      after: version,
    }
  }
  const content = [
    data.substring(0, match.index + match[0].length - match[1].length),
    version,
    data.substring(match.index + match[0].length),
  ].join('')
  await fse.writeFile(filename, content)
  return {
    filename,
    before: match[1],
    after: version,
  }
}

module.exports = updateCordovaPluginVersion

module.exports.updateCordovaPluginVersion = updateCordovaPluginVersion
