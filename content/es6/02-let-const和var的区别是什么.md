# 2. let、const和var的区别是什么？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

- 作用域：var是函数作用域，let和const是块级作用域
- 变量提升：var存在变量提升，let和const存在暂时性死区
- 重复声明：var允许重复声明，let和const不允许
- 赋值：var和let可以重新赋值，const不能重新赋值（但对象内容可修改）
- 初始化：var和let可以不初始化，const必须初始化
