# 19. 什么是CSS Sprites？有什么优缺点？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

CSS Sprites定义：

CSS Sprites是一种网页图片应用处理方式，它将多个小图片合并成一张大图片，然后通过CSS的background-position属性来显示所需的图片部分。

实现方法：

```css
.sprite {
    background-image: url('sprites.png');
    background-repeat: no-repeat;
    display: inline-block;
}

.icon-home {
    width: 32px;
    height: 32px;
    background-position: 0 0;
}

.icon-user {
    width: 32px;
    height: 32px;
    background-position: -32px 0;
}

.icon-settings {
    width: 32px;
    height: 32px;
    background-position: -64px 0;
}
```

优点：

1. 减少HTTP请求：多个图片合并为一个，减少服务器请求次数
2. 提高加载速度：减少网络延迟，提升页面性能
3. 减少服务器压力：降低并发请求数量
4. 缓存友好：一次加载，多次使用

缺点：

1. 维护困难：添加或修改图标需要重新生成整个Sprite图
2. 内存占用：加载整张大图，即使只使用部分图标
3. 不够灵活：图标大小固定，难以适应响应式设计
4. 开发复杂：需要精确计算坐标位置

现代替代方案：

1. 字体图标：

```css
@font-face {
    font-family: 'iconfont';
    src: url('iconfont.woff2') format('woff2');
}

.icon {
    font-family: 'iconfont';
}

.icon-home::before {
    content: '\e001';
}
```

2. SVG图标：

```html
<svg class="icon">
    <use xlink:href="#icon-home"></use>
</svg>
```

3. Base64内联：

```css
.icon {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
}
```

---
