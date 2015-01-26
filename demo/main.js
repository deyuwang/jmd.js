
define('main', function(require, module, exports){

	var Service = require('service').Service;
	var dao = require('js/dao');


	var bar = new Service();
	var rs = bar.save({name: 'foo'});

	dao.save({});

    console.log('\n Hello jmd.js!');

	exports.main = {};
});

