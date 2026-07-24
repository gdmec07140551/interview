# 17. 如何安全地使用eval()和Function构造函数？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh)

参考答案：

安全原则：

- 避免使用：优先使用JSON.parse()、模板字符串等替代方案
- 输入验证：严格验证和过滤输入
- 沙箱环境：在受限环境中执行

```javascript
// 危险用法
eval(userInput); // 永远不要这样做

// 安全替代方案
// 1. JSON解析
const data = JSON.parse(jsonString);

// 2. 模板字符串
const template = `Hello ${name}`;

// 3. 使用安全的解析库
const safeEval = require('safe-eval');
safeEval(code, context);
```
