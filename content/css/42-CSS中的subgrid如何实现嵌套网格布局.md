# 42. CSS中的subgrid如何实现嵌套网格布局？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

subgrid定义：

CSS Subgrid是CSS Grid Layout的扩展，允许网格项目继承其父网格的行或列轨道，实现更复杂和一致的嵌套网格布局。

基本语法：

```css
.parent-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 100px);
}

.child-grid {
    display: grid;
    grid-column: 2 / 4;  /* 占据父网格的列2-4 */
    grid-row: 1 / 3;     /* 占据父网格的行1-3 */
    
    /* 继承父网格的列轨道 */
    grid-template-columns: subgrid;
    /* 继承父网格的行轨道 */
    grid-template-rows: subgrid;
}
```

基本用法示例：

1. 继承列轨道：

```css
.main-grid {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    gap: 20px;
}

.content-section {
    grid-column: 1 / -1; /* 跨越所有列 */
    display: grid;
    grid-template-columns: subgrid; /* 继承父网格的3列 */
}

.content-section .item {
    /* 这些项目会自动对齐到父网格的列 */
}
```

2. 继承行轨道：

```css
.layout-grid {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.main-content {
    display: grid;
    grid-template-rows: subgrid; /* 继承父网格的行结构 */
    grid-row: 1 / -1; /* 跨越所有行 */
}
```

实际应用场景：

1. 卡片网格对齐：

```html
<div class="card-grid">
    <div class="card">
        <img src="image1.jpg" alt="Image 1">
        <h3>Short Title</h3>
        <p>Brief description</p>
        <button>Read More</button>
    </div>
    <div class="card">
        <img src="image2.jpg" alt="Image 2">
        <h3>This is a Much Longer Title That Spans Multiple Lines</h3>
        <p>This is a longer description that provides more detail about the content</p>
        <button>Read More</button>
    </div>
    <div class="card">
        <img src="image3.jpg" alt="Image 3">
        <h3>Medium Length Title</h3>
        <p>Standard description length</p>
        <button>Read More</button>
    </div>
</div>
```

```css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    /* 定义隐式行，让所有卡片内容对齐 */
    grid-template-rows: repeat(auto-fit, auto);
}

.card {
    display: grid;
    grid-template-rows: subgrid; /* 继承父网格的行结构 */
    grid-row: span 4; /* 每个卡片占据4行 */
    
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
}

.card h3 {
    margin: 15px 0 10px 0;
    /* 标题会自动对齐到同一行 */
}

.card p {
    margin-bottom: 15px;
    flex-grow: 1; /* 描述区域填充可用空间 */
}

.card button {
    margin-top: auto; /* 按钮始终在底部对齐 */
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
```

2. 表单布局对齐：

```html
<form class="form-grid">
    <div class="form-section">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" required>
        <span class="error-message">This field is required</span>
    </div>
    <div class="form-section">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" required>
        <span class="error-message"></span>
    </div>
    <div class="form-section">
        <label for="email">Email Address</label>
        <input type="email" id="email" required>
        <span class="error-message">Please enter a valid email</span>
    </div>
</form>
```

```css
.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    /* 定义每个表单字段的行结构 */
    grid-template-rows: repeat(auto-fit, auto auto auto);
}

.form-section {
    display: grid;
    grid-template-rows: subgrid; /* 继承父网格的行结构 */
    grid-row: span 3; /* 每个section占据3行：label, input, error */
    gap: 5px;
}

.form-section label {
    font-weight: 500;
    color: #333;
    /* 所有标签都对齐到第一行 */
}

.form-section input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    /* 所有输入框都对齐到第二行 */
}

.form-section .error-message {
    font-size: 0.875rem;
    color: #dc3545;
    min-height: 1.2em; /* 确保即使为空也占据空间 */
    /* 所有错误信息都对齐到第三行 */
}
```

3. 复杂页面布局：

```css
.page-layout {
    display: grid;
    grid-template-columns: 250px 1fr 200px;
    grid-template-rows: 60px 1fr 40px;
    grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    min-height: 100vh;
    gap: 20px;
}

.main-content {
    grid-area: main;
    display: grid;
    grid-template-columns: subgrid; /* 继承主网格的列结构 */
    grid-template-rows: subgrid;    /* 继承主网格的行结构 */
    gap: inherit; /* 继承父网格的间距 */
}

.article-grid {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1; /* 跨越所有可用列 */
    gap: 15px;
}

.article {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

4. 数据表格对齐：

```css
.data-grid {
    display: grid;
    grid-template-columns: 100px 1fr 120px 80px;
    gap: 1px;
    background: #e5e7eb; /* 网格线颜色 */
}

.table-header,
.table-row {
    display: grid;
    grid-template-columns: subgrid; /* 继承父网格的列结构 */
    grid-column: 1 / -1; /* 跨越所有列 */
    background: white;
}

.table-header {
    font-weight: 600;
    background: #f3f4f6;
}

.table-cell {
    padding: 12px 16px;
    border-right: 1px solid #e5e7eb;
}

.table-cell:last-child {
    border-right: none;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .data-grid {
        grid-template-columns: 1fr 100px;
    }
    
    .table-cell:nth-child(3),
    .table-cell:nth-child(4) {
        display: none;
    }
}
```

命名网格线的继承：

```css
.parent-grid {
    display: grid;
    grid-template-columns: 
        [start] 200px 
        [content-start] 1fr 
        [content-end] 200px 
        [end];
    grid-template-rows:
        [header-start] 60px
        [main-start] 1fr
        [main-end] 40px
        [footer-end];
}

.content-area {
    grid-column: content-start / content-end;
    grid-row: main-start / main-end;
    
    display: grid;
    grid-template-columns: subgrid; /* 继承命名的网格线 */
    grid-template-rows: subgrid;
}

.nested-item {
    /* 可以使用继承的网格线名称 */
    grid-column: content-start;
    grid-row: main-start;
}
```

gap的继承和覆盖：

```css
.parent-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.subgrid-container {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    gap: inherit; /* 继承父网格的gap */
}

.custom-gap-subgrid {
    grid-column: 2 / 4;
    display: grid;
    grid-template-columns: subgrid;
    gap: 10px; /* 覆盖父网格的gap */
}
```

与其他CSS特性的结合：

1. 与容器查询结合：

```css
.responsive-subgrid {
    container-type: inline-size;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.adaptive-section {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
}

@container (max-width: 600px) {
    .adaptive-section {
        grid-template-columns: 1fr; /* 在小容器中不使用subgrid */
    }
}
```

2. 与CSS动画结合：

```css
.animated-subgrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    transition: grid-template-columns 0.3s ease;
}

.animated-subgrid:hover {
    grid-template-columns: 2fr 1fr 1fr;
}

.subgrid-item {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    /* 子网格会自动适应父网格的动画变化 */
}
```

调试和开发工具：

```css
/* 开发时显示网格线 */
.debug-grid {
    background-image: 
        linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px);
    background-size: 20px 20px;
}

.debug-subgrid {
    background-image: 
        linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px);
    background-size: inherit;
}
```

浏览器兼容性：

- Firefox 71+
- Chrome/Safari: 尚未支持（截至2024年）
- IE不支持

回退方案：

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.grid-item {
    display: grid;
    /* 回退：不使用subgrid */
    grid-template-columns: 1fr;
    gap: 10px;
}

/* 支持subgrid时使用 */
@supports (grid-template-columns: subgrid) {
    .grid-item {
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
        gap: inherit;
    }
}
```

最佳实践：

- 在需要对齐嵌套网格内容时使用subgrid
- 合理使用gap的继承和覆盖
- 为不支持的浏览器提供回退方案
- 结合命名网格线提高代码可读性
- 避免过深的subgrid嵌套
- 在复杂布局中优先考虑subgrid解决方案

---
