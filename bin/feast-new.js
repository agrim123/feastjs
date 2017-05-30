var sortedObject = require('sorted-object')
var cF = require('../lib/common')

var MODE_0666 = parseInt('0666', 8)
var MODE_0755 = parseInt('0755', 8)

exports.createApplication = (program, name, path) => {
  var wait = 12
  console.log()
  function complete () {
    if (--wait) return
    var prompt = cF.launchedFromCmd() ? '>' : '$'

    console.log()
    console.log('   install dependencies:')
    console.log('     %s cd %s && npm install', prompt, path)
    console.log()
    console.log('   run the app:')

    if (cF.launchedFromCmd()) {
      console.log('     %s SET DEBUG=%s:* & npm start', prompt, name)
    } else {
      console.log('     %s DEBUG=%s:* npm start', prompt, name)
    }

    console.log()
  }

  // JavaScript
  var app = cF.loadTemplate('js/app.js')
  var www = cF.loadTemplate('js/www')

  // App name
  www.locals.name = name

  // App modules
  app.locals.modules = Object.create(null)
  app.locals.uses = []

  cF.mkdir(path, function () {
    cF.mkdir(path + '/app', function () {
      // Setup Our assets
      cF.mkdir(path + '/app/assets', function () {
        cF.mkdir(path + '/app/assets/javascripts', function () {
          cF.copyTemplate('js/script.js', path + '/app/assets/javascripts/script.js')
          complete()
        })
        cF.mkdir(path + '/app/assets/stylesheets', function () {
          cF.copyTemplate('css/style.css', path + '/app/assets/stylesheets/style.css')
          complete()
        })
      })
      // Setup controllers
      cF.mkdir(path + '/app/controllers', function () {
        cF.copyTemplate('js/controllers/index_controller.js', path + '/app/controllers/index_controller.js')
        complete()
      })
      // Setup models
      cF.mkdir(path + '/app/models')
      // Setup helpers
      cF.mkdir(path + '/app/helpers')
      // Setup views
      cF.mkdir(path + '/app/views', function () {
        cF.mkdir(path + '/app/views/index', function () {
          cF.copyTemplate('ejs/home.ejs', path + '/app/views/index/home.ejs')
          cF.copyTemplate('ejs/error.ejs', path + '/app/views/error.ejs')
          complete()
        })
        cF.mkdir(path + '/app/views/partials', function () {
          cF.copyTemplate('ejs/head.ejs', path + '/app/views/partials/head.ejs')
          cF.copyTemplate('ejs/footer.ejs', path + '/app/views/partials/footer.ejs')
          complete()
        })
      })
      // Setup middlewares
      cF.mkdir(path + '/app/middlewares')
      complete()
    })

    cF.mkdir(path + '/db', function () {
      cF.mkdir(path + '/db/migrations')
      cF.copyTemplate('js/setup.js', path + '/db/setup.js')
      cF.createFile(path + '/db/seed.js')
      complete()
    })

    cF.mkdir(path + '/public', function () {
      cF.mkdir(path + '/public/js')
      cF.mkdir(path + '/public/images')
      cF.mkdir(path + '/public/css')
      complete()
    })

    cF.mkdir(path + '/test', function () {
      cF.mkdir(path + '/test/controllers')
      cF.createFile(path + '/test/controllers/index_controller_test.js')
      cF.mkdir(path + '/test/helpers')
      cF.mkdir(path + '/test/models')
      complete()
    })

    cF.mkdir(path + '/routes', function () {
      cF.copyTemplate('js/routes/routes.js', path + '/routes/routes.js')
      complete()
    })

    // Template support
    switch (program.view) {
      default:
        app.locals.view = {
          engine: program.view
        }
        break
    }

    // env
    var env = 'NODE_ENV=dev\nDATABASE_URL=\nCOOKIE_SECRET=\nPORT='

    // package.json
    var pkg = {
      name: name,
      version: '0.0.0',
      private: true,
      scripts: {
        'start': 'node ./bin/www',
        'watch': 'nodemon ./bin/www',
        'db:seed': 'node ./db/seed.js',
        'db:setup': 'node ./db/setup.js',
        'migrations': 'node ./db/migrations/*.js',
        'prod:start': 'forever start --minUptime 1000 --spinSleepTime 1000 ./bin/www',
        'prod:stop': 'forever stop ./bin/www',
        'prod:restart': 'forever restart ./bin/www',
        'lint': 'eslint .',
        'test': 'mocha --reporter spec --bail --recursive test/'
      },
      dependencies: {
        'bcrypt': '^1.0.2',
        'bcrypt-nodejs': '0.0.3',
        'blueimp-file-upload': '^9.14.2',
        'body-parser': '^1.15.2',
        'chai': '^3.5.0',
        'common': '^0.2.5',
        'compression': '^1.6.2',
        'connect-flash': '^0.1.1',
        'connect-pg-simple': '^3.1.2',
        'cookie-parser': '^1.4.3',
        'debug': '~2.2.0',
        'dotenv': '^4.0.0',
        'ejs': '~2.5.2',
        'express': '~4.14.0',
        'express-session': '^1.14.2',
        'faker': '^4.1.0',
        'forever': '^0.15.3',
        'fs': '0.0.1-security',
        'method-override': '^2.3.7',
        'mocha': '^3.2.0',
        'morgan': '~1.7.0',
        'pg': '^6.1.2',
        'pg-native': '^1.10.0',
        'pg-promise': '^5.5.1',
        'rmdir': '^1.2.0',
        'serve-favicon': '~2.3.0'
      },
      devDependencies: {
        'async': '^2.3.0',
        'chai': '^3.5.0',
        'database-cleaner': '^1.2.0',
        'eslint': '^3.19.0',
        'eslint-config-standard': '^10.2.0',
        'eslint-plugin-import': '^2.2.0',
        'eslint-plugin-node': '^4.2.2',
        'eslint-plugin-promise': '^3.5.0',
        'eslint-plugin-standard': '^3.0.1',
        'gulp': '^3.9.1',
        'gulp-clean-css': '^3.0.4',
        'gulp-concat': '^2.6.1',
        'gulp-minify': '0.0.15',
        'gulp-rename': '^1.2.2',
        'gulp-size': '^2.1.0',
        'gulp-uglify': '^2.1.2',
        'nodemon': '^1.11.0',
        'jshint-stylish': '^2.2.1',
        'mocha': '^3.2.0',
        'nodemon': '^1.11.0',
        'supertest': '^3.0.0'
      }
    }

    switch (program.view) {
      case 'ejs':
        pkg.dependencies['ejs'] = '~2.5.6'
        break
    }

    // sort dependencies like npm(1)
    pkg.dependencies = sortedObject(pkg.dependencies)

    // write files
    cF.write(path + '/package.json', JSON.stringify(pkg, null, 2) + '\n')
    cF.write(path + '/.env', env)
    cF.write(path + '/app.js', app.render())
    cF.mkdir(path + '/bin', function () {
      cF.write(path + '/bin/www', www.render(), MODE_0755)
      complete()
    })

    if (program.git) {
      cF.copyTemplate('js/gitignore', path + '/.gitignore')
    }
    cF.copyTemplate('js/gulpfile.js', path + '/gulpfile.js')
    complete()
  })
}
