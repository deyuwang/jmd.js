
define.addEventListener('scriptLoad', function (path){
	console.log('\t\t%c' + '-> load file: "%c' + path + '"', 'color:green', 'color:black');
});

define.addEventListener('moduleLoad', function (module) {
	var name = module.name;
	var deps = module.deps;

	console.log('%cLoad : %c' + name,'color:green', "color:orange;font-weight:bold");
	console.log('\t%c-> depend: %c[' + deps.join(',') + ']', 'color:green', 'color:blue');
});

define.addEventListener('moduleExecute', function (module) {
//	console.log('%cExecuted: %c ' + module.name, 'color:green', 'color:orange');
});


