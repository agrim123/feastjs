var commonFunctions = require('../common')

exports.generateModel = (name, parentDir, modelFilePath, listToBeGenerated) => {
  commonFunctions.createFile(modelFilePath)
  commonFunctions.createFile(parentDir + '/test/models/' + name + '_test.js')
  var migrations = commonFunctions.loadTemplate('js/migrations.js')
  var store = {
    'string': 'varchar(100) NOT NULL',
    'number': 'integer NOT NULL',
    'bool': 'boolean NOT NULL',
  }
  var queryData = ''
  listToBeGenerated.forEach(function (list) {
    queryData += list.split(':')[0] + ' ' + store[list.split(':')[1]] + ' ,'
  })
  var query = 'CREATE TABLE IF NOT EXISTS ' + name + '(id SERIAL PRIMARY KEY, ' + queryData + ' created_on timestamp default current_timestamp)'
  migrations.locals.query = query
  commonFunctions.write(parentDir + '/db/migrations/' + Date.now() + '_create_' + name + '.js', migrations.render())
}
