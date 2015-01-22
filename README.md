# jmd.js
极小型、高性能Javascript模块化管理库(浏览器端)

# 特点
  - 遵循规范，可以像Node.js 一样来写模块代码（参见：AMD、CMD）
  - 完全异步，不对源码做任何改动、没eval、setTimeout，全速加载!
  - 干干净净，只有一个函数：**define**，连学习文档都不需要了！
  - 代码小巧，但扩展能力非凡
  - 用着放心，依赖关系自动维护，井井有序，不存在重复加载等问题

# 如何使用
``` Html
<html>
  <head>
	<script src="jmd.js"></script>
	<script src="main.js"></script>
  </head>
  <body>
  </body>
</html>
```
main.js是你的程序的入口，名字也可任意的

# 定义模块：
``` Javascript
    var dao = require('dao');
    
    module.exports = {
    	//TODO:
    };
```
与Node模块完全一致, 需要在Grunt的插件concat做一下配置。

# 定义模块(纯浏览器端）:
``` Javascript
  // main.js
  define('main', function (require, module, exports){
    
    var util = require('util');
    var $ = require('jquery');
    
    //TODO:	
    
    module.exports = {
    	//TODO:
    };
  });
  
  // util.js
  define('util', function (require, module, exports){
    
    function trim(str){
    }
    
    module.exports.trim = trim;
    
  });
```
模块名称就是文件的名称

# 配置
- 修改加载目录:
``` Javascript
  define.config.findPath = './js/';  // 默认为当前页面所在目录(./)
```
- 开启调试模式：
``` Javascript
  define.config.debug = true;
```
然后在控制台查看包加载和依赖关系：

![Completion](https://raw.githubusercontent.com/deyuwang/jmd.js/master/images/screenshot.png)
