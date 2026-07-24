# 16. 什么是Package.json？请解释其主要字段的作用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Package.json是Node.js项目的配置文件，包含项目的元数据和依赖信息。

主要字段：

基本信息：

- name：项目名称
- version：版本号（遵循语义化版本）
- description：项目描述
- keywords：关键词数组
- author：作者信息

依赖管理：

- dependencies：生产环境依赖
- devDependencies：开发环境依赖
- peerDependencies：同伴依赖
- optionalDependencies：可选依赖

脚本和配置：

- scripts：可执行脚本
- main：入口文件
- engines：Node.js版本要求
- browserslist：浏览器兼容性配置

示例：

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "webpack serve",
    "build": "webpack --mode=production"
  },
  "dependencies": {
    "vue": "^3.0.0"
  },
  "devDependencies": {
    "webpack": "^5.0.0"
  }
}
```
