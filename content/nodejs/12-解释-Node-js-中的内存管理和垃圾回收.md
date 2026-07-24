# 12. 解释 Node.js 中的内存管理和垃圾回收

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

Node.js 使用 V8 引擎的垃圾回收机制：

内存结构：

- 新生代：存储生存时间短的对象
- 老生代：存储生存时间长的对象

垃圾回收算法：

- Scavenge：处理新生代，采用 Cheney 算法
- Mark-Sweep：标记清除，处理老生代
- Mark-Compact：标记整理，解决内存碎片

内存泄漏常见原因：

- 全局变量
- 闭包引用
- 事件监听器未移除
- 定时器未清除
