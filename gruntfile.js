'use strict';
var loadGruntTasks = require('load-grunt-tasks');

module.exports = function(grunt) {
    loadGruntTasks(grunt); // load all grunt related tasks.

    // initialize config
    grunt.initConfig({
        // Variables
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            dist: "./dist",
            serverSrc: 'app/server',
            serverDest: '<%= dirs.dist %>/server',
            assetsSrc: "app/assets",
            assetsDest: "<%= dirs.dist %>/wwwroot",
            clientSrc: 'app/client',
            clientDest: '<%= dirs.dist %>/wwwroot/app',
        }
        ,

        // Tasks
        clean: {
            dist: ['<%= dirs.dist %>']
        },
        copy: {
            assets: {
                expand: true,
                cwd: '<%= dirs.assetsSrc %>',
                src: '**',
                dest: '<%= dirs.assetsDest %>',
            },
            client: {
                expand: true,
                cwd: '<%= dirs.clientSrc %>',
                src: '**/*.html',
                dest: '<%= dirs.assetsDest %>/app'
            }
        },
        ts: {
            server: {
                tsconfig: './app/server/tsconfig.json',
                options: {
                    mapRoot: '<%= dirs.serverDest %>',
                    outDir: '<%= dirs.serverDest %>',
                }
            },
            client: {
                tsconfig: './app/client/tsconfig.json',
                options: {
                    mapRoot: '<%= dirs.clientDest %>',
                    outDir: '<%= dirs.clientDest %>',
                }
            }
        },
        tslint: {
            options: {
                force: false,
                fix: false
            },
            app: ['app/**/*.ts']
        },
        express: {
            server: {
                options: {
                    script: '<%= dirs.serverDest %>/main.js'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            express: {
                files: ['<%= dirs.serverSrc %>/**/*.ts'],
                tasks: ['ts', 'express:server'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['<%= dirs.assetsSrc %>/**/*.css'],
                tasks: ['concat:css']
            },
            html: {
                files: ['<%= dirs.assetsSrc %>/**/*.html'],
                tasks: ['copy:assets']
            },
            client: {
                files: ['<%= dirs.clientSrc %>/**/*.ts'],
                tasks: ['ts']
            },
        },
        concat: {
            css: {
                src: ['<%= dirs.assetsSrc %>/**/*.css'],
                dest: '<%= dirs.assetsDest %>/styles.css',
            },
            polyfills: {
                src: [
                    'node_modules/core-js/client/shim.min.js',
                    'node_modules/zone.js/dist/zone.js',
                    'node_modules/systemjs/dist/system.src.js',
                    'node_modules/reflect-metadata/Reflect.js'
                ],
                dest: '<%= dirs.assetsDest %>/polyfills.js',
            }
        },
        open : {
            dev : {
                path: 'http://localhost:9001',
                app: '/Applications/Google Chrome.app'
            }
        }

    });

    grunt.registerTask("bundle", ["concat:css", "concat:polyfills" ]);

    grunt.registerTask("default", ["clean:dist", "tslint", "ts", "bundle", "copy:assets", "copy:client", "express:server", "open", "watch"])
}