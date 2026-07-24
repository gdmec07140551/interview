# 50. 问题： 写一个函数实现柯里化（curry）。


> 分类：高级应用题（46-50题）

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WA8Cw0NJFiEDSWkfEnNciVmrnww)

答案：

```javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

// 使用示例
function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
```
