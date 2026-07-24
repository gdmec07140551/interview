# 13. 什么是 Worker Threads？与 Cluster 的区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

Worker Threads 是 Node.js 中的多线程解决方案，用于 CPU 密集型任务。

与 Cluster 的区别：

| 特性 | Worker Threads | Cluster |
| --- | --- | --- |
| 用途 | CPU 密集型任务 | I/O 密集型任务 |
| 内存 | 共享内存 | 独立内存空间 |
| 通信 | MessagePort | IPC |
| 开销 | 较小 | 较大 |

```javascript
// Worker Threads 示例
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.postMessage(42);
  worker.on('message', (data) => {
    console.log('收到:', data);
  });
} else {
  parentPort.on('message', (data) => {
    parentPort.postMessage(data * 2);
  });
}
```
