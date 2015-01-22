
// config
define.config.findPath = './js/';
define.config.debug = true;

define('main', function(require, module, exports){
	var dao = require('dao');
	var Service = require('service').Service;



	var bar = new Service();
	var rs = bar.save({name: 'foo'});

    console.log('app started.');

	//exports.main = {};
});

