
var assert = require('assert')
var exec = require('child_process').exec
var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')
var request = require('supertest')
var rimraf = require('rimraf')
var spawn = require('child_process').spawn
var validateNpmName = require('validate-npm-package-name')

var PKG_PATH = path.resolve(__dirname, '..', 'package.json')
var BIN_PATH = path.resolve(path.dirname(PKG_PATH), require(PKG_PATH).bin.express)
var TEMP_DIR = path.resolve(__dirname, '..', 'temp', String(process.pid + Math.random()))

describe('express-mvc', function () {
  before(function (done) {
    this.timeout(30000)
    cleanup(done)
  })

  after(function (done) {
    this.timeout(30000)
    cleanup(done)
  })

  describe('(no args)', function () {
    var ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app', function (done) {
      runRaw(ctx.dir, [], function (err, code, stdout, stderr) {
        if (err) return done(err)
          ctx.files = parseCreatedFiles(stdout, ctx.dir)
        ctx.stderr = stderr
        ctx.stdout = stdout
        assert.equal(ctx.files.length, 31)
        done()
      })
    })

    it('should have basic files', function () {
      assert.notEqual(ctx.files.indexOf('bin/www'), -1)
      assert.notEqual(ctx.files.indexOf('app.js'), -1)
      assert.notEqual(ctx.files.indexOf('package.json'), -1)

    })
/*
    it('should respond with stylesheet', function (done) {
      var file = path.resolve(ctx.dir, 'app.js')
      var app = require(file)
      request(app)
        .get('/app/assets/stylesheets/style.css')
        .expect(200, /sans-serif/, done)
    })*/

    it('should have a package.json file', function () {
      var file = path.resolve(ctx.dir, 'package.json')
      var contents = fs.readFileSync(file, 'utf8')
      assert.equal(contents, '{\n' +
        '  "name": "express-mvc-(no-args)",\n' +
        '  "version": "0.0.0",\n' +
        '  "private": true,\n' +
        '  "scripts": {\n' +
        '    "start": "node ./bin/www",\n' +
        '    "watch": "nodemon ./bin/www"\n' +
        '  },\n' +
        '  "dependencies": {\n' +
        '    "body-parser": "~1.17.1",\n' +
        '    "cookie-parser": "~1.4.3",\n' +
        '    "debug": "~2.6.3",\n' +
        '    "ejs": "~2.5.6",\n' +
        '    "express": "~4.15.2",\n' +
        '    "morgan": "~1.8.1",\n' +
        '    "serve-favicon": "~2.4.2"\n' +
        '  },\n' +
        '  "devDependencies": {\n' +
        '    "gulp": "^3.9.1",\n' +
        '    "gulp-clean-css": "^3.0.4",\n' +
        '    "gulp-concat": "^2.6.1",\n' +
        '    "gulp-minify": "0.0.15",\n' +
        '    "gulp-rename": "^1.2.2",\n' +
        '    "gulp-size": "^2.1.0",\n' +
        '    "gulp-uglify": "^2.1.2",\n' +
        '    "nodemon": "^1.11.0"\n' +
        '  }\n' +
        '}\n')
    })

   it('should have installable dependencies', function (done) {
      this.timeout(300000)
      setTimeout(done, 300000)
      npmInstall(ctx.dir, done)
    });

    it('should export an express app from app.js', function () {
      var file = path.resolve(ctx.dir, 'app.js')
      var app = require(file)
      assert.equal(typeof app, 'function')
      assert.equal(typeof app.handle, 'function')
    })

    it('should respond to HTTP request', function (done) {
      var file = path.resolve(ctx.dir, 'app.js')
      var app = require(file)

      request(app)
      .get('/')
      .expect(200, /<title>Express MVC App<\/title>/, done)
    })

    it('should generate a 404', function (done) {
      var file = path.resolve(ctx.dir, 'app.js')
      var app = require(file)

      request(app)
      .get('/does_not_exist')
      .expect(404, /<h1>Not Found<\/h1>/, done)
    })

    describe('when directory contains spaces', function () {
      var ctx = setupTestEnvironment('foo bar (BAZ!)')

      it('should create basic app', function (done) {
        run(ctx.dir, [], function (err, output) {
          if (err) return done(err)
            assert.equal(parseCreatedFiles(output, ctx.dir).length, 31)
          done()
        })
      })

      it('should have a valid npm package name', function () {
        var file = path.resolve(ctx.dir, 'package.json')
        var contents = fs.readFileSync(file, 'utf8')
        var name = JSON.parse(contents).name
        assert.ok(validateNpmName(name).validForNewPackages)
        assert.equal(name, 'foo-bar-(baz!)')
      })
    })

    describe('when directory is not a valid name', function () {
      var ctx = setupTestEnvironment('_')

      it('should create basic app', function (done) {
        run(ctx.dir, [], function (err, output) {
          if (err) return done(err)
            assert.equal(parseCreatedFiles(output, ctx.dir).length, 31)
          done()
        })
      })

      it('should default to name "hello-world"', function () {
        var file = path.resolve(ctx.dir, 'package.json')
        var contents = fs.readFileSync(file, 'utf8')
        var name = JSON.parse(contents).name
        assert.ok(validateNpmName(name).validForNewPackages)
        assert.equal(name, 'hello-world')
      })
    })
  })

  describe('(unknown args)', function () {
    var ctx = setupTestEnvironment(this.fullTitle())

    it('should exit with code 1', function (done) {
      runRaw(ctx.dir, ['--foo'], function (err, code, stdout, stderr) {
        if (err) return done(err)
          assert.strictEqual(code, 1)
        done()
      })
    })

    it('should print usage', function (done) {
      runRaw(ctx.dir, ['--foo'], function (err, code, stdout, stderr) {
        if (err) return done(err)
          assert.ok(/Usage: express/.test(stdout))
        assert.ok(/--help/.test(stdout))
        assert.ok(/--version/.test(stdout))
        assert.ok(/error: unknown option/.test(stderr))
        done()
      })
    })

    it('should print unknown option', function (done) {
      runRaw(ctx.dir, ['--foo'], function (err, code, stdout, stderr) {
        if (err) return done(err)
          assert.ok(/error: unknown option/.test(stderr))
        done()
      })
    })
  })
describe('--ejs', function () {
  var ctx = setupTestEnvironment(this.fullTitle())

  it('should create basic app with ejs templates', function (done) {
    run(ctx.dir, ['--ejs'], function (err, stdout) {
      if (err) return done(err)
        ctx.files = parseCreatedFiles(stdout, ctx.dir)
      assert.equal(ctx.files.length, 31, 'should have 16 files')
      done()
    })
  })

  it('should have basic files', function () {
    assert.notEqual(ctx.files.indexOf('bin/www'), -1, 'should have bin/www file')
    assert.notEqual(ctx.files.indexOf('app.js'), -1, 'should have app.js file')
    assert.notEqual(ctx.files.indexOf('package.json'), -1, 'should have package.json file')
  })

  it('should have ejs templates', function () {
    assert.notEqual(ctx.files.indexOf('app/views/error.ejs'), -1, 'should have app/views/error.ejs file')
    assert.notEqual(ctx.files.indexOf('app/views/index/home.ejs'), -1, 'should have app/views/index/home.ejs file')
    assert.notEqual(ctx.files.indexOf('app/views/partials/head.ejs'), -1, 'should have app/views/partials/head.ejs file')
    assert.notEqual(ctx.files.indexOf('app/views/partials/footer.ejs'), -1, 'should have app/views/partials/footer.ejs file')
  })
})

describe('--git', function () {
  var ctx = setupTestEnvironment(this.fullTitle())

  it('should create basic app with git files', function (done) {
    run(ctx.dir, ['--git'], function (err, stdout) {
      if (err) return done(err)
        ctx.files = parseCreatedFiles(stdout, ctx.dir)
      assert.equal(ctx.files.length, 32, 'should have 18 files')
      done()
    })
  })

  it('should have basic files', function () {
    assert.notEqual(ctx.files.indexOf('bin/www'), -1, 'should have bin/www file')
    assert.notEqual(ctx.files.indexOf('app.js'), -1, 'should have app.js file')
    assert.notEqual(ctx.files.indexOf('package.json'), -1, 'should have package.json file')
  })

  it('should have .gitignore', function () {
    assert.notEqual(ctx.files.indexOf('.gitignore'), -1, 'should have .gitignore file')
  })
})

describe('-h', function () {
  var ctx = setupTestEnvironment(this.fullTitle())

  it('should print usage', function (done) {
    run(ctx.dir, ['-h'], function (err, stdout) {
      if (err) return done(err)
        var files = parseCreatedFiles(stdout, ctx.dir)
      assert.equal(files.length, 0)
      assert.ok(/Usage: express/.test(stdout))
      assert.ok(/--help/.test(stdout))
      assert.ok(/--version/.test(stdout))
      done()
    })
  })
})

describe('--help', function () {
  var ctx = setupTestEnvironment(this.fullTitle())

  it('should print usage', function (done) {
    run(ctx.dir, ['--help'], function (err, stdout) {
      if (err) return done(err)
        var files = parseCreatedFiles(stdout, ctx.dir)
      assert.equal(files.length, 0)
      assert.ok(/Usage: express/.test(stdout))
      assert.ok(/--help/.test(stdout))
      assert.ok(/--version/.test(stdout))
      done()
    })
  })
})

describe('--view <engine>', function () {
  describe('(no engine)', function () {
    var ctx = setupTestEnvironment(this.fullTitle())

    it('should exit with code 1', function (done) {
      runRaw(ctx.dir, ['--view'], function (err, code, stdout, stderr) {
        if (err) return done(err)
          assert.strictEqual(code, 1)
        done()
      })
    })

    it('should print usage', function (done) {
      runRaw(ctx.dir, ['--view'], function (err, code, stdout) {
        if (err) return done(err)
          assert.ok(/Usage: express/.test(stdout))
        assert.ok(/--help/.test(stdout))
        assert.ok(/--version/.test(stdout))
        done()
      })
    })
  })
})
})

function cleanup (dir, callback) {
  if (typeof dir === 'function') {
    callback = dir
    dir = TEMP_DIR
  }

  rimraf(dir, function (err) {
    callback(err)
  })
}

function childEnvironment () {
  var env = Object.create(null)

  // copy the environment except for npm veriables
  for (var key in process.env) {
    if (key.substr(0, 4) !== 'npm_') {
      env[key] = process.env[key]
    }
  }

  return env
}

function npmInstall (dir, callback) {
  var env = childEnvironment()

  exec('npm install', {cwd: dir, env: env}, function (err, stderr) {
    if (err) {
      err.message += stderr
      callback(err)
      return
    }

    callback()
  })
}

function parseCreatedFiles (output, dir) {
  var files = []
  var lines = output.split(/[\r\n]+/)
  var match

  for (var i = 0; i < lines.length; i++) {
    if ((match = /create.*?: (.*)$/.exec(lines[i]))) {
      var file = match[1]

      if (dir) {
        file = path.resolve(dir, file)
        file = path.relative(dir, file)
      }

      file = file.replace(/\\/g, '/')
      files.push(file)
    }
  }

  return files
}

function run (dir, args, callback) {
  runRaw(dir, args, function (err, code, stdout, stderr) {
    if (err) {
      return callback(err)
    }

    process.stderr.write(stripWarnings(stderr))

    try {
      assert.equal(stripWarnings(stderr), '')
      assert.strictEqual(code, 0)
    } catch (e) {
      return callback(e)
    }

    callback(null, stripColors(stdout))
  })
}

function runRaw (dir, args, callback) {
  var argv = [BIN_PATH].concat(args)
  var exec = process.argv[0]
  var stderr = ''
  var stdout = ''

  var child = spawn(exec, argv, {
    cwd: dir
  })

  child.stdout.setEncoding('utf8')
  child.stdout.on('data', function ondata (str) {
    stdout += str
  })
  child.stderr.setEncoding('utf8')
  child.stderr.on('data', function ondata (str) {
    stderr += str
  })

  child.on('close', onclose)
  child.on('error', callback)

  function onclose (code) {
    callback(null, code, stdout, stderr)
  }
}

function setupTestEnvironment (name) {
  var ctx = {}

  before('create environment', function (done) {
    ctx.dir = path.join(TEMP_DIR, name.replace(/[<>]/g, ''))
    mkdirp(ctx.dir, done)
  })

  after('cleanup environment', function (done) {
    this.timeout(30000)
    cleanup(ctx.dir, done)
  })

  return ctx
}

function stripColors (str) {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\x1b\[(\d+)m/g, '_color_$1_')
}

function stripWarnings (str) {
  return str.replace(/\n(?:\x20{2}warning: [^\n]+\n)+\n/g, '')
}
