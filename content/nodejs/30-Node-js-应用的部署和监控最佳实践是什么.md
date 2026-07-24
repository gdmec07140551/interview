# 30. Node.js 应用的部署和监控最佳实践是什么？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

1. 使用 PM2 进行进程管理：

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'my-app',
    script: './app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log'
  }]
};

// 部署命令
// pm2 start ecosystem.config.js
// pm2 reload my-app
// pm2 monit
```

2. Docker 容器化：

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

3. 健康检查：

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

4. 应用监控：

```javascript
// 使用 New Relic 或 DataDog
require('newrelic');

// 自定义指标收集
const client = require('prom-client');
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});
```

5. 日志聚合：

```javascript
// 使用 ELK Stack 或 Fluentd
const winston = require('winston');
require('winston-elasticsearch');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Elasticsearch({
      level: 'info',
      clientOpts: { host: 'http://elasticsearch:9200' }
    })
  ]
});
```

---

这 30 道 Node.js 八股文涵盖了从基础概念到高级应用的各个方面，包括核心模块、异步编程、Web 框架、数据库操作、安全性、性能优化、微服务和部署等重要主题。
