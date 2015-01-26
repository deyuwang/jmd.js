# jmd.js
极小型、高性能Javascript模块化管理库(浏览器端)


![Completion](https://raw.githubusercontent.com/deyuwang/jmd.js/master/images/logo.png)

# 特点
  - 遵循规范，可以像Node.js 一样来写模块代码（参见：AMD、CMD）
  - 完全异步，不对源码做任何改动、没eval、setTimeout，全速加载!
  - 干干净净，只有一个函数：**define**，连学习文档都不需要了！
  - 代码小巧，压缩后: **1.6kb**，移动平台、各种浏览器都支持
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
    
    module.exports = {
    	//TODO:
    };
  });
  
  // util.js
  define('util', ['zip', 'md5'] , function (require, module, exports){
    
    function trim(str){
    }
    
    module.exports.trim = trim;
    
  });
```
模块名称就是文件的名称, 多个模块也可以写在一个js文件中（例如最后压缩成一个js文件也可以，不需要关心顺序）。

# 配置
- 修改加载目录:
``` Javascript
  define.config.findPath = './lib/';  // 非必选
```
- 开启调试模式：
``` Javascript
  define.config.debug = true;
```
然后在控制台查看包加载和依赖关系：

![Completion](https://raw.githubusercontent.com/deyuwang/jmd.js/master/images/screenshot.png)


# 第三方js库:
``` Javascript
    // 假如第三方库是jquery,并且没有遵循CMD或者AMD:
    require('jquery'); //去掉前面的 var $= 即可
    
    // 正常使用
    $('div').css({});
    
    module.exports = {
    	//TODO:
    };
```

# 贡献

仅仅一个不错的开始还不够，还需要你的加入，Fork me！
