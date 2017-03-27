# Frontend Build Systems

## basic project structure
- app
    - assets
        - index.html
    - client
        - app.ts
    - server
        - main.ts
- dist
    - server
        - main.js
    - wwwroot
        - app.js
        - vendor.js
        - styles.css
        - index.html

## setup 
- initial project
- presentation
- version control
- build task overview
    - serve
    - compile
    - lint
    - test
    - watch
    - concatenate
    - minify/uglify

## prereqs
- Visual Studio Code <https://code.visualstudio.com/>
- Node version manager <https://github.com/coreybutler/nvm-windows/releases>
- an Azure subscription <https://azure.microsoft.com/en-us/>

### vs code extensions
- Azure Tools for Visual Studio Code <https://marketplace.visualstudio.com/items?itemName=bradygaster.azuretoolsforvscode>
- TSlint

### npm globals
```cmd
npm install -g grunt-cli tslint typescript
```

## azure setup?
- set up software
- set up azure
- configure Vs code
    - sign in to Azure account from Vs Code -> Azure: Sign In
    - select subscription
    - create a simple web app
    - use resource manager to set up deployment

## tsconfig
- link <https://www.typescriptlang.org/docs/handbook/tsconfig-json.html>
default tsconfig.json
```json
{
    "compilerOptions": {
        "outDir": "./dist",
        "sourceMap": true,
        "moduleResolution": "node",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "lib": ["es2016"]
    }
}

server/tsconfig.json
{
    "compilerOptions": {
        "declaration": false,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "lib": ["es6", "dom"],
        "module": "commonjs",
        "moduleResolution": "node",
        "mapRoot": "../dist",
        "outDir": "../dist",
        "sourceMap": true,
        "target": "es6",
        "typeRoots": ["../node_modules/@types"]
    },
    "include": ["**/*.ts"]
}
```

## tslint
- link <https://github.com/palantir/tslint>
npm install tslint --save-dev
```json
{
  /*
   * Possible values:
   * - the name of a built-in config
   * - a string that can be resolved as a module that exports the config object, e.g.:
   *   - an npm package name
   *   - an npm package name followed by the path to a file inside
   *   - a relative path to a JSON file
   */
  "extends": "tslint:latest",
  "rules": {
    /*
     * Any rules specified here will override those from the base config we are extending.
     */
    "curly": true
  },
  "jsRules": {
    /*
     * Any rules specified here will override those from the base config we are extending.
     */
    "curly": true
  },
  "rulesDirectory": [
    /*
     * A list of relative or absolute paths to directories that contain custom rules.
     * See the Custom Rules documentation below for more details.
     */
  ]
}
```

## simple static backend
dependencies
```cmd
npm install express path --save
npm install @types/express @types/node --save-dev
```

typescript
```ts
import * as express from "express";
import * as path from "path";
import * as http from "http";
const port = 9001
// middleware
const app: express.Application = express();
app.use(express.static(path.join(__dirname, "/../wwwroot")));

// http server
app.set("port", port);
const server = http.createServer(app);
server.listen(port);
```

## bootstrap
```cmd
npm install bootstrap@3 --save
```


## Angular
-- install latest (v4.0.0)
```cmd
npm install @angular/common@latest @angular/compiler@latest @angular/compiler-cli@latest @angular/core@latest @angular/forms@latest @angular/http@latest @angular/platform-browser@latest @angular/platform-browser-dynamic@latest @angular/platform-server@latest @angular/router@latest @angular/animations@latest rxjs zone.js --save
```


## project setup
### goal: get npm, typescript, and grunt setup
- package.json
    ```cmd
    npm init
    ```
- assets
    - index.html

- grunt
    - dependencies
    ```cmd
    npm install grunt --save-dev

    ```
    - create gruntfile.js
    ```js
    'use strict';

    module.exports = function(grunt) {
        // initialize config
        grunt.initConfig({

        });
    }
    ```
    
## grunt config extras
Define global vars as part of the grunt config
```js
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
        src: 'src/files',
        dest: 'dist/<%= pkg.name %>/<%= pkg.version %>',
    },
}
```
## next steps
- deploy to azure
- package vender.js
- watch
- livereload


## typescript + expressjs
- tsconfig.json
- tslint
- server app.ts
- create a ts compile grunt task
- create a tslint grunt task
- set up watch + livereload


## barebones angular2 setup
- npm install


## livereload
- npm install
- chrome extension <https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei>
- grunt setup <http://thanpol.as/grunt/Grunt-with-express-server-and-Livereload>


## concatenate
- app
- vendor
- css


## suggested grunt tasks 
### load-grunt-tasks
link <https://github.com/sindresorhus/load-grunt-tasks>
npm install --save-dev load-grunt-tasks

```js
require('load-grunt-tasks')(grunt);
```
### grunt-contrib-clean
<https://github.com/gruntjs/grunt-contrib-clean>
npm install grunt-contrib-clean --save-dev
```js
clean: {
    dist: ['<%= dirs.dist %>'],
    server: ['<%= dirs.serverDest %>']
},
```
### grunt-contrib-copy
<https://github.com/gruntjs/grunt-contrib-copy>
npm install grunt-contrib-copy --save-dev

### grunt-ts
<https://github.com/TypeStrong/grunt-ts>
npm install grunt-ts --save-dev
```js
ts: {
    server: {
        tsconfig: './app/server/tsconfig.json'
    }
},
```
### grunt-tslint
<https://github.com/palantir/grunt-tslint>
npm install grunt-tslint --save-dev
```js
    tslint: {
        options: {
            // can be a configuration object or a filepath to tslint.json
            configuration: "tslint.json",
            // If set to true, tslint errors will be reported, but not fail the task
            // If set to false, tslint errors will be reported, and the task will fail
            force: false,
            fix: false
        },
        files: {
            src: [
                "src/file1.ts",
                "src/file2.ts"
            ]
        }
    }
```
### grunt-express-server
<https://github.com/ericclemmons/grunt-express-server>
npm install grunt-express-server --save-dev
```js
express: {
    options: {
        // Override defaults here
    },
    dev: {
        options: {
            script: 'path/to/dev/server.js'
        }
    },
    prod: {
        options: {
            script: 'path/to/prod/server.js',
            node_env: 'production'
        }
    },
    test: {
        options: {
            script: 'path/to/test/server.js'
        }
    }
}
```
### grunt-contrib-watch
<https://github.com/gruntjs/grunt-contrib-watch>
npm install grunt-contrib-watch --save-dev
```js
watch: {
    scripts: {
        files: ['**/*.js'],
        tasks: ['jshint'],
        options: {
            spawn: false,
        },
    },
},
```
### grunt-contrib-concat
<https://github.com/gruntjs/grunt-contrib-concat>
npm install grunt-contrib-concat --save-dev
```js
concat: {
    basic: {
        src: ['src/main.js'],
        dest: 'dist/basic.js',
    },
    extras: {
        src: ['src/main.js', 'src/extras.js'],
        dest: 'dist/with_extras.js',
    },
},
```

### grunt-open
<https://github.com/jsoverson/grunt-open>
npm install grunt-open --save-dev
```js

```

### grunt-contrib-sass
<https://github.com/gruntjs/grunt-contrib-sass>
```js
sass: {
    dist: {
        files: [{
            expand: true,
            cwd: 'styles',
            src: ['*.scss'],
            dest: '../public',
            ext: '.css'
        }]
    }
}
```
### grunt-contrib-uglify
<https://github.com/gruntjs/grunt-contrib-uglify>
```js
uglify: {
    my_target: {
        files: [{
            expand: true,
            cwd: 'src/js',
            src: '**/*.js',
            dest: 'dest/js'
        }]
    }
}
```


### grunt-parallel
<https://github.com/iammerrick/grunt-parallel>
```js
parallel: {
    assets: {
        tasks: [{
            grunt: true,
            args: ['requirejs']
        }, {
            grunt: true,
            args: ['compass']
        },{
            cmd: 'some-custom-shell-script.sh'
        }]
    }
}
```


## workflows
- default: tslint without failing, compile TS and SASS to dist, copy HTML and library JS, run tests, start server, open browser, and watch
    1. parallel: 
        - typescript
        - sass
        - copy
        - tslint
    2. run server
    3. run tests
    4. open browser
    5. watch
- production: tslint with fail, compile TS and SASS, copy HTML and library JS, bundle App files, bundle Library files, minify, run tests
    1. parallel
        - typescript
        - sass
        - copy
        - tslint
    2. concatenate
        - app.js
        - vendor.js
        - styles.css
    3. uglify
    4. run tests


## Webpack
<https://angular.io/docs/ts/latest/guide/webpack.html>


## systemjs
npm install systemjs --save