/* demo command use this file as a base for new ones */
'use strict'
const cmdName = 'testCmd'
const cmdMsg = 'command to test new features, expect magic to happend'
const debug = require('debug')('gorhCli:' + cmdName)
// const path = require('path')
// const fs = require('fs-extra')
// const _ = require('lodash')

const chalk = require('chalk')
const blue = chalk.cyan
// const red = chalk.red
// const green = chalk.green
// const mag = chalk.magenta

const utils = require('../utils')
const getDirsInfo = utils.getDirsInfo

function Cmd (vorpal, cliConf) {
  // const rcPath = cliConf.rcPath
  const conf = cliConf.initConf
  // const rcFile = cliConf.rcFile
  const cliDir = cliConf.cliDir
  // const coursesPath = path.join(cliDir, conf.coursePath)
  // const buildPath = path.join(cliDir, conf.buildsPath)

  return vorpal
    .command('test', cmdMsg)
    .alias('t')
    .option('-l, --list', 'select a list of dirs')
    .action(function (args, cb) {
      const self = this
      debug(blue(cmdName, 'start'))
      // const opt = {
      //   prompt: false
      // }

      const dirsInfos = getDirsInfo(conf, cliDir)
      if (getDirsInfo === false) {
        self.log('invalid config')
        return cb()
      }

      debug(blue('dirlistInfos'), dirsInfos)

      // TODO treat list case
      if (args.options.list === true) {
        debug(blue('list option'), args.options)
        self.prompt({
          type: 'checkbox',
          name: 'chosenList',
          message: 'select the dirs you want to build',
          choices: dirsInfos.fList.existingArr
        }, function (result) {
          dirsInfos.fList.existingArr = result.chosenList
          debug(result.chosenList)
          return cb()
        })
      }
      cb()
    })
}

module.exports = {Cmd}