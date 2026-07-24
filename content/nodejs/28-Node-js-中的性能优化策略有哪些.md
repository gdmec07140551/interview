# 28. Node.js 中的性能优化策略有哪些？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

1. 使用集群模式：

```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  require('./app.js');
}
```

2. 启用 Gzip 压缩：

```javascript
const compression = require('compression');
app.use(compression());
```

3. 数据库连接池：

```javascript
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
  connectionLimit: 10
});
```

4. 缓存策略：

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

app.get('/api/data/:id', (req, res) => {
  const key = `data_${req.params.id}`;
  let data = cache.get(key);
  
  if (!data) {
    data = fetchDataFromDB(req.params.id);
    cache.set(key, data);
  }
  
  res.json(data);
});
```

5. 异步操作优化：

```javascript
// 避免阻塞事件循环
setImmediate(() => {
  // CPU 密集型操作
  heavyComputation();
});

// 使用 Worker Threads 处理 CPU 密集型任务
const { Worker } = require('worker_threads');
const worker = new Worker('./cpu-intensive-task.js');
```
