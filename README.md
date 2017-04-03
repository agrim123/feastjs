[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

[Express'](https://www.npmjs.com/package/express-mvc-generator) MVC application generator.

[![npm version](http://img.shields.io/npm/v/express-mvc-builder.svg)](https://npmjs.org/package/express-mvc-builder)
[![Downloads](http://img.shields.io/npm/dm/express-mvc-builder.svg)](https://npmjs.org/package/express-mvc-builder)

## Installation

```sh
$ npm install -g express-mvc-builder
```

## Quick Start

The quickest way to get started with express is to utilize the executable `express` to generate an application as shown below:

Create the app:

```bash
$ express myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/gulpfile.js
   create : myapp/app
   create : myapp/routes
   create : myapp/routes/routes.js
   create : myapp/bin
   create : myapp/bin/www
   create : myapp/app/assets
   create : myapp/app/assets/stylesheets
   create : myapp/app/assets/stylesheets/style.css
   create : myapp/app/assets/javascripts
   create : myapp/app/controllers
   create : myapp/app/controllers/index_controller.js
   create : myapp/app/models
   create : myapp/app/middlewares
   create : myapp/app/views
   create : myapp/app/views/index
   create : myapp/app/views/index/home.ejs
   create : myapp/app/views/error.ejs
   create : myapp/public
   create : myapp/public/js
   create : myapp/public/css
   create : myapp/public/images
   create : myapp/app/helpers

   install dependencies:
     $ cd myapp && npm install

   run the app:
     $ DEBUG=myapp:* npm start


```

Install dependencies:

```bash
$ npm install
```

Setup your assets:
```bash
$ gulp
```
Start your Express.js app at `http://localhost:3000/`:

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

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support (default)
        --git           add .gitignore
    -f, --force         force on non-empty directory


### To-Do

- [ ] To add sample login and signup functionality to make it more reusable
- [ ] Add support for more css engines less|stylus|compass|sass


## License

[MIT](LICENSE)

[downloads-url]: https://npmjs.org/package/express-mvc-builder
