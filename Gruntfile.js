module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    base: 'src',
                    keepalive: true
                }
            }
        },
        react: {
            'dynamic_mappings': {
                files: [
                    {
                        expand: true,
                        cwd: 'src/jsx',
                        src: ['**/*.jsx'],
                        dest: 'src/www/jsx',
                        ext: '.js'
                    }
                ]
            }
        },
        exec: {
            clean: {
                cmd: function () {
                    return 'rm -irf build/';
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['exec:clean', 'react', 'copy']);
    grunt.registerTask('default', ['build', 'connect']);
};
