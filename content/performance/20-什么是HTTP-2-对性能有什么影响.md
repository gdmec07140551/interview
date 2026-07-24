# 20. 什么是HTTP/2？对性能有什么影响？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

HTTP/2是HTTP协议的第二个主要版本，带来显著性能提升。

主要特性：

- 多路复用：单连接并行处理多个请求
- 头部压缩：HPACK算法压缩HTTP头
- 服务器推送：主动推送资源给客户端
- 二进制分帧：更高效的数据传输

性能影响：

- 减少连接数，降低延迟
- 消除队头阻塞问题
- 减少网络开销
- 更好的带宽利用率

```javascript
// HTTP/2服务器推送示例（Node.js）
const http2 = require('http2');
const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {
  if (headers[':path'] === '/') {
    // 推送CSS和JS资源
    stream.pushStream({':path': '/styles.css'}, (err, pushStream) => {
      pushStream.respondWithFile('./styles.css');
    });
  }
});
```
