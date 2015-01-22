define('service', function (require, module, exports){

	var dao = require('dao');
	
	function Service() {

	}

	Service.prototype.save = function (obj) {
        return dao.save(obj);        
	};
	
	exports.Service = Service;
});
