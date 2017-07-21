'use strict'

const fs = require('fs')

function updateCordovaPluginVersion(filename, version) {
  const versionRE = /<plugin [\s\S]*? version=\s*["']?([^\s'"]+)/m
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      const match = versionRE.exec(data)
      if (!match) {
        return reject(new Error(`cannot find version property in ${filename}`))
      }
      if (match[1] === version) {
        return resolve({
          filename,
          before: match[1],
          after: version,
        })
      }
      data =
        data.substring(0, match.index + match[0].length - match[1].length) +
        version +
        data.substring(match.index + match[0].length)
      fs.writeFile(filename, data, 'utf8', err => {
        if (err) {
          return reject(err)
        }
        return resolve({
          filename,
          before: match[1],
          after: version,
        })
      })
    })
  })
}

module.exports = updateCordovaPluginVersion

module.exports.updateCordovaPluginVersion = updateCordovaPluginVersion
