# 25. 如何在 Node.js 中实现数据验证？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

使用 Joi 进行数据验证：

```javascript
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(100),
  password: Joi.string().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
});

// 验证中间件
const validateUser = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  
  req.body = value;
  next();
};

app.post('/users', validateUser, (req, res) => {
  // 处理已验证的数据
  res.json({ message: '用户创建成功' });
});
```

使用 express-validator：

```javascript
const { body, validationResult } = require('express-validator');

app.post('/users',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // 处理请求
  }
);
```
