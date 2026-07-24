# 11. CSS中的position属性有哪些值？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

1. static（默认值）：

- 正常文档流定位
- top、right、bottom、left属性无效
- 不会创建新的层叠上下文

2. relative（相对定位）：

- 相对于元素在正常文档流中的位置定位
- 不脱离文档流，原位置保留
- 可以使用z-index

```css
.relative {
    position: relative;
    top: 10px;
    left: 20px;
}
```

3. absolute（绝对定位）：

- 相对于最近的已定位祖先元素定位
- 脱离文档流
- 如果没有已定位祖先，则相对于初始包含块定位

```css
.absolute {
    position: absolute;
    top: 0;
    right: 0;
}
```

4. fixed（固定定位）：

- 相对于视口定位
- 脱离文档流
- 滚动时位置不变

```css
.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
```

5. sticky（粘性定位）：

- 根据滚动位置在relative和fixed之间切换
- 需要指定top、right、bottom、left中的一个

```css
.sticky {
    position: sticky;
    top: 0;
}
```

---
