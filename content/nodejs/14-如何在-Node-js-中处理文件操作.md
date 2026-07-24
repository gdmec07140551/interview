# 14. 如何在 Node.js 中处理文件操作？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

Node.js 提供 fs 模块处理文件系统操作：

```javascript
const fs = require('fs');
const path = require('path');

// 同步读取
const data = fs.readFileSync('file.txt', 'utf8');

// 异步读取
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promise 版本
const fsPromises = require('fs').promises;
async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// 流式读取（大文件）
const readStream = fs.createReadStream('large-file.txt');
readStream.on('data', (chunk) => {
  console.log(chunk);
});
```
