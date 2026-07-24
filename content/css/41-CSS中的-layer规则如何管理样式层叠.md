# 41. CSS中的@layer规则如何管理样式层叠？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

@layer规则定义：

@layer规则允许开发者明确定义CSS的层叠顺序，创建命名的层级，从而更好地控制样式的优先级和组织结构。

基本语法：

```css
/* 声明层级顺序 */
@layer reset, base, components, utilities;

/* 在层级中定义样式 */
@layer base {
    body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
    }
}
```

层级声明方式：

1. 预先声明层级顺序：

```css
/* 声明层级的优先级顺序（从低到高） */
@layer reset, normalize, base, layout, components, utilities, overrides;
```

2. 直接在层级中定义样式：

```css
@layer reset {
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
}

@layer base {
    body {
        font-family: 'Inter', sans-serif;
        color: #333;
        background: #fff;
    }
    
    h1, h2, h3 {
        margin-bottom: 1rem;
    }
}
```

3. 嵌套层级：

```css
@layer framework {
    @layer reset {
        * { margin: 0; padding: 0; }
    }
    
    @layer base {
        body { font-family: Arial, sans-serif; }
    }
    
    @layer components {
        .button { padding: 8px 16px; }
    }
}
```

实际应用场景：

1. 设计系统架构：

```css
/* 声明设计系统的层级结构 */
@layer reset, tokens, base, layout, components, utilities, overrides;

/* Reset层 - 最低优先级 */
@layer reset {
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    html {
        -webkit-text-size-adjust: 100%;
    }
    
    body {
        line-height: 1.5;
    }
}

/* 设计令牌层 */
@layer tokens {
    :root {
        --color-primary: #007bff;
        --color-secondary: #6c757d;
        --spacing-sm: 0.5rem;
        --spacing-md: 1rem;
        --spacing-lg: 1.5rem;
        --border-radius: 0.375rem;
    }
}

/* 基础样式层 */
@layer base {
    body {
        font-family: system-ui, -apple-system, sans-serif;
        color: var(--color-text);
        background: var(--color-background);
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-weight: 600;
        line-height: 1.25;
        margin-bottom: var(--spacing-sm);
    }
    
    a {
        color: var(--color-primary);
        text-decoration: none;
    }
    
    a:hover {
        text-decoration: underline;
    }
}
```

2. 组件库管理：

```css
/* 组件库的层级结构 */
@layer reset, base, layout, components, utilities;

/* 布局组件 */
@layer layout {
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-md);
    }
    
    .grid {
        display: grid;
        gap: var(--spacing-md);
    }
    
    .flex {
        display: flex;
        gap: var(--spacing-sm);
    }
}

/* UI组件 */
@layer components {
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-sm) var(--spacing-md);
        border: 1px solid transparent;
        border-radius: var(--border-radius);
        font-size: 0.875rem;
        font-weight: 500;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .button--primary {
        background: var(--color-primary);
        color: white;
        border-color: var(--color-primary);
    }
    
    .button--secondary {
        background: transparent;
        color: var(--color-primary);
        border-color: var(--color-primary);
    }
    
    .card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: var(--border-radius);
        padding: var(--spacing-lg);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .card__header {
        margin-bottom: var(--spacing-md);
        padding-bottom: var(--spacing-sm);
        border-bottom: 1px solid #e5e7eb;
    }
    
    .card__title {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0;
    }
}

/* 工具类 */
@layer utilities {
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .font-bold { font-weight: 700; }
    .hidden { display: none; }
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
}
```

3. 第三方库集成：

```css
/* 主应用样式层级 */
@layer reset, vendor, base, components, pages, utilities;

/* 第三方库样式 */
@layer vendor {
    /* 引入第三方CSS库 */
    @import url('bootstrap.css');
    @import url('prism.css');
}

/* 覆盖第三方样式 */
@layer components {
    /* 自定义Bootstrap按钮样式 */
    .btn-custom {
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        border: none;
        color: white;
    }
    
    /* 自定义代码高亮样式 */
    .code-block {
        border-radius: 8px;
        overflow: hidden;
    }
}
```

4. 主题系统：

```css
@layer reset, themes, base, components, utilities;

/* 主题层 */
@layer themes {
    /* 默认主题 */
    :root {
        --theme-bg: #ffffff;
        --theme-text: #1a1a1a;
        --theme-primary: #007bff;
        --theme-border: #e5e7eb;
    }
    
    /* 暗色主题 */
    [data-theme="dark"] {
        --theme-bg: #1a1a1a;
        --theme-text: #ffffff;
        --theme-primary: #4dabf7;
        --theme-border: #374151;
    }
    
    /* 高对比度主题 */
    [data-theme="high-contrast"] {
        --theme-bg: #000000;
        --theme-text: #ffffff;
        --theme-primary: #ffff00;
        --theme-border: #ffffff;
    }
}

@layer base {
    body {
        background: var(--theme-bg);
        color: var(--theme-text);
        transition: background-color 0.2s, color 0.2s;
    }
}

@layer components {
    .card {
        background: var(--theme-bg);
        border-color: var(--theme-border);
        color: var(--theme-text);
    }
    
    .button--primary {
        background: var(--theme-primary);
    }
}
```

层级优先级规则：

```css
/* 层级顺序决定优先级 */
@layer A, B, C;

@layer A {
    .element { color: red; }
}

@layer B {
    .element { color: blue; } /* 优先级高于层级A */
}

@layer C {
    .element { color: green; } /* 优先级最高 */
}

/* 无层级的样式优先级最高 */
.element { color: purple; } /* 优先级高于所有层级 */
```

匿名层级：

```css
/* 匿名层级，按出现顺序排列优先级 */
@layer {
    .element { color: red; }
}

@layer {
    .element { color: blue; } /* 优先级更高 */
}

/* 命名层级可以在匿名层级之间插入 */
@layer named {
    .element { color: green; }
}
```

条件层级：

```css
/* 结合媒体查询 */
@media (max-width: 768px) {
    @layer mobile {
        .container {
            padding: var(--spacing-sm);
        }
        
        .button {
            width: 100%;
        }
    }
}

/* 结合特性查询 */
@supports (display: grid) {
    @layer modern {
        .layout {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
    }
}
```

JavaScript交互：

```javascript
// 检测@layer支持
function supportsLayers() {
    return CSS.supports('@layer', 'base');
}

// 动态添加层级样式
function addLayerStyles(layerName, styles) {
    if (supportsLayers()) {
        const styleSheet = new CSSStyleSheet();
        styleSheet.insertRule(`@layer ${layerName} { ${styles} }`);
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
    } else {
        // 回退方案
        const style = document.createElement('style');
        style.textContent = styles;
        document.head.appendChild(style);
    }
}

// 使用示例
addLayerStyles('dynamic', `
    .dynamic-component {
        background: #f0f0f0;
        padding: 1rem;
        border-radius: 4px;
    }
`);
```

调试和开发工具：

```css
/* 开发时显示层级信息 */
@layer debug {
    [data-debug="true"] * {
        position: relative;
    }
    
    [data-debug="true"] *::before {
        content: attr(class);
        position: absolute;
        top: 0;
        left: 0;
        font-size: 10px;
        background: rgba(255, 0, 0, 0.8);
        color: white;
        padding: 2px 4px;
        pointer-events: none;
        z-index: 9999;
    }
}
```

最佳实践：

```css
/* 推荐的层级结构 */
@layer 
    reset,           /* CSS重置 */
    normalize,       /* 标准化样式 */
    tokens,          /* 设计令牌 */
    base,           /* 基础元素样式 */
    layout,         /* 布局组件 */
    components,     /* UI组件 */
    patterns,       /* 复合组件 */
    utilities,      /* 工具类 */
    overrides;      /* 特殊覆盖 */

/* 保持层级内容聚焦 */
@layer components {
    /* 只包含组件相关样式 */
    .button { /* ... */ }
    .card { /* ... */ }
    .modal { /* ... */ }
}

/* 避免跨层级依赖 */
@layer base {
    /* 不要依赖components层的样式 */
    body { font-family: Arial, sans-serif; }
}
```

浏览器兼容性：

- Chrome 99+
- Firefox 97+
- Safari 15.4+
- IE不支持

回退策略：

```css
/* 不支持@layer时的回退 */
@supports not at-rule(@layer) {
    /* 使用传统的特异性管理 */
    .reset-styles { /* 低特异性 */ }
    .component-styles { /* 中等特异性 */ }
    .utility-styles { /* 高特异性 */ }
}
```

优势总结：

- 明确的样式层级管理
- 更好的团队协作
- 减少特异性冲突
- 更容易维护和调试
- 支持大型项目的CSS架构
- 与现有工具和框架良好集成

---
