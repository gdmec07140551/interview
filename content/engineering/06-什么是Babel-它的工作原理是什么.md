# 6. 什么是Babel？它的工作原理是什么？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Babel是一个JavaScript编译器，主要用于将ES6+代码转换为向后兼容的JavaScript语法。

工作原理（三个阶段）：

1. 解析（Parse）：

- 将代码字符串解析成抽象语法树（AST）

2. 转换（Transform）：

- 对AST进行遍历，在此过程中对节点进行添加、更新及移除等操作

3. 生成（Generate）：

- 将经过转换的AST再转换成代码字符串

核心组件：

- @babel/core：核心编译器
- @babel/preset-env：智能预设
- @babel/polyfill：补丁库
- 各种插件：具体的转换规则
