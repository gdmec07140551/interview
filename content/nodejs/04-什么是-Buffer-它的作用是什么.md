# 4. 什么是 Buffer？它的作用是什么？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

Buffer 是 Node.js 中处理二进制数据的类，类似于整数数组。

主要用途：

- 处理文件 I/O 操作
- 网络通信中的数据传输
- 加密解密操作
- 图片、音频等二进制文件处理

```javascript
// 创建 Buffer
const buf1 = Buffer.alloc(10);
const buf2 = Buffer.from('hello', 'utf8');
const buf3 = Buffer.from([1, 2, 3, 4]);

// Buffer 操作
buf2.toString(); // 'hello'
buf2.length; // 5
```
