# 34. CSS中的scroll-behavior属性有什么作用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

scroll-behavior定义：

scroll-behavior属性用于设置滚动框中滚动行为的表现，特别是通过导航或CSSOM滚动API触发的滚动。

语法：

```css
.element {
    scroll-behavior: auto | smooth;
}
```

属性值：

1. auto（默认值）：

```css
.auto-scroll {
    scroll-behavior: auto;
    /* 立即跳转，没有平滑动画 */
}
```

2. smooth：

```css
.smooth-scroll {
    scroll-behavior: smooth;
    /* 平滑滚动动画 */
}
```

应用场景：

1. 全局平滑滚动：

```css
html {
    scroll-behavior: smooth;
}

/* 所有锚点链接都会平滑滚动 */
```

2. 特定容器的平滑滚动：

```css
.scroll-container {
    height: 300px;
    overflow-y: auto;
    scroll-behavior: smooth;
}
```

3. 导航菜单应用：

```html
<nav class="navbar">
    <a href="#section1">Section 1</a>
    <a href="#section2">Section 2</a>
    <a href="#section3">Section 3</a>
</nav>

<section id="section1">Content 1</section>
<section id="section2">Content 2</section>
<section id="section3">Content 3</section>
```

```css
html {
    scroll-behavior: smooth;
}

.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: white;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar a {
    margin-right: 20px;
    text-decoration: none;
    color: #333;
}

section {
    height: 100vh;
    padding: 80px 20px 20px;
}
```

4. 侧边栏滚动：

```css
.sidebar {
    height: 100vh;
    overflow-y: auto;
    scroll-behavior: smooth;
}

.sidebar-nav a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #666;
}
```

5. 表格滚动：

```css
.table-container {
    max-height: 400px;
    overflow-y: auto;
    scroll-behavior: smooth;
}

.table-nav button {
    margin: 5px;
    padding: 5px 10px;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}
```

与JavaScript的配合：

1. scrollIntoView方法：

```javascript
// CSS设置了scroll-behavior: smooth时，这些方法会自动平滑滚动
document.getElementById('target').scrollIntoView();

// 也可以在方法中指定行为
document.getElementById('target').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
});
```

2. scrollTo方法：

```javascript
// 平滑滚动到顶部
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});

// 滚动到指定位置
window.scrollTo({
    top: 1000,
    left: 0,
    behavior: 'smooth'
});
```

3. 自定义滚动按钮：

```html
<button id="scrollToTop">回到顶部</button>
<button id="scrollToBottom">滚动到底部</button>
```

```css
html {
    scroll-behavior: smooth;
}

#scrollToTop, #scrollToBottom {
    position: fixed;
    right: 20px;
    padding: 10px 15px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#scrollToTop {
    bottom: 70px;
}

#scrollToBottom {
    bottom: 20px;
}
```

```javascript
document.getElementById('scrollToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('scrollToBottom').addEventListener('click', () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});
```

高级应用：

1. 条件性平滑滚动：

```css
/* 默认不平滑 */
html {
    scroll-behavior: auto;
}

/* 用户偏好减少动画时保持auto */
@media (prefers-reduced-motion: no-preference) {
    html {
        scroll-behavior: smooth;
    }
}
```

2. 不同容器不同行为：

```css
.instant-scroll {
    scroll-behavior: auto;
}

.smooth-scroll {
    scroll-behavior: smooth;
}

.modal {
    overflow-y: auto;
    scroll-behavior: smooth;
}

.code-editor {
    overflow: auto;
    scroll-behavior: auto; /* 代码编辑器通常需要即时滚动 */
}
```

3. 响应式滚动行为：

```css
html {
    scroll-behavior: auto;
}

/* 只在大屏幕上启用平滑滚动 */
@media (min-width: 768px) {
    html {
        scroll-behavior: smooth;
    }
}
```

性能考虑：

1. 用户偏好检测：

```css
/* 尊重用户的动画偏好 */
@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }
}

@media (prefers-reduced-motion: no-preference) {
    html {
        scroll-behavior: smooth;
    }
}
```

2. JavaScript检测：

```javascript
// 检测用户是否偏好减少动画
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateScrollBehavior() {
    if (prefersReducedMotion.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
    } else {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

updateScrollBehavior();
prefersReducedMotion.addEventListener('change', updateScrollBehavior);
```

兼容性处理：

1. 特性检测：

```javascript
// 检测scroll-behavior支持
function supportsScrollBehavior() {
    return 'scrollBehavior' in document.documentElement.style;
}

if (!supportsScrollBehavior()) {
    // 使用polyfill或自定义实现
    console.log('需要scroll-behavior polyfill');
}
```

2. Polyfill实现：

```javascript
// 简单的平滑滚动polyfill
function smoothScrollTo(target, duration = 800) {
    const targetElement = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
    
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}
```

浏览器兼容性：

- Chrome 61+
- Firefox 36+
- Safari 14+
- IE不支持

最佳实践：

- 考虑用户的动画偏好设置
- 在长页面和单页应用中使用
- 避免在需要精确控制的场景中使用
- 结合JavaScript API获得更好的控制
- 为不支持的浏览器提供polyfill

---
