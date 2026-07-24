# 16. Node.js 中如何实现身份验证和授权？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

常见的身份验证方案：

1. JWT（JSON Web Token）

```javascript
const jwt = require('jsonwebtoken');

// 生成 token
const token = jwt.sign(
  { userId: user.id }, 
  process.env.JWT_SECRET, 
  { expiresIn: '1h' }
);

// 验证中间件
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
```

2. Session 认证

```javascript
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
```
