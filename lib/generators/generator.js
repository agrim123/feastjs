var path = require('path')
var cF = require('../common')
var controller = require('./controller')
var model = require('./models')

exports.generateCommand = (typeGenerate, name, listToBeGenerated) => {
  if(cF.checkProject()) {
    var parentDir = path.resolve(process.cwd(), '.')
    if (typeGenerate === 'controller' || typeGenerate ==='c') {
      var controllerFilePath = parentDir + '/app/controllers/' + name + '_controller.js'
      controller.generateController(name, parentDir, controllerFilePath, listToBeGenerated)
    } else if (typeGenerate === 'model' || typeGenerate === 'm') {
      var modelFilePath = parentDir + '/app/models/' + name + '.js'
      model.generateModel(name, parentDir, modelFilePath, listToBeGenerated)
    } else {
      cF.warning('Unknown generate command!!')
      // display help
    }
  }
}
