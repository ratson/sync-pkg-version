#!/usr/bin/env node
import execa from 'execa'
import meow from 'meow'
import readPkg from 'read-pkg'

import {updateCordovaPluginVersion} from '.'

const cli = meow(`
Usage

  $ sync-package-version

Options

  --cordova-plugin           Update version in plugin.xml

Examples

  $ sync-package-version --cordova-plugin
`, {
  boolean: [
    'cordova-plugin',
  ],
})

const pkgVersion = readPkg.sync().version

if (cli.flags.cordovaPlugin) {
  updateCordovaPluginVersion('plugin.xml', pkgVersion).then(({filename, before, after}) => {
    if (before === after) {
      console.log(`${filename}\t${after}`)
    } else {
      console.log(`${filename}\t${before} -> ${after}`)
      return execa('git', ['add', filename])
    }
    return null
  })
}
