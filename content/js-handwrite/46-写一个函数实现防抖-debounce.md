# 46. 问题： 写一个函数实现防抖（debounce）。


> 分类：高级应用题（46-50题）

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WA8Cw0NJFiEDSWkfEnNciVmrnww)

答案：

```javascript
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
```
