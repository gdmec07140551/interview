# 6. JavaScript性能优化策略有哪些？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

- 代码分割：按需加载，动态import
- Tree Shaking：移除未使用代码
- 压缩混淆：减小文件体积
- Web Workers：将计算密集任务移到后台线程
- 避免阻塞：使用async/defer属性

```javascript
// 动态导入
const loadModule = async () => {
  const module = await import('./heavy-module.js');
  module.init();
};

// Web Workers
const worker = new Worker('calculation.js');
worker.postMessage(data);
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};
```
