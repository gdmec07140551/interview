# 29. 如何在 Node.js 中实现微服务架构？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

1. 服务拆分：

```javascript
// 用户服务
const express = require('express');
const app = express();

app.get('/users/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  res.json(user);
});

app.listen(3001, () => {
  console.log('用户服务运行在端口 3001');
});
```

2. 服务间通信：

```javascript
// HTTP 调用其他服务
const axios = require('axios');

async function getOrdersByUserId(userId) {
  try {
    const response = await axios.get(`http://order-service:3002/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('调用订单服务失败:', error);
    throw error;
  }
}
```

3. 服务发现：

```javascript
const consul = require('consul')();

// 注册服务
consul.agent.service.register({
  name: 'user-service',
  port: 3001,
  check: {
    http: 'http://localhost:3001/health',
    interval: '10s'
  }
});

// 发现服务
const services = await consul.health.service('order-service');
```

4. API 网关：

```javascript
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 路由到不同的微服务
app.use('/api/users', createProxyMiddleware({
  target: 'http://user-service:3001',
  changeOrigin: true
}));

app.use('/api/orders', createProxyMiddleware({
  target: 'http://order-service:3002',
  changeOrigin: true
}));
```
