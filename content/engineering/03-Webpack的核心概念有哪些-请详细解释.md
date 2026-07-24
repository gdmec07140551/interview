# 3. Webpack的核心概念有哪些？请详细解释。

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Webpack的五个核心概念：

Entry（入口）：

- 指示Webpack应该使用哪个模块作为构建依赖图的开始

Output（输出）：

- 告诉Webpack在哪里输出它所创建的bundles

Loader（加载器）：

- 让Webpack能够处理非JavaScript文件
- 如：css-loader、babel-loader、file-loader等

Plugin（插件）：

- 执行范围更广的任务，如打包优化、资源管理等
- 如：HtmlWebpackPlugin、CleanWebpackPlugin等

Mode（模式）：

- development、production、none
- 不同模式会启用相应的内置优化
