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
      create : myapp/.env
      create : myapp/app.js
      create : myapp/gulpfile.js
      create : myapp/app
      create : myapp/db
      create : myapp/db/setup.js
      create : myapp/db/seed.js
      create : myapp/public
      create : myapp/public/js
      create : myapp/public/images
      create : myapp/public/css
      create : myapp/routes
      create : myapp/routes/routes.js
      create : myapp/bin
      create : myapp/bin/www
      create : myapp/app/assets
      create : myapp/app/controllers
      create : myapp/app/controllers/index_controller.js
      create : myapp/app/models
      create : myapp/app/helpers
      create : myapp/app/views
      create : myapp/app/middlewares
      create : myapp/db/migrations
      create : myapp/test/controllers
      create : myapp/test/helpers
      create : myapp/test/models
      create : myapp/app/assets/javascripts
      create : myapp/app/assets/javascripts/script.js
      create : myapp/app/assets/stylesheets
      create : myapp/app/assets/stylesheets/style.css
      create : myapp/app/views/index
      create : myapp/app/views/index/home.ejs
      create : myapp/app/views/error.ejs
      create : myapp/app/views/partials
      create : myapp/app/views/partials/head.ejs
      create : myapp/app/views/partials/footer.ejs
      create : myapp/test
      create : myapp/test/controllers/index_controller_test.js

   install dependencies:
     $ cd myapp && npm install

   run the app:
     $ DEBUG=myapp:* npm run watch


```

Install dependencies:

```bash
$ npm install
```
OR use [yarn](https://yarnpkg.com/en/)
```bash
$ yarn install
```

Setup your assets:
```bash
$ gulp
```

Currently it supports only `PostgreSQL`
Update `.env` file
Run

```
$ npm run db:setup
```

Start your app at `http://localhost:3000/`:

```bash
$ npm start
```

To watch over file changes (hugely reduces pain of restarting server) :

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
$ feast generate controller static_pages index home

    create : /home/hitman/myapp/app/controllers/static_pages_controller.js
     route : get 'static_pages/home'
     route : get 'static_pages/index'
    invoke   test_unit
    create : /home/hitman/myapp/test/controllers/static_pages_controller_test.js
    invoke   helper
    create : /home/hitman/myapp/app/helpers/static_pages_helper.js
    invoke   js
    create : /home/hitman/myapp/app/assets/javascripts/static_pages.js
    invoke   css
    create : /home/hitman/myapp/app/assets/stylesheets/static_pages.css
    invoke   ejs
    create : /home/hitman/myapp/app/views/static_pages
    create : /home/hitman/myapp/app/views/static_pages/home.ejs
    create : /home/hitman/myapp/app/views/static_pages/index.ejs


```
Navigate to `/static_pages/index`

### Generate Models

```bash
$ feast generate model random title:string plate:number

   create : myapp/app/models/random.js
   create : myapp/test/models/random_test.js
   create : myapp/db/migrations/[timestamp]_create_random.js

```

Run migrations (this feature is still under dev)
```bash
$ npm run migrations
```

### To-Do

- [ ] To add sample login and signup functionality
- [ ] Add support for more css engines less|stylus|compass|sass
- [ ] Add support for more templating engines
- [ ] Add tests

## License

[MIT](LICENSE)

[downloads-url]: https://npmjs.org/package/feastjs
