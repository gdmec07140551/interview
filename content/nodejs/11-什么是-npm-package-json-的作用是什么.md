# 11. 什么是 npm？package.json 的作用是什么？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

npm（Node Package Manager）是 Node.js 的包管理器。

package.json 作用：

- 项目信息：名称、版本、描述
- 依赖管理：dependencies、devDependencies
- 脚本定义：npm scripts
- 项目配置：入口文件、仓库地址等

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "项目描述",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "jest": "^28.0.0"
  }
}
```
