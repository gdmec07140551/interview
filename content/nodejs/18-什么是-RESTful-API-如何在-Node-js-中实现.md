# 18. 什么是 RESTful API？如何在 Node.js 中实现？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

RESTful API 是基于 REST 架构风格的 Web API 设计规范。

REST 原则：

- 统一接口
- 无状态
- 可缓存
- 客户端-服务器分离
- 分层系统

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// GET /users - 获取所有用户
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET /users/:id - 获取特定用户
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /users - 创建用户
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// PUT /users/:id - 更新用户
app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// DELETE /users/:id - 删除用户
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
```
