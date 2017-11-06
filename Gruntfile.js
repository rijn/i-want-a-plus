/* jshint esversion: 5 */

'use strict';

// var _ = require('lodash');
// var webpack = require('webpack');
// var fs = require('fs');
var serveStatic = require('serve-static');
var args = process.argv.slice(2);

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    var lrPort = 35729;
    var lrSnippet = require('connect-livereload')({ port: lrPort });
    var lrMiddleware = function (connect, options) {
        return [
            lrSnippet,
            serveStatic(options.base[0])
        ];
    };

    grunt.initConfig({
        shell: {
            build: {
                command: 'node ./build/build.js'
            },
            restartTest: {
                command: 'pm2 restart i-want-a-plus'
            },
            buildTheme: {
                command: 'node_modules/.bin/et -c element-variables.scss -o src/styles/theme'
            }
        },
        apidoc: {
            all: {
                src: 'server/controllers/',
                dest: 'doc/'
            }
        },
        watch: {
            server: {
                files: [
                    'api/**/*.js'
                ],
                tasks: [ 'eslint', 'express:dev' ],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            doc: {
                files: [
                    'controllers/**/*.js'
                ],
                tasks: [ 'apidoc' ],
                options: {
                    livereload: true
                }
            }
        },
        env: {
            options: {
            },
            dev: {
                NODE_ENV: 'dev'
            },
            test: {
                NODE_ENV: 'test'
            }
        },
        express: {
            options: {
            },
            dev: {
                options: {
                    script: '.',
                    port: 8080,
                    args: []
                }
            }
        },
        clean: {
            options: {},
            dist: [ 'dist' ]
        },
        eslint: {
            target: [
                '*.js',
                'server/**/*.js',
                'src/**/*.js',
                'test/**/*.js'
                // 'build/**/*.js',
                // 'config/**/*.js'
            ]
        },
        connect: {
            options: {
            },
            doc: {
                options: {
                    port: 8080,
                    base: 'doc',
                    middleware: lrMiddleware
                }
            }
        }
    });

    require('./test/server/mocha.conf')(grunt);

    grunt.registerTask('build', [ 'clean', 'shell:build' ]);

    grunt.registerTask('dev', function (target) {
        if (target !== 'server') {
            grunt.config('express.dev.options.args', args.concat([
                '--vue'
            ]));
        }
        grunt.task.run([
            'eslint',
            'env:dev',
            'express:dev',
            target === 'client' ? 'keepalive' : 'watch:server'
        ]);
    });

    grunt.registerTask('travis', function () {
        grunt.task.run([
            'continue:on',
            'clean',
            'eslint',
            'mocha',
            'build',
            'continue:off',
            'continue:fail-on-warning'
        ]);
    });

    grunt.registerTask('deploy', function () {
        grunt.task.run([
            'continue:on',
            'build',
            'apidoc',
            'continue:off',
            'continue:fail-on-warning'
        ]);
    });
};
