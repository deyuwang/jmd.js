/*
* The MIT License (MIT)
* 
* Copyright (c) 2015 Deyu Wang
* https://github.com/deyuwang/jmd.js
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

(function(exports){

	function EventDispatcher(){
        this.actionMap = {};
    }

    EventDispatcher.prototype.on = function(topics, action){
        var results = [];
        var counter = 0;
        for(var i=0; i<topics.length; i++){
            var topic = topics[i];
            var actions = this.actionMap[topic];
            if(actions == null){
                this.actionMap[topic] = [];
            }
            function actionProxy(result){
                results[i] = result;
                counter++;
                if(counter === topics.length){
                    counter = 0;
                    return action.apply(null, results);
                }else{
                    return null;
                }
            }
            this.actionMap[topic].push(actionProxy);
        }
    };

    EventDispatcher.prototype.trigger = function(topic, event){
        var actions = this.actionMap[topic];
        if(actions != null){
            for(var i=0; i<actions.length; i++){
                actions[i](event);
            }
        }
    };

	var eventBus = new EventDispatcher();
	var modules = {};

	function Module(name, deps, body) {
        this.name = name;
		this.deps = deps;
		this.body = body;
		this.exports = {};
		this.created = false;
	}

	Module.prototype.generate = function() {
		if(this.created) return;
		this.body(this.getExports, this, this.exports);
		eventBus.trigger(this.name);
		this.created = true;
	};

	Module.prototype.getExports = function(moduleName) {
		return modules[moduleName].exports;
	};

	var re = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/ig;    
	function getRequireNames(str) {
		var names = [];
		var r = re.exec(str);
		while(r != null) {
			names.push(r[1]);
			//console.log(r[0] + "  " + r[1]);   
			r = re.exec(str);
		}  
		return names;
	}

	function removeLoaded(deps) {
		var rs = [];
		for(var i = 0; i < deps.length; i++) {
			var dep = deps[i];
			if(modules[dep] == null){
				rs.push(dep);
			}
		}
		return rs;
	}

	function define() {
		var args = Array.prototype.slice.call(arguments);

		if(args.length == 2){
			var body = args[1];
			var deps = getRequireNames(body.toString());
			args.splice(1,0,deps);
		}
		
		defineModule.apply(null, args);
	}

	function defineModule(name, deps, body) {
		if(define.config.debug === true){
			console.log('%cLoad module: %c' + name,'color:green', "color:orange;font-weight:bold");
			console.log('    %c' + '-> depend: %c[' + deps.join(',') + ']', 'color:green', 'color:blue');
		}

		var module = new Module(name, deps, body);
		modules[name] = module;

		var unloads = removeLoaded(deps);

		if(unloads.length == 0){
			module.generate();
		}else{
			eventBus.on(unloads, function(){
				//console.log(name + ' dependence all loaded.');
				module.generate();
			});

			for(var i = 0; i < unloads.length; i++) {
				load(unloads[i]);
			}
		}
	}

	function load(name) {
		//console.log('load :' + name + ".js");
		var script = document.createElement('script');
		var body = document.getElementsByTagName('HEAD')[0];
		script.type = "text/javascript";
        script.charset = 'utf-8';
        script.async = true;
		script.src = define.config.findPath + name + '.js';
		body.appendChild(script);
		script.onload = function(){
			//console.log(script.src + ' loaded.');
		};
	}

	define.modules = modules;

	define.config = {
		findPath: './',
		debug: false
	};

	exports.define = define;
})(window);	
