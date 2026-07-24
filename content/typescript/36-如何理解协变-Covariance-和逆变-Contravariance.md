# 36. 如何理解协变（Covariance）和逆变（Contravariance）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

- 协变: 如果 Dog 是 Animal 的子类型，那么 Array&lt;Dog&gt; 也是 Array&lt;Animal&gt; 的子类型。这在对象属性、数组和函数返回值类型中是安全的。
- 逆变: 如果 Dog 是 Animal 的子类型，那么 (dog: Dog) =&gt; void 却是 (animal: Animal) =&gt; void 的父类型。这主要体现在函数参数类型上，参数类型允许更宽泛的类型。
