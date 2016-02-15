// jscs:disable

module.exports = function(grunt) {

	'use strict';

	// Load all NPM installed grunt tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		paths: {
			frontend: '../frontend'
		},
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			src: '<%= paths.frontend %>/js/source/**/*.js',
			options: {
				jshintrc: '<%= paths.frontend %>/js/.jshintrc'
			}
		},
		jscs: {
			src: '<%= jshint.src %>',
			options: {
				config: '<%= paths.frontend %>/js/.jscsrc'
			}
		},
		sass: {
			options: {
				sourceMap: true
			},
			compile: {
				files: [{
					expand: true,
					cwd: '<%= paths.frontend %>/css/scss',
					src: ['**/*.scss'],
					dest: '<%= paths.frontend %>/css',
					ext: '.css'
				}]
			}
		},
		postcss: {
			options: {
				map: true,
				processors: [
					// add vendor prefixes
					require('autoprefixer')({
						browsers: ['last 2 versions']
					})
				]
			},
			compile: {
				files: [{
					expand: true,
					cwd: '<%= paths.frontend %>/css',
					src: ['**/*.css'],
					dest: '<%= paths.frontend %>/css',
					ext: '.css'
				}]
			}
		},
		notify: {
			css: {
				options: {
					message: 'SCSS Compiled & CSS prefixed'
				}
			}
		},
		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				options: {
					reload: true
				}
			},
			'css': {
				files: ['<%= paths.frontend %>/css/scss/**/*.scss'],
				tasks: ['sass', 'postcss', 'notify:css'],
				options: {
					spawn: false,
					livereload: true
				}
			}
		}
	});

	// Default task.
	grunt.registerTask('default', ['sass', 'postcss']);
};