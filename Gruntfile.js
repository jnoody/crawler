module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    base: 'build',
                    keepalive: true
                }
            }
        },
        react: {
            'dynamic_mappings': {
                files: [
                    {
                        expand: true,
                        src: ['src/www/**/*.jsx'],
                        dest: '.',
                        ext: '.jsx.js'
                    }
                ]
            }
        },
        exec: {
            clean: {
                cmd: function () {
                    return 'rm -irf build/ && rm -irf src/www/jsx/';
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        cwd: 'src/www',
                        expand: true,
                        src: '**',
                        dest: 'build'
                    }
                ]
            }
        },
        browserify: {
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['exec:clean', 'react', /*'browserify',*/ 'copy']);
    grunt.registerTask('default', ['build', 'connect']);
};
