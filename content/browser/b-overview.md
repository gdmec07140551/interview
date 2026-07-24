# 二、DOM与事件模型

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/IUHOwucHSifqLFkI2jkc4ozonVd)

| 主题 | 核心知识点 | 概览 |
| --- | --- | --- |
| 1.事件流：捕获与冒泡 | • 描述 DOM 的事件流 | 建立心智模型。了解一个事件从外到内（捕获）再从内到外（冒泡）的完整路径。 |
| 2.事件委托：更高效的监听 | • 什么是事件委托及其优点<br>• event.target vs event.currentTarget | 核心实战技巧。基于“冒泡”原理，引出事件委托，对比为每个子元素绑定事件与在父元素上统一监听的优劣，并解释target与currentTarget的区别。 |
| 3.阻止冒泡与默认行为 | • event.stopPropagation()<br>•event.preventDefault() | 掌握控制权。用清晰的示例分别演示如何阻止事件继续传播，以及如何阻止链接跳转、表单提交等浏览器默认行为。 |
| 4.深入 addEventListener | • useCapture 和 passive 的作用 | 性能与控制。讲解addEventListener的第三个参数。useCapture关联到捕获阶段，而passive: true则是一个重要的滚动性能优化点。 |
