# 42. Awaited<T> 工具类型是做什么的？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: Awaited&lt;T&gt; 工具类型用于获取一个 Promise 的 resolve 值的类型，它可以递归地“解包”嵌套的 Promise。例如 Awaited&lt;Promise&lt;Promise&lt;string&gt;&gt;&gt; 的结果是 string 类型。
