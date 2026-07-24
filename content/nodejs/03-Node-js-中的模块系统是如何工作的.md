# 3. Node.js 中的模块系统是如何工作的？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

Node.js 使用 CommonJS 模块系统：

```javascript
// 导出模块
module.exports = {
  name: 'example',
  getValue: () => 'value'
};

// 或者
exports.name = 'example';

// 导入模块
const module = require('./module');
const { name } = require('./module');
```

模块加载过程：

1. 路径解析：解析模块路径
2. 缓存检查：检查模块缓存
3. 文件定位：找到对应文件
4. 编译执行：包装并执行模块代码
5. 缓存模块：将模块缓存起来
