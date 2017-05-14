var ejs = require('ejs')
var fs = require('fs')
var path = require('path')
var touch = require('touch')
var mkdirp = require('mkdirp')

var _exit = process.exit
var MODE_0666 = parseInt('0666', 8)
var MODE_0755 = parseInt('0755', 8)

exports.createFile = (filePath) => {
  touch(filePath)
  console.log('   \x1b[34;1mcreate\x1b[0m : ' + filePath)
}

exports.deleteFile = (filePath) => {
  fs.unlink(filePath, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('   \x1b[31;1mremove\x1b[0m : ' + filePath)
  })
}

exports.deleteFolder = (folderPath) => {
  if( fs.existsSync(folderPath) ) {
    fs.readdirSync(folderPath).forEach(function(file, index){
      var curPath = folderPath + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        this.deleteFolder(curPath)
      } else { // delete file
        fs.unlink(curPath)
        console.log('   \x1b[31mdelete\x1b[0m : ' + curPath)
      }
    })
    fs.rmdirSync(folderPath)
  }
}

exports.checkProject = () =>{
  if (fs.existsSync('package.json')) {
    return 1
  } else {
    this.warning('Not a Feast Project!!')
    _exit
  }
}

exports.warning = (message) => {
  console.error()
  message.split('\n').forEach(function (line) {
    // '\x1b[31;1m <message> \x1b[0m'
    console.error('\x1b[31;1m  warning: \x1b[0m\x1b[31;1m%s', line + '\x1b[0m')
  })
  console.error()
}

exports.write = (path, str, mode) => {
  fs.writeFileSync(path, str, { mode: mode || MODE_0666 })
  console.log('   \x1b[34;1mcreate\x1b[0m : ' + path)
}

exports.mkdir = (path, fn) => {
  mkdirp(path, MODE_0755, function (err) {
    if (err) throw err
      console.log('   \x1b[34;1mcreate\x1b[0m : ' + path)
    fn && fn()
  })
}

exports.loadTemplate = (name) => {
  var contents = fs.readFileSync(path.join(__dirname, '..', 'templates', (name + '.ejs')), 'utf-8')
  var locals = Object.create(null)

  function render () {
    return ejs.render(contents, locals)
  }

  return {
    locals: locals,
    render: render
  }
}

exports.emptyDirectory = (path, fn) => {
  fs.readdir(path, function (err, files) {
    if (err && err.code !== 'ENOENT') throw err
      fn(!files || !files.length)
  })
}

exports.createAppName = (pathName) => {
  return path.basename(pathName)
  .replace(/[^A-Za-z0-9.()!~*'-]+/g, '-')
  .replace(/^[-_.]+|-+$/g, '')
  .toLowerCase()
}

exports.copyTemplate = (from, to) => {
  from = path.join(__dirname, '..', 'templates', from)
  this.write(to, fs.readFileSync(from, 'utf-8'))
}

exports.launchedFromCmd = () => {
  return process.platform === 'win32' &&
  process.env._ === undefined
}

exports.confirm = (msg, callback) => {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(msg, function (input) {
    rl.close()
    callback(/^y|yes|ok|true$/i.test(input))
  })
}

exports.renamedOption = (originalName, newName) => {
  return function (val) {
    warning(util.format("option `%s' has been renamed to `%s'", originalName, newName))
    return val
  }
}
