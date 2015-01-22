module.exports = function(grunt) {

	var srcFiles = ['src/jmd.js'];

	var pkg = grunt.file.readJSON('package.json');
	
	grunt.initConfig({
		pkg : pkg,
		concat : {
			options : {
				separator : '',
				//banner : "'use strict';\n",
				process : function(src, filepath) {
					return '// Source: '+ filepath + '\n'
							+ src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g,'$1');
				}
			},
			dist : {
				src : srcFiles,
				dest : 'build/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},
		uglify : {
			options : {
				//banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build : {
				src : 'build/<%= pkg.name %>-<%= pkg.version %>.js',
				dest : 'dist/<%= pkg.name %>-<%= pkg.version %>-min.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', ['concat', 'uglify']);
};
