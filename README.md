[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

[Express](https://www.npmjs.com/package/express-mvc-generator) MVC application generator.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## Installation

```sh
$ npm install -g express-mvc-builder
```

## Quick Start

The quickest way to get started with express is to utilize the executable `express-mvc(1)` to generate an application as shown below:

Create the app:

```bash
$ express-mvc myapp && cd myapp
```

Install dependencies:

```bash
$ npm install
```

Start your Express.js app at `http://localhost:3000/`:

```bash
$ npm run watch
```

## Command Line Options

This generator can also be further configured with the following command line flags.

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory

## License

[MIT](LICENSE)

[downloads-url]: https://npmjs.org/package/express-mvc-builder
