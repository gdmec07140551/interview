# 49. Omit<T, K> 和 Exclude<T, U> 有什么区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

- Omit&lt;T, K&gt;: 用于**对象类型**。它从对象类型 T 中移除指定的属性键 K，返回一个新的对象类型。
- Exclude&lt;T, U&gt;: 用于**联合类型**。它从联合类型 T 中排除所有可以赋值给 U 的类型成员。
