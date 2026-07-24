# 15. 什么是 Express.js？它的核心特性有哪些？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

Express.js 是基于 Node.js 的 Web 应用框架，提供了一系列强大的特性。

核心特性：

- 路由系统：灵活的路由定义
- 中间件：可插拔的中间件架构
- 模板引擎：支持多种模板引擎
- 静态文件服务：内置静态文件服务
- 错误处理：统一的错误处理机制

```javascript
const express = require('express');
const app = express();

// 中间件
app.use(express.json());
app.use(express.static('public'));

// 路由
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', (req, res) => {
  const user = req.body;
  res.json({ success: true, user });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```
