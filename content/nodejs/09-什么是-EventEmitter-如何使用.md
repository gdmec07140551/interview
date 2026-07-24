# 9. 什么是 EventEmitter？如何使用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

EventEmitter 是 Node.js 事件驱动架构的核心，用于处理事件的发布和订阅。

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// 监听事件
myEmitter.on('event', (data) => {
  console.log('事件触发:', data);
});

// 触发事件
myEmitter.emit('event', 'hello world');

// 一次性监听
myEmitter.once('event', () => {
  console.log('只执行一次');
});

// 移除监听器
myEmitter.removeAllListeners('event');
```
