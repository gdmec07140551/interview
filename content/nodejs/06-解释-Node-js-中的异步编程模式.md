# 6. 解释 Node.js 中的异步编程模式

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

Node.js 支持多种异步编程模式：

1. 回调函数（Callback）

```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

1. Promise

```javascript
const readFilePromise = util.promisify(fs.readFile);
readFilePromise('file.txt').then(data => console.log(data));
```

1. async/await

```javascript
async function readFile() {
  try {
    const data = await readFilePromise('file.txt');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```
