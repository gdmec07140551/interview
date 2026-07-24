# 22. CSS中的层叠规则是什么？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

层叠（Cascade）的含义：

CSS的"层叠"指的是当多个规则应用到同一个元素时，如何确定最终应用哪个规则的机制。

层叠顺序（按优先级从低到高）：

1. 浏览器默认样式：

```css
/* 浏览器默认样式 */
p { margin: 1em 0; }
```

2. 用户样式表：

- 用户在浏览器中设置的样式

3. 作者样式表（网站开发者编写的样式）：

```css
/* 外部样式表 */
@import url('style.css');

/* 内部样式表 */
<style>
p { color: blue; }
</style>

/* 内联样式 */
<p style="color: red;">
```

4. 作者!important声明：

```css
p {
    color: green !important;
}
```

5. 用户!important声明：

- 用户设置的!important样式

6. 浏览器!important声明：

- 浏览器默认的!important样式

特殊性（Specificity）计算：

计算规则：

- 内联样式：1000
- ID选择器：100
- 类、属性、伪类选择器：10
- 元素、伪元素选择器：1

示例：

```css
/* 特殊性：0001 */
p { color: black; }

/* 特殊性：0010 */
.text { color: blue; }

/* 特殊性：0100 */
#title { color: red; }

/* 特殊性：0111 */
#title.text p { color: green; }

/* 特殊性：1000 */
<p style="color: yellow;">

/* 最高优先级 */
p { color: purple !important; }
```

层叠解决冲突的步骤：

1. 找出所有相关规则
2. 按来源和重要性排序
3. 按特殊性排序
4. 按源码顺序排序（后来居上）

最佳实践：

- 避免使用!important
- 保持选择器简洁
- 使用有意义的类名
- 遵循CSS架构方法（BEM、OOCSS等）

---
