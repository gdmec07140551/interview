# 11. 什么是DOM Clobbering攻击？如何防范？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh)

参考答案：

DOM Clobbering是指通过HTML注入来覆盖全局变量或DOM属性，影响JavaScript代码执行。

攻击示例：

```html
<img name="userConfig" src="x">
<script>
// 原本期望的对象被覆盖
console.log(window.userConfig); // 输出img元素而非配置对象
</script>
```

防范措施：

- 避免使用全局变量
- 使用命名空间
- 严格的HTML过滤
- 使用hasOwnProperty检查属性
