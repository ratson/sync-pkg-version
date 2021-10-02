#!/usr/bin/env node
import execa from 'execa'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import readPkg from 'read-pkg'
import { updateCordovaPluginVersion } from './index.js'

async function main() {
  const argv = yargs(hideBin(process.argv)).option('cordova-plugin', {
    alias: 'C',
    type: 'boolean',
    description: 'Update version in plugin.xml',
  }).argv

  const { version: pkgVersion } = await readPkg()

  if (argv['cordova-plugin']) {
    await updateCordovaPluginVersion('plugin.xml', pkgVersion).then(
      ({ filename, before, after }) => {
        if (before === after) {
          console.log(`${filename}\t${after}`)
        } else {
          console.log(`${filename}\t${before} -> ${after}`)
          return execa('git', ['add', filename])
        }
      }
    )
  }
}

main().catch(console.error)
