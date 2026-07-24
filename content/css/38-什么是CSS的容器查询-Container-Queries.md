# 38. 什么是CSS的容器查询（Container Queries）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

容器查询定义：

CSS容器查询允许开发者根据容器元素的尺寸来应用样式，而不是根据视口尺寸。这使得组件能够根据其父容器的大小自适应，实现真正的组件级响应式设计。

基本语法：

```css
/* 定义容器 */
.container {
    container-type: inline-size | block-size | size | normal;
    container-name: sidebar; /* 可选的容器名称 */
}

/* 容器查询 */
@container (min-width: 400px) {
    .card {
        display: flex;
    }
}
```

container-type属性：

1. inline-size：

```css
.container {
    container-type: inline-size;
    /* 只能查询内联方向的尺寸（通常是宽度） */
}

@container (min-width: 300px) {
    .card {
        flex-direction: row;
    }
}
```

2. block-size：

```css
.container {
    container-type: block-size;
    /* 只能查询块方向的尺寸（通常是高度） */
}

@container (min-height: 200px) {
    .content {
        padding: 20px;
    }
}
```

3. size：

```css
.container {
    container-type: size;
    /* 可以查询两个方向的尺寸 */
}

@container (min-width: 300px) and (min-height: 200px) {
    .card {
        display: grid;
        grid-template-columns: 1fr 2fr;
    }
}
```

实际应用场景：

1. 响应式卡片组件：

```html
<div class="card-container">
    <div class="card">
        <img src="image.jpg" alt="Card image">
        <div class="card-content">
            <h3>Card Title</h3>
            <p>Card description...</p>
            <button>Read More</button>
        </div>
    </div>
</div>
```

```css
.card-container {
    container-type: inline-size;
    width: 100%; /* 可以是任意宽度 */
}

.card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 小容器：垂直布局 */
.card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 16px;
}

/* 大容器：水平布局 */
@container (min-width: 400px) {
    .card {
        display: flex;
    }
    
    .card img {
        width: 150px;
        height: auto;
        flex-shrink: 0;
    }
    
    .card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}
```

2. 侧边栏自适应：

```css
.sidebar {
    container-type: inline-size;
    container-name: sidebar;
    width: 250px; /* 可变宽度 */
}

.nav-menu {
    list-style: none;
    padding: 0;
}

.nav-item {
    padding: 8px 12px;
}

.nav-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
}

.nav-icon {
    margin-right: 8px;
}

.nav-text {
    display: none; /* 默认隐藏文字 */
}

/* 宽度足够时显示文字 */
@container sidebar (min-width: 200px) {
    .nav-text {
        display: block;
    }
}

/* 更宽时调整布局 */
@container sidebar (min-width: 300px) {
    .nav-item {
        padding: 12px 16px;
    }
    
    .nav-link {
        font-size: 1.1rem;
    }
}
```

3. 数据表格响应式：

```css
.table-container {
    container-type: inline-size;
    overflow-x: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table th,
.data-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

/* 小容器：隐藏次要列 */
.secondary-column {
    display: none;
}

@container (min-width: 600px) {
    .secondary-column {
        display: table-cell;
    }
}

@container (min-width: 800px) {
    .data-table th,
    .data-table td {
        padding: 12px;
    }
    
    .tertiary-column {
        display: table-cell;
    }
}
```

4. 媒体对象组件：

```css
.media-container {
    container-type: inline-size;
}

.media-object {
    display: flex;
    gap: 16px;
}

.media-image {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}

.media-content {
    flex: 1;
}

/* 大容器时增大图片 */
@container (min-width: 400px) {
    .media-image {
        width: 80px;
        height: 80px;
    }
    
    .media-object {
        gap: 20px;
    }
}

/* 超大容器时垂直居中 */
@container (min-width: 600px) {
    .media-object {
        align-items: center;
    }
    
    .media-image {
        width: 100px;
        height: 100px;
    }
}
```

命名容器：

```css
.main-content {
    container-type: inline-size;
    container-name: main;
}

.sidebar {
    container-type: inline-size;
    container-name: sidebar;
}

/* 针对特定容器的查询 */
@container main (min-width: 800px) {
    .article {
        columns: 2;
        column-gap: 40px;
    }
}

@container sidebar (max-width: 200px) {
    .widget {
        display: none;
    }
}
```

容器查询单位：

```css
.container {
    container-type: size;
}

@container (min-width: 400px) {
    .element {
        /* 容器查询单位 */
        width: 50cqw;      /* 50% 容器宽度 */
        height: 25cqh;     /* 25% 容器高度 */
        font-size: 4cqi;   /* 4% 容器内联尺寸 */
        margin: 2cqb;      /* 2% 容器块尺寸 */
        padding: 1cqmin;   /* 1% 容器较小尺寸 */
        border-width: 0.5cqmax; /* 0.5% 容器较大尺寸 */
    }
}
```

与媒体查询的结合：

```css
.responsive-component {
    container-type: inline-size;
}

/* 移动端基础样式 */
@media (max-width: 768px) {
    .component {
        padding: 10px;
    }
    
    /* 移动端的容器查询 */
    @container (min-width: 300px) {
        .component {
            padding: 15px;
        }
    }
}

/* 桌面端样式 */
@media (min-width: 769px) {
    .component {
        padding: 20px;
    }
    
    /* 桌面端的容器查询 */
    @container (min-width: 500px) {
        .component {
            padding: 30px;
            display: grid;
            grid-template-columns: 1fr 2fr;
        }
    }
}
```

JavaScript交互：

```javascript
// 检测容器查询支持
function supportsContainerQueries() {
    return CSS.supports('container-type', 'inline-size');
}

if (supportsContainerQueries()) {
    console.log('Container queries are supported');
} else {
    // 提供polyfill或回退方案
    console.log('Container queries not supported');
}

// 动态设置容器类型
function setupContainerQuery(element, type = 'inline-size') {
    if (supportsContainerQueries()) {
        element.style.containerType = type;
    }
}
```

性能考虑：

```css
/* 避免过深的嵌套 */
.container {
    container-type: inline-size;
    contain: layout style; /* 优化性能 */
}

/* 合理使用容器查询 */
@container (min-width: 300px) {
    .component {
        /* 避免触发大量重排的属性 */
        transform: scale(1.1);
        opacity: 1;
    }
}
```

浏览器兼容性：

- Chrome 105+
- Firefox 110+
- Safari 16+
- IE不支持

Polyfill方案：

```javascript
// 简单的容器查询polyfill概念
class ContainerQueryPolyfill {
    constructor() {
        this.containers = new Map();
        this.observer = new ResizeObserver(this.handleResize.bind(this));
    }
    
    observe(element, queries) {
        this.containers.set(element, queries);
        this.observer.observe(element);
    }
    
    handleResize(entries) {
        entries.forEach(entry => {
            const element = entry.target;
            const queries = this.containers.get(element);
            const width = entry.contentRect.width;
            
            queries.forEach(query => {
                const matches = width >= query.minWidth;
                element.classList.toggle(query.className, matches);
            });
        });
    }
}
```

最佳实践：

- 优先考虑使用容器查询而非媒体查询
- 合理设置container-type避免性能问题
- 为不支持的浏览器提供回退方案
- 结合CSS Grid和Flexbox使用
- 避免过度嵌套容器查询
- 测试各种容器尺寸下的表现

---
