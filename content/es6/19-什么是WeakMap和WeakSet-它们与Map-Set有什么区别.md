# 19. 什么是WeakMap和WeakSet？它们与Map、Set有什么区别？

> 来源：[飞书原文](https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc)

参考答案：

WeakMap和WeakSet的特点：

- 键/值必须是对象
- 弱引用，不阻止垃圾回收
- 不可遍历，没有size属性
- 没有clear方法

与Map、Set的区别：

- 引用类型：弱引用 vs 强引用
- 垃圾回收：不阻止 vs 阻止
- 遍历性：不可遍历 vs 可遍历
- 用途：存储私有数据 vs 一般数据存储
