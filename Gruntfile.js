module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-coveralls');

    grunt.initConfig({
        jshint: {
            all: [
                '*.js', 'src/*.js', 'test/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        jsbeautifier: {
            files: [
                '*.js', 'src/*.js', 'test/*.js'
            ],
            options: {
                'indent_size': 4,
                'indent_char': ' ',
                'indent_level': 0,
                'indent_with_tabs': false,
                'preserve_newlines': true,
                'max_preserve_newlines': 10,
                'jslint_happy': false,
                'brace_style': 'collapse',
                'keep_array_indentation': false,
                'keep_function_indentation': false,
                'space_before_conditional': true,
                'eval_code': false,
                'indent_case': false,
                'unescape_strings': false
            }
        },

        html2js: {
            // options: {
            //   // custom options, see below
            // },
            main: {
                src: ['src/combo-box.html'],
                dest: 'tmp/templates.js'
            },
        },

        concat: {
            dist: {
                src: [
                    'src/*.js', 'tmp/templates.js'
                ],
                dest: 'dist/angular-combo-box.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/angular-combo-box.min.js': ['dist/angular-combo-box.js']
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true,
                reporters: ['dots', 'coverage'],
                browsers: ['PhantomJS'],
                preprocessors: {
                    'src/*.js': 'coverage'
                },
                coverageReporter: {
                    type: "lcov",
                    dir: "coverage/"
                }
            }
        },

        coveralls: {
            options: {
                force: true
            },
            src: {
                src: 'coverage/**/lcov.info'
            },
        },

        watch: {
            all: {
                files: ['src/*', 'test/*.js'],
                tasks: ['default'],
            },
            notests: {
                files: ['src/*', 'test/*.js'],
                tasks: ['build'],
            }
        }


    });

    grunt.registerTask('build', ['jshint', 'jsbeautifier', 'html2js', 'concat:dist', 'uglify:dist']);
    grunt.registerTask('test', ['karma:unit', 'coveralls']);
    grunt.registerTask('default', ['build', 'test']);
};
