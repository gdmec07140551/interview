# 10. 解释 Node.js 中的集群（Cluster）模式

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

Cluster 模块允许创建子进程来共享服务器端口，充分利用多核 CPU。

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  
  // 衍生工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
    cluster.fork(); // 重启进程
  });
} else {
  // 工作进程可以共享任何 TCP 连接
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);
}
```
