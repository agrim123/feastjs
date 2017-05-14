var path = require('path')
var fs = require('fs')
var replace = require('replace')
var touch = require('touch')

var commonFunctions = require('../common')

exports.generateController = (name, parentDir, controllerFilePath, listToBeGenerated) => {
  var data = ''
  if (listToBeGenerated) {
    listToBeGenerated.forEach(function (list) {
      data += 'exports.' + list + ' = function(req, res) {\nres.render(\'' + name + '/' + list + '\')\n}' + '\n'
    })
  } else {
    data = ''
  }
  commonFunctions.write(controllerFilePath, data)
  listToBeGenerated.forEach(function (list) {
    console.log('    \x1b[32;1mroute\x1b[0m : get \'' + name + '/' + list + '\'')
  })
  console.log('   \x1b[37;1minvoke\x1b[0m   test_unit')
  commonFunctions.createFile(parentDir + '/test/controllers/' + name + '_controller_test.js')
  console.log('   \x1b[37;1minvoke\x1b[0m   helper')
  commonFunctions.createFile(parentDir + '/app/helpers/' + name + '_helper.js')
  console.log('   \x1b[37;1minvoke\x1b[0m   js')
  commonFunctions.createFile(parentDir + '/app/assets/javascripts/' + name + '.js')
  console.log('   \x1b[37;1minvoke\x1b[0m   css')
  commonFunctions.createFile(parentDir + '/app/assets/stylesheets/' + name + '.css')
  console.log('   \x1b[37;1minvoke\x1b[0m   ejs')
  commonFunctions.mkdir(parentDir + '/app/views/' + name , function () {
    if (listToBeGenerated) {
      listToBeGenerated.forEach(function (list) {
        touch(parentDir + '/app/views/' + name + '/' + list + '.ejs')
        commonFunctions.write(parentDir + '/app/views/' + name + '/' + list + '.ejs', list + ' View')
      })
    }
  })
  if (listToBeGenerated) {
    var replaceRoutesText = ''
    listToBeGenerated.forEach(function (list) {
      replaceRoutesText += "router.get('/" + name + "/" + list + "', " + name + "." + list + ")\n"
    })
    replaceRoutesText += '\nmodule.exports = router'
    var replaceIncludeText = 'var ' + name + ' = require(\'../app/controllers/' + name + '_controller\')\n' + 'var index = require(\'../app/controllers/index_controller\')'

    fs.readFile(parentDir + '/routes/routes.js', 'utf8', function (err,data) {
      if (err) {
        return console.log(err)
      }
      var result = data.replace(/^var index.*$/m, replaceIncludeText)

      fs.writeFile(parentDir + '/routes/routes.js', result, 'utf8', function (err) {
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
}
