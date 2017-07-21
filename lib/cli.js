#!/usr/bin/env node
'use strict'

const execa = require('execa')
const meow = require('meow')
const readPkg = require('read-pkg')

const { updateCordovaPluginVersion } = require('.')

const cli = meow(
  `
Usage

  $ sync-package-version

Options

  --cordova-plugin           Update version in plugin.xml

Examples

  $ sync-package-version --cordova-plugin
`,
  {
    boolean: ['cordova-plugin'],
  },
)

const pkgVersion = readPkg.sync().version

if (cli.flags.cordovaPlugin) {
  updateCordovaPluginVersion(
    'plugin.xml',
    pkgVersion,
  ).then(({ filename, before, after }) => {
    if (before === after) {
      console.log(`${filename}\t${after}`)
    } else {
      console.log(`${filename}\t${before} -> ${after}`)
      return execa('git', ['add', filename])
    }
    return null
  })
}
