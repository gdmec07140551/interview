# 33. CSS中的aspect-ratio属性如何使用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

aspect-ratio定义：

aspect-ratio属性用于设置元素的首选宽高比，浏览器会根据这个比例自动计算元素的尺寸。

基本语法：

```css
.element {
    aspect-ratio: <ratio> | auto;
}
```

使用方式：

1. 数字比例：

```css
.square {
    aspect-ratio: 1; /* 1:1 正方形 */
    width: 200px; /* 高度自动为200px */
}

.rectangle {
    aspect-ratio: 16/9; /* 16:9 宽屏比例 */
    width: 100%;
}

.portrait {
    aspect-ratio: 3/4; /* 3:4 竖屏比例 */
    height: 400px; /* 宽度自动为300px */
}
```

2. 小数比例：

```css
.golden-ratio {
    aspect-ratio: 1.618; /* 黄金比例 */
    width: 300px;
}

.custom-ratio {
    aspect-ratio: 2.5; /* 自定义比例 */
    height: 200px;
}
```

3. auto值：

```css
.auto-ratio {
    aspect-ratio: auto; /* 使用内容的自然宽高比 */
}

.conditional-ratio {
    aspect-ratio: auto 16/9; /* 有内容时用auto，否则用16/9 */
}
```

实际应用场景：

1. 响应式视频容器：

```css
.video-container {
    aspect-ratio: 16/9;
    width: 100%;
    background: #000;
    position: relative;
}

.video-container iframe,
.video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

2. 图片占位符：

```css
.image-placeholder {
    aspect-ratio: 4/3;
    width: 100%;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-placeholder img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}
```

3. 卡片布局：

```css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.card {
    aspect-ratio: 1.2; /* 稍微宽一点的矩形 */
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
}
```

4. 社交媒体帖子：

```css
.instagram-post {
    aspect-ratio: 1; /* Instagram正方形 */
    max-width: 400px;
    background: #fff;
    border: 1px solid #ddd;
}

.story-preview {
    aspect-ratio: 9/16; /* 竖屏故事比例 */
    width: 100px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border-radius: 8px;
}
```

5. 产品展示：

```css
.product-image {
    aspect-ratio: 1;
    width: 100%;
    background: #f8f9fa;
    border-radius: 12px;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

与其他属性的配合：

1. 与Grid布局：

```css
.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}

.photo-item {
    aspect-ratio: 1;
    background: #eee;
    border-radius: 8px;
    overflow: hidden;
}
```

2. 与Flexbox：

```css
.flex-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.flex-item {
    aspect-ratio: 16/9;
    flex: 1;
    min-width: 250px;
    background: #007bff;
    border-radius: 8px;
}
```

3. 与object-fit：

```css
.media-container {
    aspect-ratio: 21/9; /* 超宽屏比例 */
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
}

.media-container img,
.media-container video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

响应式应用：

1. 不同屏幕尺寸的比例：

```css
.responsive-ratio {
    aspect-ratio: 4/3; /* 默认比例 */
    width: 100%;
}

@media (max-width: 768px) {
    .responsive-ratio {
        aspect-ratio: 1; /* 移动端改为正方形 */
    }
}

@media (min-width: 1200px) {
    .responsive-ratio {
        aspect-ratio: 21/9; /* 大屏幕使用超宽比例 */
    }
}
```

2. 容器查询配合：

```css
.container {
    container-type: inline-size;
}

.adaptive-ratio {
    aspect-ratio: 16/9;
}

@container (max-width: 400px) {
    .adaptive-ratio {
        aspect-ratio: 1;
    }
}
```

替代方案（兼容性处理）：

1. 使用padding-top技巧：

```css
/* 传统方法：16:9比例 */
.aspect-ratio-16-9 {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 9/16 * 100% */
}

.aspect-ratio-16-9 > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* 现代方法 */
.modern-aspect-ratio {
    aspect-ratio: 16/9;
    width: 100%;
}
```

2. JavaScript回退：

```javascript
// 检测aspect-ratio支持
if (!CSS.supports('aspect-ratio', '1')) {
    // 使用JavaScript实现回退
    function maintainAspectRatio(element, ratio) {
        const updateHeight = () => {
            const width = element.offsetWidth;
            element.style.height = `${width / ratio}px`;
        };
        
        updateHeight();
        window.addEventListener('resize', updateHeight);
    }
    
    document.querySelectorAll('.aspect-ratio-fallback').forEach(el => {
        const ratio = parseFloat(el.dataset.ratio) || 1;
        maintainAspectRatio(el, ratio);
    });
}
```

动画效果：

```css
.animated-ratio {
    aspect-ratio: 1;
    width: 200px;
    background: #3498db;
    transition: aspect-ratio 0.3s ease;
}

.animated-ratio:hover {
    aspect-ratio: 2; /* 悬停时变为2:1 */
}
```

浏览器兼容性：

- Chrome 88+
- Firefox 89+
- Safari 15+
- IE不支持

最佳实践：

- 优先使用aspect-ratio而非padding-top技巧
- 结合object-fit处理媒体内容
- 在响应式设计中灵活调整比例
- 为不支持的浏览器提供回退方案
- 考虑内容的实际需求选择合适比例

---
