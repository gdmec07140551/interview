# 25. CSS中的@media查询有哪些常用的特性？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

基本语法：

```css
@media media-type and (media-feature) {
    /* CSS规则 */
}
```

媒体类型（Media Types）：

```css
@media screen { /* 屏幕设备 */ }
@media print { /* 打印设备 */ }
@media speech { /* 语音合成器 */ }
@media all { /* 所有设备（默认） */ }
```

常用媒体特性：

1. 宽度和高度：

```css
/* 视口宽度 */
@media (max-width: 768px) {
    .container { width: 100%; }
}

@media (min-width: 1200px) {
    .container { width: 1170px; }
}

/* 设备宽度 */
@media (max-device-width: 480px) {
    body { font-size: 14px; }
}

/* 高度 */
@media (max-height: 600px) {
    .header { height: 40px; }
}
```

2. 方向：

```css
/* 横屏 */
@media (orientation: landscape) {
    .sidebar { width: 300px; }
}

/* 竖屏 */
@media (orientation: portrait) {
    .sidebar { width: 100%; }
}
```

3. 分辨率：

```css
/* 高分辨率屏幕 */
@media (min-resolution: 2dppx) {
    .logo { background-image: url('logo@2x.png'); }
}

/* Retina屏幕 */
@media (-webkit-min-device-pixel-ratio: 2) {
    .icon { background-size: 50% 50%; }
}
```

4. 颜色：

```css
/* 彩色屏幕 */
@media (color) {
    .colorful { color: red; }
}

/* 黑白屏幕 */
@media (monochrome) {
    .image { filter: grayscale(100%); }
}
```

5. 指针设备：

```css
/* 触摸设备 */
@media (pointer: coarse) {
    .button { min-height: 44px; }
}

/* 鼠标等精确指针 */
@media (pointer: fine) {
    .button { min-height: 32px; }
}

/* 悬停支持 */
@media (hover: hover) {
    .button:hover { background: #ccc; }
}
```

6. 暗色模式：

```css
/* 暗色主题 */
@media (prefers-color-scheme: dark) {
    body {
        background: #333;
        color: white;
    }
}

/* 亮色主题 */
@media (prefers-color-scheme: light) {
    body {
        background: white;
        color: black;
    }
}
```

7. 动画偏好：

```css
/* 用户偏好减少动画 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

逻辑操作符：

1. and操作符：

```css
@media screen and (min-width: 768px) and (max-width: 1023px) {
    .tablet-only { display: block; }
}
```

2. or操作符（逗号）：

```css
@media (max-width: 768px), (orientation: portrait) {
    .mobile-or-portrait { width: 100%; }
}
```

3. not操作符：

```css
@media not screen {
    .no-screen { display: none; }
}
```

4. only操作符：

```css
@media only screen and (max-width: 768px) {
    .mobile-only { display: block; }
}
```

常用断点：

```css
/* 移动端 */
@media (max-width: 767px) { }

/* 平板 */
@media (min-width: 768px) and (max-width: 1023px) { }

/* 桌面端 */
@media (min-width: 1024px) { }

/* 大屏幕 */
@media (min-width: 1200px) { }
```

最佳实践：

- 移动端优先设计
- 使用相对单位
- 测试各种设备和屏幕尺寸
- 考虑用户偏好设置
- 合理组织媒体查询代码

---
