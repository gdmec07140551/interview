# 37. CSS中的@supports规则如何使用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

@supports定义：

@supports规则（也称为特性查询）允许开发者检测浏览器是否支持特定的CSS属性和值，从而实现渐进增强和优雅降级。

基本语法：

```css
@supports (property: value) {
    /* 支持时的样式 */
}

@supports not (property: value) {
    /* 不支持时的样式 */
}
```

基本用法：

1. 检测单个属性：

```css
/* 检测是否支持Grid布局 */
@supports (display: grid) {
    .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
}

/* 检测是否支持Flexbox */
@supports (display: flex) {
    .flex-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
```

2. 检测CSS变量：

```css
@supports (--css: variables) {
    :root {
        --primary-color: #007bff;
        --secondary-color: #6c757d;
    }
    
    .button {
        background-color: var(--primary-color);
        color: white;
    }
}
```

3. 检测复杂属性：

```css
/* 检测clip-path支持 */
@supports (clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)) {
    .clipped-element {
        clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
    }
}

/* 检测backdrop-filter支持 */
@supports (backdrop-filter: blur(10px)) {
    .glass-effect {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.1);
    }
}
```

逻辑操作符：

1. and操作符：

```css
@supports (display: flex) and (gap: 20px) {
    .modern-flex {
        display: flex;
        gap: 20px; /* 现代Flexbox的gap属性 */
    }
}

@supports (display: grid) and (grid-template-areas: "header header") {
    .grid-layout {
        display: grid;
        grid-template-areas: 
            "header header"
            "sidebar content"
            "footer footer";
    }
}
```

2. or操作符：

```css
@supports (display: -webkit-flex) or (display: flex) {
    .flexible {
        display: -webkit-flex;
        display: flex;
    }
}

@supports (transform: rotate(45deg)) or (-webkit-transform: rotate(45deg)) {
    .rotated {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
}
```

3. not操作符：

```css
@supports not (display: grid) {
    /* Grid不支持时的回退样式 */
    .fallback-layout {
        display: table;
        width: 100%;
    }
    
    .fallback-item {
        display: table-cell;
        vertical-align: top;
        width: 33.333%;
    }
}
```

实际应用场景：

1. 现代布局的渐进增强：

```css
/* 基础布局（所有浏览器） */
.layout {
    width: 100%;
}

.layout .item {
    float: left;
    width: 33.333%;
    padding: 10px;
    box-sizing: border-box;
}

/* Flexbox增强 */
@supports (display: flex) {
    .layout {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
    
    .layout .item {
        float: none;
        flex: 1;
        min-width: 250px;
    }
}

/* Grid进一步增强 */
@supports (display: grid) {
    .layout {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }
    
    .layout .item {
        flex: none;
        min-width: auto;
    }
}
```

2. CSS形状和遮罩：

```css
.shape-element {
    /* 回退样式 */
    border-radius: 50%;
    overflow: hidden;
}

@supports (clip-path: circle(50%)) {
    .shape-element {
        border-radius: 0;
        clip-path: circle(50%);
        overflow: visible;
    }
}

@supports (mask: url(#mask)) {
    .masked-element {
        mask: url(#complex-mask);
    }
}
```

3. 现代字体特性：

```css
.text {
    font-family: Arial, sans-serif;
}

@supports (font-variation-settings: "wght" 400) {
    .text {
        font-family: 'Inter Variable', Arial, sans-serif;
        font-variation-settings: "wght" 400, "slnt" 0;
    }
}

@supports (font-feature-settings: "liga" 1) {
    .text {
        font-feature-settings: "liga" 1, "kern" 1;
    }
}
```

4. 滤镜和混合模式：

```css
.image {
    /* 基础样式 */
    opacity: 0.8;
}

@supports (filter: blur(5px)) {
    .image {
        opacity: 1;
        filter: blur(2px) contrast(1.2);
    }
}

@supports (mix-blend-mode: multiply) {
    .overlay {
        mix-blend-mode: multiply;
    }
}
```

5. 滚动相关特性：

```css
.scroll-container {
    overflow-y: auto;
}

@supports (scroll-behavior: smooth) {
    html {
        scroll-behavior: smooth;
    }
}

@supports (scroll-snap-type: y mandatory) {
    .scroll-container {
        scroll-snap-type: y mandatory;
    }
    
    .scroll-item {
        scroll-snap-align: start;
    }
}
```

复杂的特性检测：

1. 检测选择器支持：

```css
@supports selector(:has(> img)) {
    .card:has(> img) {
        padding-top: 0;
    }
}

@supports selector(:is(h1, h2, h3)) {
    :is(h1, h2, h3) {
        margin-top: 0;
    }
}
```

2. 检测@规则支持：

```css
@supports (container-type: inline-size) {
    .container {
        container-type: inline-size;
    }
    
    @container (min-width: 400px) {
        .card {
            display: flex;
        }
    }
}
```

与JavaScript结合：

1. JavaScript中的特性检测：

```javascript
// 检测CSS属性支持
function supportsCSS(property, value) {
    return CSS.supports(property, value);
}

// 检测Grid支持
if (supportsCSS('display', 'grid')) {
    document.body.classList.add('supports-grid');
}

// 检测CSS变量支持
if (supportsCSS('--custom', 'property')) {
    document.body.classList.add('supports-css-vars');
}

// 检测复杂属性
if (supportsCSS('clip-path', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)')) {
    document.body.classList.add('supports-clip-path');
}
```

2. 动态样式应用：

```javascript
// 根据支持情况动态添加样式
const modernFeatures = [
    { property: 'display', value: 'grid', class: 'has-grid' },
    { property: 'backdrop-filter', value: 'blur(10px)', class: 'has-backdrop-filter' },
    { property: 'scroll-snap-type', value: 'x mandatory', class: 'has-scroll-snap' }
];

modernFeatures.forEach(feature => {
    if (CSS.supports(feature.property, feature.value)) {
        document.documentElement.classList.add(feature.class);
    }
});
```

最佳实践：

1. 渐进增强策略：

```css
/* 1. 基础样式（所有浏览器） */
.component {
    background: #f0f0f0;
    padding: 20px;
    margin: 10px;
}

/* 2. 现代特性增强 */
@supports (backdrop-filter: blur(10px)) {
    .component {
        background: rgba(240, 240, 240, 0.8);
        backdrop-filter: blur(10px);
    }
}

/* 3. 最新特性 */
@supports (color: color(display-p3 1 0 0)) {
    .component {
        background: color(display-p3 0.94 0.94 0.94);
    }
}
```

2. 组合使用：

```css
@supports (display: grid) and (gap: 20px) and (aspect-ratio: 1) {
    .modern-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }
    
    .modern-grid .item {
        aspect-ratio: 1;
    }
}
```

浏览器兼容性：

- Chrome 28+
- Firefox 22+
- Safari 9+
- IE不支持

注意事项：

- 不要过度使用，影响代码可读性
- 优先使用CSS特性检测而非浏览器检测
- 结合JavaScript进行更复杂的特性检测
- 始终提供合理的回退样式
- 测试各种浏览器和设备的表现

---
