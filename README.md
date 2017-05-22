# FeastJS

[![Build Status](https://travis-ci.org/agrim123/feastjs.svg?branch=master)](https://travis-ci.org/agrim123/feastjs)
[![npm version](http://img.shields.io/npm/v/feastjs.svg)](https://npmjs.org/package/feastjs)
[![Downloads](http://img.shields.io/npm/dm/feastjs.svg)](https://npmjs.org/package/feastjs)

## Installation

```sh
$ npm install -g feastjs
```

## Quick Start

The quickest way to get started with feastjs is to utilize the executable `feast` to generate an application as shown below:

Create the app:

```bash
$ feast new myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/gulpfile.js
   create : myapp/app
   create : myapp/app/assets
   create : myapp/app/assets/stylesheets
   create : myapp/app/assets/stylesheets/style.css
   create : myapp/app/assets/javascripts
   create : myapp/app/controllers
   create : myapp/app/controllers/index_controller.js
   create : myapp/app/helpers
   create : myapp/app/models
   create : myapp/app/middlewares
   create : myapp/app/views
   create : myapp/app/views/error.ejs
   create : myapp/app/views/index
   create : myapp/app/views/index/home.ejs
   create : myapp/bin
   create : myapp/bin/www
   create : myapp/public
   create : myapp/public/css
   create : myapp/public/js
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/routes.js

   install dependencies:
     $ cd myapp && npm install

   run the app:
     $ DEBUG=myapp:* npm run watch


```

Install dependencies:

```bash
$ npm install
```

Setup your assets:
```bash
$ gulp
```
Start your app at `http://localhost:3000/`:

```bash
$ npm start
```

To watch over file changes(hugely reduces pain of restarting server) :

```bash
$ npm run watch
```


## File Structure

```bash
myapp
|
|____app
|      |
|      |____assets
|      |     |____javascripts
|      |     |____stylesheets
|      |
|      |____controllers
|      |    |____home.js
|      |
|      |____models
|      |     |___home.js
|      |
|      |____helpers
|      |
|      |____middlewares
|      |
|      |____views
|            |____index
|            |    |____home.ejs
|            |____error.ejs
|
|_____routes
|     |___routes.js
|
|____node_modules
|
|____public
|    |____css
|    |
|    |____js
|    |
|    |____img
|
|_____app.js
|
|_____gulpfile.js
|
|_____package.json

```
## Command Line Options

This generator can also be further configured with the following command line flags.
```bash
  Usage: feast [options] [command]


  Commands:

    help [command]
    new <name>
    generate|g <typeGenerate> <name> [listToBeGenerated...]
    delete|d <typeDelete> <name>
    *

  Options:

    -h, --help     output usage information
    -v, --version  output the version number
        --git      add gitignore
```

### Generate Controllers

```bash
$ feast generate controller random index create

   create : myapp/app/controllers/random_controller.js
   create : myapp/app/views/random
   create : myapp/app/views/random/index.ejs
   create : myapp/app/views/random/create.ejs

```
Navigate to `/random/index`

### Generate Models

```bash
$ feast generate model random title:string plate:number

   create : myapp/app/models/random.js
   create : myapp/test/models/random_test.js
   create : myapp/db/migrations/[timestamp]_create_random.js

```

### To-Do

- [ ] To add sample login and signup functionality to make it more reusable
- [ ] Add support for more css engines less|stylus|compass|sass
- [ ] Add support for more templating engines


## License

[MIT](LICENSE)

[downloads-url]: https://npmjs.org/package/feastjs
