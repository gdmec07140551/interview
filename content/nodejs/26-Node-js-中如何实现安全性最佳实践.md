# 26. Node.js 中如何实现安全性最佳实践？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

1. 使用 Helmet 设置安全头：

```javascript
const helmet = require('helmet');
app.use(helmet());
```

2. 输入验证和清理：

```javascript
const validator = require('validator');
const xss = require('xss');

// 清理用户输入
const cleanInput = (input) => {
  return xss(validator.escape(input));
};
```

3. 速率限制：

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 限制每个 IP 100 次请求
  message: '请求过于频繁，请稍后再试'
});

app.use(limiter);
```

4. 环境变量管理：

```javascript
require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
```

5. HTTPS 重定向：

```javascript
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```
