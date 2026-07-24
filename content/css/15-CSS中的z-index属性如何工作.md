# 15. CSS中的z-index属性如何工作？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

z-index基本概念：

- 控制元素在z轴（垂直于屏幕）上的堆叠顺序
- 只对定位元素（position不为static）有效
- 数值越大，元素越靠前

层叠上下文（Stacking Context）：

创建层叠上下文的条件：

- 根元素（html）
- position为absolute或relative且z-index不为auto
- position为fixed或sticky
- flex项目且z-index不为auto
- opacity小于1
- transform不为none
- filter不为none

层叠顺序（从底到顶）：

1. 层叠上下文的根
2. z-index为负值的定位元素
3. 非定位的块级元素
4. 非定位的浮动元素
5. 非定位的行内元素
6. z-index为auto的定位元素
7. z-index为正值的定位元素

示例：

```css
.context {
    position: relative;
    z-index: 1;
}

.child1 {
    position: absolute;
    z-index: 100;
}

.child2 {
    position: absolute;
    z-index: 200;
}
```

注意事项：

- 子元素的z-index只在父级层叠上下文内有效
- 不要滥用过大的z-index值
- 建议使用合理的z-index分层策略

---
