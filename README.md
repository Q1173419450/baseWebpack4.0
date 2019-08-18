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
