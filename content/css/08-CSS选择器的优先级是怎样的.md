# 8. CSS选择器的优先级是怎样的？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

优先级计算规则：

1. 内联样式：1000
2. ID选择器：100
3. 类选择器、属性选择器、伪类选择器：10
4. 标签选择器、伪元素选择器：1
5. 通配符选择器：0

特殊规则：

- !important具有最高优先级
- 相同优先级时，后定义的样式覆盖先定义的
- 继承的样式优先级最低

示例：

```css
/* 优先级：1 + 10 + 1 = 12 */
div.container p { color: red; }

/* 优先级：100 */
#header { color: blue; }

/* 优先级：1000 */
<div style="color: green;">

/* 最高优先级 */
.text { color: yellow !important; }
```

最佳实践：

- 避免使用!important
- 尽量使用类选择器
- 保持选择器简洁
- 使用CSS预处理器管理复杂样式

---
