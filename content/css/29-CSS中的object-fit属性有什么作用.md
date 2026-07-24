# 29. CSS中的object-fit属性有什么作用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

object-fit定义：

object-fit属性用于指定可替换元素（如img、video）的内容应该如何适应其容器的高度和宽度。

语法：

```css
.element {
    object-fit: fill | contain | cover | none | scale-down;
}
```

各个值的含义：

1. fill（默认值）：

```css
.image-fill {
    width: 300px;
    height: 200px;
    object-fit: fill;
}
/* 内容拉伸填满整个容器，可能导致变形 */
```

2. contain：

```css
.image-contain {
    width: 300px;
    height: 200px;
    object-fit: contain;
}
/* 保持宽高比，完整显示内容，可能有空白区域 */
```

3. cover：

```css
.image-cover {
    width: 300px;
    height: 200px;
    object-fit: cover;
}
/* 保持宽高比，填满容器，可能裁剪部分内容 */
```

4. none：

```css
.image-none {
    width: 300px;
    height: 200px;
    object-fit: none;
}
/* 保持原始尺寸，可能溢出或显示不完整 */
```

5. scale-down：

```css
.image-scale-down {
    width: 300px;
    height: 200px;
    object-fit: scale-down;
}
/* 相当于none或contain中较小的那个 */
```

配合object-position使用：

object-position属性：

```css
.image {
    width: 300px;
    height: 200px;
    object-fit: cover;
    object-position: center top; /* 定位到顶部中心 */
}

/* 使用百分比 */
.image-position {
    object-fit: cover;
    object-position: 25% 75%; /* 从左25%，从顶75% */
}

/* 使用像素值 */
.image-pixel {
    object-fit: none;
    object-position: -50px 20px; /* 向左偏移50px，向下偏移20px */
}
```

实际应用场景：

1. 响应式图片画廊：

```css
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
}

.gallery img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
}
```

2. 用户头像：

```css
.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}
```

3. 卡片图片：

```css
.card {
    width: 300px;
    border-radius: 12px;
    overflow: hidden;
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
}
```

4. 视频封面：

```css
.video-container {
    position: relative;
    width: 100%;
    height: 400px;
}

.video-background {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
```

5. 产品展示：

```css
.product-image {
    width: 250px;
    height: 250px;
    object-fit: contain; /* 保证产品完整显示 */
    object-position: center;
    background: #f5f5f5; /* 空白区域背景色 */
}
```

与background-size的对比：

background-size方式：

```css
.bg-image {
    width: 300px;
    height: 200px;
    background-image: url('image.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
```

object-fit方式：

```css
.obj-image {
    width: 300px;
    height: 200px;
    object-fit: cover;
    object-position: center;
}
```

兼容性处理：

CSS回退方案：

```css
.image {
    width: 300px;
    height: 200px;
    
    /* 不支持object-fit的浏览器回退 */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    /* 支持object-fit的浏览器 */
    object-fit: cover;
    object-position: center;
}

/* 隐藏不支持object-fit时的img */
@supports not (object-fit: cover) {
    .image {
        background-image: attr(src url);
        font-size: 0; /* 隐藏alt文本 */
    }
}
```

JavaScript检测：

```javascript
// 检测是否支持object-fit
function supportsObjectFit() {
    return 'objectFit' in document.documentElement.style;
}

if (!supportsObjectFit()) {
    // 使用polyfill或回退方案
    document.querySelectorAll('img[data-object-fit]').forEach(img => {
        const container = img.parentNode;
        container.style.backgroundImage = `url(${img.src})`;
        container.style.backgroundSize = img.dataset.objectFit;
        img.style.opacity = 0;
    });
}
```

浏览器兼容性：

- IE不支持
- Chrome 32+
- Firefox 36+
- Safari 10+
- 移动端支持良好

---
