var path = require('path')
var cF = require('../common')
var controller = require('./controller')
var model = require('./models')

exports.deleteCommand = (typeDelete, name) => {
  if(cF.checkProject()) {
    var parentDir = path.resolve(process.cwd(), '.')
    if (typeDelete === 'controller' || typeDelete ==='c') {
      var controllerFilePath = parentDir + '/app/controllers/' + name + '_controller.js'
      controller.deleteController(name, parentDir, controllerFilePath)
    } else if (typeDelete === 'model' || typeDelete === 'm') {
      var modelFilePath = parentDir + '/app/models/' + name + '.js'
      model.deleteModel(name, parentDir, modelFilePath)
    } else {
      cF.warning('Unknown generate command!!')
      program.outputHelp()
    }
  }
}
