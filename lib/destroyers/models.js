var path = require('path')
var fs = require('fs')
var replace = require('replace')
var touch = require('touch')

var cF = require('../common')

exports.deleteModel = (name, parentDir, modelFilePath) => {
  cF.deleteFile(parentDir + '/app/models/' + name + '.js')
}
