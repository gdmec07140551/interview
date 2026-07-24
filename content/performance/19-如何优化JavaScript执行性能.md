# 19. 如何优化JavaScript执行性能？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf)

参考答案：

- 减少主线程阻塞：使用requestIdleCallback
- 优化算法复杂度：选择高效算法和数据结构
- 避免内存泄漏：及时清理事件监听器和定时器
- 使用Web Workers：将计算密集任务移到后台
- 代码分割：按需加载，减少初始bundle大小

```javascript
// 时间切片优化长任务
function processLargeArray(array, callback) {
  const chunk = 1000;
  let index = 0;
  
  function processChunk() {
    const start = performance.now();
    
    while (index < array.length && (performance.now() - start) < 5) {
      // 处理数组项
      processItem(array[index++]);
    }
    
    if (index < array.length) {
      requestIdleCallback(processChunk);
    } else {
      callback();
    }
  }
  
  processChunk();
}
```
