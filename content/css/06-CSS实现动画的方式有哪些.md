# 6. CSS实现动画的方式有哪些？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

1. Transition过渡动画：

```css
.box {
    transition: all 0.3s ease;
}
.box:hover {
    transform: scale(1.2);
}
```

2. Transform变换动画：

```css
.box {
    transform: translateX(100px) rotate(45deg) scale(1.5);
}
```

3. Animation关键帧动画：

```css
@keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}
.box {
    animation: slideIn 1s ease-in-out;
}
```

4. JavaScript动画：

- 使用requestAnimationFrame
- 修改元素的style属性
- 使用动画库如GSAP、Anime.js

5. SVG动画：

- SMIL动画
- CSS动画应用于SVG元素
- JavaScript控制SVG动画

6. Canvas动画：

- 使用Canvas API绘制动画帧
- WebGL 3D动画

---
