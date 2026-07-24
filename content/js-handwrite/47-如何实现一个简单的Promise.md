# 47. 问题： 如何实现一个简单的Promise？


> 分类：高级应用题（46-50题）

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WA8Cw0NJFiEDSWkfEnNciVmrnww)

答案：

```javascript
class SimplePromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'resolved';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };
        
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.value = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };
        
        executor(resolve, reject);
    }
    
    then(onResolved, onRejected) {
        if (this.state === 'resolved') {
            onResolved(this.value);
        }
        if (this.state === 'rejected') {
            onRejected(this.value);
        }
        if (this.state === 'pending') {
            this.onResolvedCallbacks.push(() => onResolved(this.value));
            this.onRejectedCallbacks.push(() => onRejected(this.value));
        }
    }
}
```
