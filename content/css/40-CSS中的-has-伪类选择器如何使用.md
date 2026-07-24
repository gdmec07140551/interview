# 40. CSS中的:has()伪类选择器如何使用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

:has()伪类定义：

:has()伪类选择器（也被称为"父选择器"）允许开发者基于元素的后代、兄弟元素或其他相关元素来选择该元素，实现了"向上"选择的能力。

基本语法：

```css
.parent:has(.child) {
    /* 选择包含.child的.parent元素 */
}
```

基础用法：

1. 选择包含特定子元素的父元素：

```css
/* 选择包含图片的文章 */
.article:has(img) {
    padding-top: 0;
}

/* 选择包含视频的容器 */
.container:has(video) {
    background: #000;
    padding: 20px;
}

/* 选择包含表单的section */
.section:has(form) {
    border: 2px solid #007bff;
    border-radius: 8px;
}
```

2. 基于直接子元素选择：

```css
/* 选择直接包含h1的div */
div:has(> h1) {
    margin-bottom: 30px;
}

/* 选择直接包含按钮的表单组 */
.form-group:has(> button) {
    text-align: right;
}
```

3. 基于兄弟元素选择：

```css
/* 选择后面跟着.error的input */
input:has(+ .error) {
    border-color: red;
}

/* 选择前面有label的input */
input:has(~ label) {
    margin-top: 5px;
}
```

实际应用场景：

1. 卡片组件自适应：

```html
<div class="card">
    <img src="image.jpg" alt="Card image">
    <div class="card-content">
        <h3>Card Title</h3>
        <p>Card description</p>
    </div>
</div>

<div class="card">
    <div class="card-content">
        <h3>Card without image</h3>
        <p>This card has no image</p>
    </div>
</div>
```

```css
.card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 有图片的卡片 */
.card:has(img) {
    display: flex;
    flex-direction: column;
}

.card:has(img) img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

/* 没有图片的卡片 */
.card:not(:has(img)) {
    padding: 20px;
    border-left: 4px solid #007bff;
}
```

2. 表单验证状态：

```html
<div class="form-field">
    <label for="email">Email</label>
    <input type="email" id="email" required>
    <span class="error">Please enter a valid email</span>
</div>
```

```css
.form-field {
    margin-bottom: 20px;
}

.form-field input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* 包含错误信息的表单字段 */
.form-field:has(.error:not(:empty)) {
    margin-bottom: 30px;
}

.form-field:has(.error:not(:empty)) input {
    border-color: #dc3545;
    background-color: #fff5f5;
}

.form-field:has(.error:not(:empty)) label {
    color: #dc3545;
}

/* 包含有效输入的表单字段 */
.form-field:has(input:valid) input {
    border-color: #28a745;
}

.form-field:has(input:valid) label {
    color: #28a745;
}
```

3. 导航菜单状态：

```css
/* 包含活跃链接的导航项 */
.nav-item:has(.nav-link.active) {
    background-color: #e3f2fd;
    border-radius: 6px;
}

/* 包含下拉菜单的导航项 */
.nav-item:has(.dropdown-menu) {
    position: relative;
}

.nav-item:has(.dropdown-menu):hover .dropdown-menu {
    display: block;
}

/* 包含徽章的导航项 */
.nav-item:has(.badge) .nav-link {
    padding-right: 30px;
    position: relative;
}
```

4. 内容布局优化：

```css
/* 包含侧边栏的主容器 */
.main-container:has(.sidebar) {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 30px;
}

/* 没有侧边栏的主容器 */
.main-container:not(:has(.sidebar)) .content {
    max-width: 800px;
    margin: 0 auto;
}

/* 包含多个section的article */
.article:has(.section:nth-child(3)) {
    column-count: 2;
    column-gap: 40px;
}
```

5. 购物车和电商应用：

```css
/* 包含商品的购物车 */
.shopping-cart:has(.cart-item) {
    border: 2px solid #28a745;
    background-color: #f8fff9;
}

.shopping-cart:has(.cart-item) .empty-message {
    display: none;
}

/* 空购物车 */
.shopping-cart:not(:has(.cart-item)) .checkout-button {
    opacity: 0.5;
    pointer-events: none;
}

/* 包含折扣的商品 */
.product:has(.discount) {
    border: 2px solid #ff6b35;
    position: relative;
}

.product:has(.discount)::before {
    content: "SALE";
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ff6b35;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
}
```

复杂选择器组合：

1. 多条件选择：

```css
/* 同时包含图片和视频的容器 */
.media-container:has(img):has(video) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

/* 包含标题但不包含图片的文章 */
.article:has(h1):not(:has(img)) {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
}
```

2. 嵌套选择：

```css
/* 选择包含active链接的导航容器的父元素 */
.header:has(.nav:has(.nav-link.active)) {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 选择包含错误表单字段的表单 */
.form:has(.form-field:has(.error:not(:empty))) {
    border-left: 4px solid #dc3545;
    padding-left: 16px;
}
```

3. 状态组合：

```css
/* 包含焦点输入框的表单组 */
.form-group:has(input:focus) {
    background-color: #f8f9fa;
    border-radius: 4px;
    padding: 8px;
    margin: -8px;
}

/* 包含悬停按钮的卡片 */
.card:has(button:hover) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    transition: all 0.2s ease;
}
```

响应式应用：

```css
/* 在大屏幕上，包含多个子项的容器使用网格布局 */
@media (min-width: 768px) {
    .container:has(.item:nth-child(4)) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
}

@media (min-width: 1200px) {
    .container:has(.item:nth-child(7)) {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

性能考虑：

```css
/* 避免过于复杂的选择器 */
/* 不推荐 */
.container:has(.item:has(.content:has(.title:has(.icon)))) {
    /* 过于复杂，影响性能 */
}

/* 推荐 */
.container:has(.item.has-icon) {
    /* 使用类名简化选择器 */
}
```

JavaScript配合使用：

```javascript
// 检测:has()支持
function supportsHas() {
    try {
        return CSS.supports('selector(:has(div))');
    } catch {
        return false;
    }
}

if (!supportsHas()) {
    // 提供JavaScript回退方案
    document.querySelectorAll('.card').forEach(card => {
        if (card.querySelector('img')) {
            card.classList.add('has-image');
        }
    });
}

// 动态更新基于:has()的样式
function updateCardStates() {
    document.querySelectorAll('.card').forEach(card => {
        const hasImage = card.querySelector('img');
        const hasVideo = card.querySelector('video');
        
        card.classList.toggle('has-media', hasImage || hasVideo);
        card.classList.toggle('text-only', !hasImage && !hasVideo);
    });
}
```

浏览器兼容性：

- Chrome 105+
- Firefox 121+
- Safari 15.4+
- IE不支持

Polyfill方案：

```javascript
// 简单的:has()polyfill概念
function hasPolyfill() {
    if (!CSS.supports('selector(:has(div))')) {
        const style = document.createElement('style');
        document.head.appendChild(style);
        
        // 模拟:has()行为
        document.querySelectorAll('[data-has]').forEach(element => {
            const selector = element.dataset.has;
            if (element.querySelector(selector)) {
                element.classList.add('has-match');
            }
        });
    }
}
```

最佳实践：

- 避免过度复杂的嵌套选择器
- 优先使用直接子选择器(>)提高性能
- 结合类名使用，避免纯结构依赖
- 为不支持的浏览器提供回退方案
- 在组件设计中充分利用:has()的能力
- 注意选择器的性能影响，避免过于复杂的查询

---
