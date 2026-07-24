# 7. 问题： 如何检查一个变量是否为undefined？


> 分类：基础语法题（1-15题）

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WA8Cw0NJFiEDSWkfEnNciVmrnww)

答案：

```javascript
if (variable === undefined) {
    console.log("变量未定义");
}
// 或者
if (typeof variable === 'undefined') {
    console.log("变量未定义");
}
```
