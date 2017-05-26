var path = require('path')
var fs = require('fs')
var replace = require('replace')
var touch = require('touch')

var commonFunctions = require('../common')

exports.deleteController = (name, parentDir, controllerFilePath) => {
  commonFunctions.deleteFile(parentDir + '/app/controllers/' + name + '_controller.js')
  commonFunctions.deleteFile(parentDir + '/app/helpers/' + name + '_helper.js')
  commonFunctions.deleteFile(parentDir + '/app/assets/javascripts/' + name + '.js')
  commonFunctions.deleteFile(parentDir + '/app/assets/stylesheets/' + name + '.css')
  commonFunctions.deleteFile(parentDir + '/test/controllers/' + name + '_controller_test.js')
  commonFunctions.deleteFolder(parentDir + '/app/views/' + name)
}
