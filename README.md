# jmd.js
极小型、高性能、浏览器端Javascript模块化库
# 特点
  - 完全异步，没eval、setTimeout，全速加载!
  - 遵循 CMD 规范，可以像Node.js 一样来写模块代码
  - 只有一个函数：define，连学习文档都不需要了！
  - 代码小巧，方便扩展
# 示例:
``` Javascript
  define('mymodule', function (require, module, exports){
    
    var myutil = require('uitl');
    var $ = require('jquery');
    
    //TODO:	
    
    module.exports = {
    	//TODO:
    };
  });
```

