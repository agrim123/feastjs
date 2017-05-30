var path = require('path')
var fs = require('fs')
var replace = require('replace')
var touch = require('touch')

var cF = require('../common')

exports.deleteController = (name, parentDir, controllerFilePath) => {
  cF.deleteFile(parentDir + '/app/controllers/' + name + '_controller.js')
  cF.deleteFile(parentDir + '/app/helpers/' + name + '_helper.js')
  cF.deleteFile(parentDir + '/app/assets/javascripts/' + name + '.js')
  cF.deleteFile(parentDir + '/app/assets/stylesheets/' + name + '.css')
  cF.deleteFile(parentDir + '/test/controllers/' + name + '_controller_test.js')
  cF.deleteFolder(parentDir + '/app/views/' + name)
}
