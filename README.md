#### 公共文件的拆分

> 提取 CDN 文件

html-webpack-externals-plugin

> 公共文件缓存

optimization

#### 构建错误

优化构建时的日志展示 `friendly-errors-webpack-plugin`

#### 冒烟测试

开发人员预先测试功能是否可用，再给到运维人员测试(文件类测试)

需要：模板项目、测试用例（mocha）

主要功能，在给到测试人员的时候，自己先进行测试，文件

#### 单元测试

代码类测试

```
> 单元测试可以对业务代码进行测试吗？和平时自己本地运行调试有什么本质上的区别吗?

单元测试可以对业务代码进行测试，我们团队针对核心业务会做单元测试和端对端测试。单测更加适合通用组件和基础模块。

和本地调试的区别：本地调试是黑盒，颗粒度较粗，单测是白盒，颗粒度更细。

另外单侧可以覆盖到具体的代码，比如某段代码只有特定的情况才会执行。单测也是一个衡量项目质量很好的手段，每次需求迭代都可以通过单测保证基础的逻辑不受到影响。

> 冒烟测试可以直接运行构建看是否成功，单元测试一项一项测是不是比冒烟麻烦很多，单元测试的优势是什么相对于冒烟？

单元测试颗粒度更细，是白盒，需要针对具体的代码逻辑分支进行测试用例编写。冒烟测试只是关注最基本的功能是否ok，比如构建是否成功，是否有资源生成出来，也是一个黑盒的过程。


需要了解 前端测试方向
```

#### 持续集成

接入 Travis CI

将有权限的 git 项目加入到 travis CI 中

通过 `.travis.yml` 文件，执行一个持续集成的脚本

#### 发布到 npm

发布版本：npm publish

升级版本：
    补丁版本：npm version patch
    小版本：npm version minor
    大版本：npm version major

#### git 提交格式要求

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

type: 某次提交类型，所有类型如下:

feat：新增 feature
fix：修复 bug
docs：仅仅修改文档，如：README、CHANGELOG、contribute 等
style: 仅修改了空格，格式缩进，不改变大妈逻辑
refactor：代码重构，没有加新功能或修复bug
perf：优化相关，如提升性能
test：测试用例，如:单元测试、集成测试
chore：改变构建流程，新增依赖库、工具等
revert：回滚版本

```
npm install husky -D
npm install conventional-changelog-cli -D
npm install validate-commit-msg -D

<!-- 提交不符合规范 -->
"commitmsg": "validate-commit-msg",
<!-- changelog -->
"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
```

### 构建速度和体积优化策略

#### 构建速度分析

speed-measure-webpack-plugin

查看每个插件的执行时间

#### 体积分析

webpack-bundle-analyzer

查看每个文件的体积大小

#### 高版本的 webpack 和 Node.js

> webpack 4.0 优化

for of 代替 forEach、Map 和 Set 替代了 Object、includes 替代 indexOf

使用字符串替代正则

#### 多进程 / 多实例构建：资源并行解析可选方案

官方推荐：thread-loader

社区：parallel-webpack
     HappyPack

> HappyPack

原理：每次 webpack 解析一个模块，HappyPack 会将它及它的依赖分配给 worker 线程中

作者不维护了

当文件不够复杂的时候，可以不使用 多进程

#### 多进程 / 多实例：并行压缩

1、使用 parallel-uglify-plugin

2、uglifyjs-webpack-plugin

3、terser-webpack-plugin（支持压缩 ES6 的代码）（推荐）

#### 分包加载

以前的做法：使用 html-webpack-externals-plugin 进行分包，引人 CDN 文件

缺点：一个基础库指定一个 CDN，当包多的时候，会比较繁琐

现在：使用 DLLPlugin

将分离出来的包整合成一个包

```
基础包分离
library: [
    'react',
    'react-dom',
    'redux',
    'react-redux'
]
业务包分离,加一个 key
```

通过 webpack.dll.js 生成公共包，然后利用 webpack.DllReferencePlugin

#### 缓存提升二次构建

1、babel-loader 开启缓存

2、terser-webpack-plugin

3、cache-loader 或者 hard-source-webpack-plugin

#### 缩小构建目标

2、减少文件搜索范围

优化 `resolve.modules` 配置，（减少模块搜索层级）

优化 `resolve.mainFields`

优化 `resolve.extensions` 配置

合理使用 alias

#### 图片优化

基于 Node 的 imagemin 或者 tinypngAPI

配置 image-webpack-loader

> imagemin 优点

定制选项

引入很多第三方优化插件，例如pngquant

可以处理多种图片格式

#### tree Shaking 擦除无用的 CSS

PurifyCSS: 遍历代码，识别已经用到的 CSS class

使用 purgecss-webpack-plugin 和 mini-css-extract-plugin 一起使用

#### polyfill