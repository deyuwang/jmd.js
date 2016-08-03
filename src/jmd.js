(function(exports){
	var handlerMap = {};

	function addEventListener(topic, handler){
		var handlers = handlerMap[topic];
		if(handlers == null){
			handlerMap[topic] = [];
		}
		handlerMap[topic].push(handler);
	}

	function addEventListeners(topics, handler){
		var counter = 0;
		for(var i=0; i<topics.length; i++){
			var topic = topics[i];
			var handlers = handlerMap[topic];
			if(handlers == null){
				handlerMap[topic] = [];
			}
			handlerMap[topic].push(function (result){
				if((++counter) === topics.length){
					return handler(result);
				}else{
					return null;
				}
			});
		}
	}

	function dispatchEvent(topic, event){
		var handlers = handlerMap[topic];
		if(handlers != null){
			for(var i=0; i<handlers.length; i++){
				handlers[i](event);
			}
		}
	}

	function Module(name, deps, body) {
		this.name = name;
		this.deps = deps;
		this.body = body;
		this.exports = {};
		this.created = false;
	}

	Module.prototype.create = function() {
		if(this.created) return;
		this.created = true;

		dispatchEvent('moduleExecute', this);
		this.body(this.getExports, this, this.exports);
		dispatchEvent(this.name, this);
	};

	Module.prototype.getExports = function(moduleName) {
		return modules[moduleName].exports;
	};



	var modules = {};
	var alias = {};
	var config = {findPath: ''};

	function define() {
		var name = arguments[0];
		var deps = arguments[1];
		var body = arguments[2];

		if(arguments.length == 2){
			body = arguments[1];
			deps = getRequireNames(body.toString());
		}

		if(alias[name] != null){
			name = alias[name];
		}

		var newModule = new Module(name, deps, body);
		modules[name] = newModule;

		dispatchEvent('moduleLoad', newModule);

		var unloadDeps = [];
		for(var i = 0; i < deps.length; i++) {
			var dep = deps[i];
			if(modules[dep] == null){
				unloadDeps.push(dep);
			}
		}

		if(unloadDeps.length == 0){
			newModule.create();
		}else{
			addEventListeners(unloadDeps, function(){
				newModule.create();
			});

			for(var i = 0; i < unloadDeps.length; i++) {
				load(unloadDeps[i]);
			}
		}
	}


	var re = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/ig;
	function getRequireNames(str) {
		var names = [];
		var r = re.exec(str);
		while(r != null) {
			names.push(r[1]);
			r = re.exec(str);
		}
		return names;
	}

	var loadedFiles = {};
	function load(name) {
		if(loadedFiles[name] != null) return;
		loadedFiles[name] = true;

		var path = define.config.findPath + name + '.js';
		dispatchEvent('scriptLoad', path);

		var script = document.createElement('script');
		var body = document.getElementsByTagName('HEAD')[0];
		script.type = "text/javascript";
		script.charset = 'utf-8';
		script.async = true;
		script.src = path;
		body.appendChild(script);
		script.onload = function(){
			dispatchEvent('scriptLoaded', path);
		};
	}


	define.modules = modules;

	define.config = config;

	define.alias = function (args) {
		for(var k in args){
			alias[k] = args[k];
		}
	};

	define.addEventListener = addEventListener;
	define.dispatchEvent = dispatchEvent;

	exports.define = define;
})(window);
