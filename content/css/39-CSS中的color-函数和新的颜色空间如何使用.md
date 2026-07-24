# 39. CSS中的color()函数和新的颜色空间如何使用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

新颜色空间概述：

CSS引入了新的颜色空间和color()函数，支持更广色域的颜色表示，包括Display P3、Rec2020等专业色彩空间。

color()函数语法：

```css
.element {
    color: color(colorspace r g b / alpha);
}
```

支持的颜色空间：

1. sRGB（默认）：

```css
.srgb-color {
    /* 传统RGB */
    color: rgb(255, 0, 0);
    
    /* 使用color()函数的sRGB */
    color: color(srgb 1 0 0);
    color: color(srgb 1 0 0 / 0.8); /* 带透明度 */
}
```

2. Display P3：

```css
.p3-color {
    /* Display P3色彩空间，更广的色域 */
    color: color(display-p3 1 0 0);
    background: color(display-p3 0.8 0.2 0.9);
    border-color: color(display-p3 0.5 0.7 0.3 / 0.6);
}
```

3. Rec2020：

```css
.rec2020-color {
    /* Rec2020色彩空间，用于HDR内容 */
    color: color(rec2020 1 0 0);
    background: color(rec2020 0.9 0.1 0.8);
}
```

4. ProPhoto RGB：

```css
.prophoto-color {
    /* ProPhoto RGB，摄影专业色彩空间 */
    color: color(prophoto-rgb 1 0 0);
    background: color(prophoto-rgb 0.8 0.3 0.9);
}
```

新的颜色函数：

1. oklch()函数：

```css
.oklch-colors {
    /* oklch(lightness chroma hue / alpha) */
    color: oklch(0.7 0.15 180); /* 青色调 */
    background: oklch(0.9 0.1 120 / 0.8); /* 浅绿色，带透明度 */
    border-color: oklch(0.5 0.2 300); /* 紫色调 */
}
```

2. oklab()函数：

```css
.oklab-colors {
    /* oklab(lightness a b / alpha) */
    color: oklab(0.7 -0.1 0.1); /* 绿红轴和蓝黄轴 */
    background: oklab(0.9 0.05 -0.05 / 0.9);
}
```

3. lch()函数：

```css
.lch-colors {
    /* lch(lightness chroma hue / alpha) */
    color: lch(70% 50 180); /* CIE LCH色彩空间 */
    background: lch(90% 20 120 / 0.8);
}
```

4. lab()函数：

```css
.lab-colors {
    /* lab(lightness a b / alpha) */
    color: lab(70% -20 30); /* CIE LAB色彩空间 */
    background: lab(90% 10 -10 / 0.9);
}
```

实际应用场景：

1. 高质量显示器优化：

```css
.hero-image {
    /* 回退到标准sRGB */
    background-color: rgb(255, 100, 150);
}

/* 支持P3显示器时使用更鲜艳的颜色 */
@supports (color: color(display-p3 1 0 0)) {
    .hero-image {
        background-color: color(display-p3 1 0.4 0.6);
    }
}
```

2. 品牌色彩精确控制：

```css
:root {
    /* 品牌主色 - 标准显示器 */
    --brand-primary: rgb(0, 120, 255);
    --brand-secondary: rgb(255, 80, 120);
}

@supports (color: color(display-p3 1 0 0)) {
    :root {
        /* 品牌主色 - 广色域显示器 */
        --brand-primary: color(display-p3 0 0.5 1);
        --brand-secondary: color(display-p3 1 0.3 0.5);
    }
}

.brand-button {
    background: var(--brand-primary);
    color: white;
}
```

3. 渐变中的新颜色空间：

```css
.gradient-p3 {
    /* 标准渐变 */
    background: linear-gradient(45deg, 
        rgb(255, 0, 0), 
        rgb(0, 255, 0)
    );
}

@supports (color: color(display-p3 1 0 0)) {
    .gradient-p3 {
        /* P3色彩空间渐变，颜色更鲜艳 */
        background: linear-gradient(45deg, 
            color(display-p3 1 0 0), 
            color(display-p3 0 1 0)
        );
    }
}
```

4. 主题系统中的应用：

```css
/* 浅色主题 */
[data-theme="light"] {
    --bg-primary: oklch(0.98 0.02 180);
    --text-primary: oklch(0.2 0.05 270);
    --accent: oklch(0.6 0.15 200);
}

/* 深色主题 */
[data-theme="dark"] {
    --bg-primary: oklch(0.15 0.02 270);
    --text-primary: oklch(0.9 0.03 180);
    --accent: oklch(0.7 0.2 200);
}

.card {
    background: var(--bg-primary);
    color: var(--text-primary);
    border-left: 4px solid var(--accent);
}
```

颜色空间转换和混合：

1. color-mix()函数：

```css
.mixed-colors {
    /* 在sRGB空间中混合 */
    color: color-mix(in srgb, red 70%, blue 30%);
    
    /* 在P3空间中混合 */
    background: color-mix(in display-p3, 
        color(display-p3 1 0 0) 60%, 
        color(display-p3 0 0 1) 40%
    );
    
    /* 在oklch空间中混合 */
    border-color: color-mix(in oklch, 
        oklch(0.8 0.15 120) 80%, 
        oklch(0.6 0.2 240) 20%
    );
}
```

2. 相对颜色语法：

```css
.relative-colors {
    --base-color: color(display-p3 0.8 0.2 0.9);
    
    /* 基于基础颜色创建变体 */
    color: color(from var(--base-color) display-p3 r g b / 0.8);
    background: color(from var(--base-color) display-p3 calc(r * 0.8) g b);
    border-color: color(from var(--base-color) display-p3 r calc(g * 1.2) b);
}
```

响应式颜色：

```css
.responsive-colors {
    /* 基础颜色 */
    --primary: oklch(0.6 0.15 200);
    --secondary: oklch(0.8 0.1 120);
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
    .responsive-colors {
        --primary: oklch(0.3 0.2 200);
        --secondary: oklch(0.9 0.05 120);
    }
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
    .responsive-colors {
        --primary: oklch(0.7 0.18 200);
        --secondary: oklch(0.85 0.12 120);
    }
}
```

JavaScript中的颜色处理：

```javascript
// 检测颜色空间支持
function supportsColorSpace(colorSpace) {
    try {
        return CSS.supports('color', `color(${colorSpace} 1 0 0)`);
    } catch {
        return false;
    }
}

// 检测各种颜色空间
const colorSpaceSupport = {
    p3: supportsColorSpace('display-p3'),
    rec2020: supportsColorSpace('rec2020'),
    oklch: CSS.supports('color', 'oklch(0.5 0.1 180)'),
    colorMix: CSS.supports('color', 'color-mix(in srgb, red, blue)')
};

console.log('Color space support:', colorSpaceSupport);

// 动态应用颜色
function applyOptimalColors() {
    const root = document.documentElement;
    
    if (colorSpaceSupport.p3) {
        root.style.setProperty('--brand-color', 'color(display-p3 1 0.3 0.8)');
    } else {
        root.style.setProperty('--brand-color', 'rgb(255, 76, 204)');
    }
}
```

性能和兼容性考虑：

1. 渐进增强：

```css
.progressive-color {
    /* 基础颜色（所有浏览器） */
    background: #ff4080;
    
    /* 现代颜色空间（支持的浏览器） */
    background: oklch(0.7 0.15 340);
}

@supports (color: color(display-p3 1 0 0)) {
    .progressive-color {
        background: color(display-p3 1 0.25 0.5);
    }
}
```

2. 媒体查询检测：

```css
/* 检测显示器色域 */
@media (color-gamut: srgb) {
    .adaptive-color {
        color: rgb(255, 0, 100);
    }
}

@media (color-gamut: p3) {
    .adaptive-color {
        color: color(display-p3 1 0 0.4);
    }
}

@media (color-gamut: rec2020) {
    .adaptive-color {
        color: color(rec2020 1 0 0.3);
    }
}
```

浏览器兼容性：

- Chrome 111+ (color(), oklch(), oklab())
- Firefox 113+ (部分支持)
- Safari 15+ (color(), Display P3)
- IE不支持

最佳实践：

- 始终提供sRGB回退颜色
- 使用@supports检测功能支持
- 在高端显示器上测试颜色效果
- 考虑色彩无障碍访问性
- 使用相对颜色语法创建一致的色彩系统
- 在专业显示场景中优先使用新颜色空间

---
