var path = require('path')
var fs = require('fs')
var replace = require('replace')
var touch = require('touch')

var cF = require('../common')

exports.generateController = (name, parentDir, controllerFilePath, listToBeGenerated) => {
  var data = ''
  if (listToBeGenerated) {
    listToBeGenerated.forEach((list) => {
      data += 'exports.' + list + ' = (req, res) => {\n  res.render(\'' + name + '/' + list + '\')\n}' + '\n'
    })
  } else {
    data = ''
  }
  if(!cF.checkIfExists(controllerFilePath)) {
    cF.write(controllerFilePath, data)
    if (listToBeGenerated) {
      var replaceRoutesText = ''
      listToBeGenerated.forEach((list) => {
        replaceRoutesText += "router.get('/" + name + "/" + list + "', " + name + "." + list + ")\n"
      })
      replaceRoutesText += '\nmodule.exports = router'
      var replaceIncludeText = 'var ' + name + ' = require(\'../app/controllers/' + name + '_controller\')\n' + 'var index = require(\'../app/controllers/index_controller\')'

      fs.readFile(parentDir + '/routes/routes.js', 'utf8', (err,data) => {
        if (err) {
          return console.log(err)
        }
        var result = data.replace(/^var index.*$/m, replaceIncludeText)
        fs.writeFile(parentDir + '/routes/routes.js', result, 'utf8', (err) => {
          if (err) return console.log(err)
        })
      })
      replace({
        regex: "module.exports = router",
        replacement: replaceRoutesText,
        paths: [parentDir + '/routes/routes.js'],
        recursive: true,
        silent: true,
      })
    }
  } else {
    console.log('   \x1b[34;1midentical\x1b[0m : ' + controllerFilePath)
  }
  listToBeGenerated.forEach((list) => {
    console.log('       \x1b[32;1mroute\x1b[0m : get \'' + name + '/' + list + '\'')
  })
  cF.invoke('test_unit')
  cF.createFile(parentDir + '/test/controllers/' + name + '_controller_test.js')
  cF.invoke('helper')
  cF.createFile(parentDir + '/app/helpers/' + name + '_helper.js')
  cF.invoke('js')
  cF.createFile(parentDir + '/app/assets/javascripts/' + name + '.js')
  cF.invoke('css')
  cF.createFile(parentDir + '/app/assets/stylesheets/' + name + '.css')
  cF.invoke('ejs')
  cF.mkdir(parentDir + '/app/views/' + name , () => {
    if (listToBeGenerated) {
      listToBeGenerated.forEach((list) => {
        touch(parentDir + '/app/views/' + name + '/' + list + '.ejs')
        cF.write(parentDir + '/app/views/' + name + '/' + list + '.ejs', list + ' View')
      })
    }
  })
}
