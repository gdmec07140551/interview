# 5. Stream 是什么？有哪些类型？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

Stream 是处理流式数据的抽象接口，用于高效处理大量数据。

四种基本类型：

1. Readable：可读流（如 fs.createReadStream）
2. Writable：可写流（如 fs.createWriteStream）
3. Duplex：双工流（如 TCP socket）
4. Transform：转换流（如 zlib.createGzip）

```javascript
const fs = require('fs');
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);
```
