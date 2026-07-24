# 2. 解释 Node.js 的事件循环机制

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

事件循环是 Node.js 处理非阻塞 I/O 操作的核心机制。

执行阶段：

1. Timer 阶段：执行 setTimeout 和 setInterval 回调
2. Pending callbacks 阶段：执行延迟到下一个循环的 I/O 回调
3. Idle, prepare 阶段：内部使用
4. Poll 阶段：获取新的 I/O 事件，执行相关回调
5. Check 阶段：执行 setImmediate 回调
6. Close callbacks 阶段：执行关闭事件回调
