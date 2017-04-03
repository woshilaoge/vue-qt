vue-demo
====
demo系统

by woshilaoge   2017/3/14


### JS目录结构

````bash
src
└── lib  //主要放置一些非 bower 管理的JS文件
    ├── q.js
    ├── product-picker.js
    └── assign-index-china.js
````
- 文件命名为 assign*的js文件 设置为某些页面特有的文件，在打包后会自动插入设置好的页面。
 比如，assign-index-china.js 打包后只有 index.html页面引入了改js文件，假如其它页面同样是需要使用
 assign-index-qita-china.js 即可。


### gulp / conf.js

 ````bash
    gulp default/dev 开发环境
    gulp dist 上线环境（打包压缩合并）
 ````
 - 当执行 gulp dist 会自动设置mock为 false， 若需要打包成mock数据版本的 ，需要设置
 .fezrc 里useMock > dist > true
 - conf.js DEBUGMOCK 为开发环境（gulp dev）mock开关，public/conf.js 开关权限最大，当设置为false时，
 页面所有模块都走 真实接口数据，当 设置为 true 是，放开每个页面的 mock 权限，此时页面里的 conf.js 起作用
 以此类推。