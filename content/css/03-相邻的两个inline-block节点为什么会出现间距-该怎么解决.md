# 3. 相邻的两个inline-block节点为什么会出现间距，该怎么解决？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

出现间距的原因：

inline-block元素之间的空白符（空格、换行、制表符）会被浏览器解析为一个空格字符，从而产生间距。

解决方法：

1. 移除空格：

```html
<div>item1</div><div>item2</div>
```

2. 使用font-size: 0：

```css
.parent {
    font-size: 0;
}
.child {
    font-size: 14px;
}
```

3. 使用margin负值：

```css
.inline-block {
    margin-right: -4px;
}
```

4. 使用flexbox：

```css
.parent {
    display: flex;
}
```

5. 使用float：

```css
.inline-block {
    float: left;
}
```

---
