'use strict'

const fs = require('fs')

let agentBasePath
let agentBaseBackupPath
try {
  agentBasePath = require.resolve('agent-base')
  agentBaseBackupPath = `${agentBasePath}.backup`
} catch (e) {
}

let gracefulFsPath
let gracefulFsBackupPath
try {
  gracefulFsPath = require.resolve('graceful-fs')
  gracefulFsBackupPath = `${gracefulFsPath}.backup`
} catch (e) {
}

module.exports = {
  apply,
  restore
}

function apply() {
  if (agentBasePath) {
    fs.copyFileSync(agentBasePath, agentBaseBackupPath)
    const agentBaseScript = fs.readFileSync(agentBasePath, 'utf8')
    const modifiedAgentBaseScript = agentBaseScript.replace("require('./patch-core');", '')
    fs.writeFileSync(agentBasePath, modifiedAgentBaseScript)
  }

  if (gracefulFsPath) {
    fs.copyFileSync(gracefulFsPath, gracefulFsBackupPath)
    const gracefulFsScript = fs.readFileSync(gracefulFsPath, 'utf8')
    const modifiedGracefulFsScript = gracefulFsScript
      .replace(` = (function (fs$close) { return function (fd, cb) {
  return fs$close.call(fs, fd, function (err) {
    if (!err)
      retry()

    if (typeof cb === 'function')
      cb.apply(this, arguments)
  })
}})(fs.close)`, '')
      .replace(` = (function (fs$closeSync) { return function (fd) {
  // Note that graceful-fs also retries when fs.closeSync() fails.
  // Looks like a bug to me, although it's probably a harmless one.
  var rval = fs$closeSync.apply(fs, arguments)
  retry()
  return rval
}})(fs.closeSync)`, '')
    fs.writeFileSync(gracefulFsPath, modifiedGracefulFsScript)
  }
}

function restore() {
  agentBasePath && fs.copyFileSync(agentBaseBackupPath, agentBasePath)
  gracefulFsPath && fs.copyFileSync(gracefulFsBackupPath, gracefulFsPath)
}
