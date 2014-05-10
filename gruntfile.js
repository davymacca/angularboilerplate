'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    //require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        paths: {
            app:      'app/',
            src:      'app/src/',
            dist:     'app/assets/dist/',
            assets:   'app/assets/'
        },

        watch: {
            styl: {
                files: '<%= paths.src %>/styles/**/*.styl',
                tasks: ['stylus'],
                options: {
                  livereload: true,
                }
            },
            jslib: {
                files: ['<%= paths.src %>/lib/**/*.js'],
                tasks: ['concat:lib'],
                options: {
                  livereload: true,
                }
            },
            js: {
                files: ['<%= paths.src %>/scripts/**/*.js'],
                tasks: ['concat:scripts', 'jshint', 'jscs'],
                options: {
                  livereload: true,
                },
            },
            views: {
                files: ['<%= paths.src %>/views/**/*.html'],
                tasks: ['copy:views'],
                options: {
                  livereload: true,
                }
            },
            img: {
                files: ['<%= paths.src %>/img/**/**'],
                tasks: ['copy:img'],
            }
        },

        clean: {
            assets: '<%= paths.assets %>',
            tidydev: ['<%= paths.dist %>/lib.js','<%= paths.dist %>/scripts.js', '<%= paths.dist %>/styles.css', '<%= paths.dist %>/images.css']
        },

        copy: {
            views: {
                expand: true,
                cwd: '<%= paths.src %>/views/',
                src: ['**'],
                dest: '<%= paths.assets %>/views/'
            },
            img: {
                expand: true,
                cwd: '<%= paths.src %>/img/',
                src: ['**'],
                dest: '<%= paths.assets %>/img/'
            },
            fonts: {
                expand: true,
                cwd: '<%= paths.src %>/fonts/',
                src: ['**'],
                dest: '<%= paths.assets %>/fonts/'
            },
            libs: {
                flatten: true,
                expand: true,
                src: ['<%= paths.src %>/lib/core/angular.min.js','<%= paths.src %>/lib/core/jquery.min.js'],
                dest: '<%= paths.dist %>/fallback/',
            }
        },

        //
        // Minification and compilation
        // ----------------------------
        //
        stylus: {
            options: {
                compress: false,
                linenos: true
            },
            styles: {
                files: {
                    '<%= paths.dist %>styles.css': [
                        '<%= paths.src %>/styles/core.styl'
                    ]
                }
            },
            images: {
                files: {
                    '<%= paths.dist %>images.css': [
                        '<%= paths.src %>/styles/images.styl'
                    ]
                }
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            lib: {
                src: [
                    '<%= paths.src %>/lib/*.js',
                    '!<%= paths.src %>/lib/core/*.js' // exclude core (it's pulled from the CDN)
                ],
                dest: '<%= paths.dist %>/lib.js',
            },
            scripts: {
                src: ['<%= paths.src %>/scripts/**/*.js'],
                dest: '<%= paths.dist %>/scripts.js',
            },
        },

        uglify: {
            options: {
                mangle: {
                    except: ['jQuery', 'angular']
                }
            },
            build: {
                files: {
                    '<%= paths.dist %>/scripts.min.js': ['<%= paths.dist %>/lib.js', '<%= paths.dist %>/scripts.js']
                }
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            build: {
                files: {
                    '<%= paths.dist %>/styles.min.css': ['<%= paths.dist %>/styles.css']
                }
            },
            images: {
                files: {
                    '<%= paths.dist %>/images.min.css': ['<%= paths.dist %>/images.css']
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true, // *** set this to false if you use comment directives in AngularJS
                    collapseWhitespace: true
                },
                expand: true,
                cwd: '<%= paths.assets %>/views',
                src: ['**/*.html'],
                dest: '<%= paths.assets %>/views'
            },
        },

        //
        // Tests
        // ---------------------
        //
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['<%= paths.dist %>/styles.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['<%= paths.dist %>/styles.css']
            }
        },

        jshint: {
            test: {
                options: {
                    jshintrc: '.jshintrc'
                },
                files: {
                    src: ['gruntfile.js', '<%= paths.src %>/scripts/**/*.js']
                }
            }
        },

        // automated anal-retentive nitpicking ftw!
        jscs: {
            options: {
                config: '.jscs.json'
            },
            src: ['gruntfile.js', '<%= paths.src %>/scripts/**/*.js']
        },

        //
        // Server
        // ---------------------
        //
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: ['dev']
                }
            },
            dist: {
                script: 'server.js',
                options: {
                    args: ['dist']
                }
            }
        },

        open: {
            dev: {
                path: 'http:/localhost:3000/',
                app: 'Google Chrome'
            },
            dist: {
                path: 'http:/localhost:3333/',
                app: 'Google Chrome'
            }
        }

    });

    // Tasks
    grunt.registerTask('default', [
        'clean:assets',
        'copy',
        'stylus',
        'concat',
        'watch'
    ]);

    grunt.registerTask('build', [
        'test',
        'clean:assets',
        'copy',
        'stylus',
        'concat',
        'cssmin',
        'uglify',
        'htmlmin',
        'clean:tidydev'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'jscs',
        'csslint:lax'
    ]);

    grunt.registerTask('server:dev', [
        'open:dev',
        'nodemon:dev'
    ]);

    grunt.registerTask('server:dist', [
        'open:dist',
        'nodemon:dist'
    ]);

    grunt.registerTask('server', function (param) {
        grunt.warn('server action must be specified, like "server:dev" or "server:dist" ');
    });

};
