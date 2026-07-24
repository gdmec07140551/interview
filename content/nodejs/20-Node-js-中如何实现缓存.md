# 20. Node.js 中如何实现缓存？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

1. 内存缓存：

```javascript
const cache = new Map();

function getFromCache(key) {
  return cache.get(key);
}

function setCache(key, value, ttl = 3600000) {
  cache.set(key, value);
  setTimeout(() => cache.delete(key), ttl);
}
```

2. Redis 缓存：

```javascript
const redis = require('redis');
const client = redis.createClient();

async function getFromRedis(key) {
  return await client.get(key);
}

async function setToRedis(key, value, expireTime = 3600) {
  await client.setex(key, expireTime, JSON.stringify(value));
}
```

3. HTTP 缓存：

```javascript
app.get('/api/data', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=3600',
    'ETag': '"123456"'
  });
  res.json(data);
});
```
