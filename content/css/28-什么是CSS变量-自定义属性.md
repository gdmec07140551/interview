# 28. 什么是CSS变量（自定义属性）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

CSS变量定义：

CSS变量（CSS Custom Properties）允许开发者定义可重复使用的值，并在整个文档中引用这些值。

基本语法：

```css
/* 定义变量 */
:root {
    --primary-color: #3498db;
    --font-size: 16px;
    --margin: 20px;
}

/* 使用变量 */
.button {
    background-color: var(--primary-color);
    font-size: var(--font-size);
    margin: var(--margin);
}
```

变量作用域：

1. 全局变量：

```css
:root {
    --global-color: #333;
    --global-font: 'Arial, sans-serif';
}

/* 在任何地方都可以使用 */
body {
    color: var(--global-color);
    font-family: var(--global-font);
}
```

2. 局部变量：

```css
.component {
    --local-bg: #f0f0f0;
    --local-padding: 15px;
    
    background: var(--local-bg);
    padding: var(--local-padding);
}

/* 子元素可以继承父元素的变量 */
.component .child {
    background: var(--local-bg); /* 可以使用 */
}
```

3. 变量继承和覆盖：

```css
:root {
    --color: blue;
}

.parent {
    --color: red; /* 覆盖全局变量 */
}

.child {
    color: var(--color); /* 使用父元素的red */
}
```

高级用法：

1. 回退值：

```css
.element {
    color: var(--undefined-color, #000); /* 如果变量不存在，使用黑色 */
    font-size: var(--font-size, 16px);
}
```

2. 变量嵌套：

```css
:root {
    --base-size: 16px;
    --large-size: calc(var(--base-size) * 1.5);
    --primary: #3498db;
    --primary-dark: color-mix(in srgb, var(--primary) 80%, black);
}
```

3. 动态主题切换：

```css
:root {
    --bg-color: white;
    --text-color: black;
    --border-color: #ccc;
}

[data-theme="dark"] {
    --bg-color: #333;
    --text-color: white;
    --border-color: #555;
}

body {
    background: var(--bg-color);
    color: var(--text-color);
    border-color: var(--border-color);
}
```

4. 响应式变量：

```css
:root {
    --container-width: 1200px;
    --grid-columns: 4;
    --gap: 20px;
}

@media (max-width: 768px) {
    :root {
        --container-width: 100%;
        --grid-columns: 2;
        --gap: 10px;
    }
}

.container {
    max-width: var(--container-width);
}

.grid {
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: var(--gap);
}
```

JavaScript交互：

1. 读取CSS变量：

```javascript
// 获取CSS变量值
const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-color');

console.log(primaryColor); // #3498db
```

2. 设置CSS变量：

```javascript
// 设置CSS变量
document.documentElement.style.setProperty('--primary-color', '#e74c3c');

// 或者在特定元素上设置
element.style.setProperty('--local-var', 'value');
```

3. 动态主题切换：

```javascript
function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
}
```

实际应用场景：

1. 设计系统：

```css
:root {
    /* 颜色系统 */
    --primary-50: #e3f2fd;
    --primary-100: #bbdefb;
    --primary-500: #2196f3;
    --primary-900: #0d47a1;
    
    /* 间距系统 */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    
    /* 字体系统 */
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
}
```

2. 组件库：

```css
.button {
    --button-bg: var(--primary-500);
    --button-color: white;
    --button-padding: var(--space-sm) var(--space-md);
    --button-border-radius: 4px;
    
    background: var(--button-bg);
    color: var(--button-color);
    padding: var(--button-padding);
    border-radius: var(--button-border-radius);
}

.button--secondary {
    --button-bg: transparent;
    --button-color: var(--primary-500);
}
```

浏览器兼容性：

- IE不支持
- 现代浏览器完全支持
- 可以使用PostCSS插件提供兼容性

优势：

- 原生CSS支持，无需预处理器
- 可以通过JavaScript动态修改
- 支持继承和级联
- 更好的性能表现
- 便于主题切换和维护

---
