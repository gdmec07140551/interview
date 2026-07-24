# 7. 什么是中间件？在 Express 中如何使用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

中间件是在请求-响应循环中执行的函数，可以访问请求对象（req）、响应对象（res）和下一个中间件函数（next）。

```javascript
const express = require('express');
const app = express();

// 应用级中间件
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// 路由级中间件
app.get('/user/:id', (req, res, next) => {
  res.send('User ID: ' + req.params.id);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
