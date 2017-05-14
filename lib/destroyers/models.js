var path = require('path')
var fs = require('fs')
var replace = require('replace')
var touch = require('touch')

var commonFunctions = require('../common')

exports.deleteModel = (name, parentDir, modelFilePath) => {
  commonFunctions.deleteFile(parentDir + '/app/models/' + name + '.js')
}
