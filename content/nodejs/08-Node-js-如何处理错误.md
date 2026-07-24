# 8. Node.js 如何处理错误？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

Node.js 错误处理方式：

1. 同步代码：使用 try-catch

```javascript
try {
  const data = fs.readFileSync('file.txt');
} catch (err) {
  console.error(err);
}
```

1. 异步回调：错误优先回调

```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

1. Promise：使用 catch

```javascript
readFilePromise('file.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

1. 全局错误处理

```javascript
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
```
