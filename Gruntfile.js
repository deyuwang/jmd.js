module.exports = function(grunt) {

	var srcFiles = ['src/jmd.js'];

	var pkg = grunt.file.readJSON('package.json');
	
	grunt.initConfig({
		pkg : pkg,		
		uglify : {
			options : {
				//banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build : {
				src : 'src/<%= pkg.name%>.js',
				dest : 'dist/<%= pkg.name %>-<%= pkg.version %>-min.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', ['uglify']);
};
