# 21. 解释 TypeScript 中的 this 和 => (箭头函数)。

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: 和 JavaScript 一样，普通函数中的 this 是动态绑定的，取决于函数的调用方式。而箭头函数 (=&gt;) 中的 this 是词法绑定的，它会捕获其所在上下文的 this 值，这在类的方法或回调函数中非常有用，可以避免 this 指向混乱的问题。
