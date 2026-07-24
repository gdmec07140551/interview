# 45. CSS中的inert属性如何实现元素的惰性状态？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

inert属性定义：

inert是一个HTML属性，当应用到元素上时，会使该元素及其所有后代元素变为"惰性"状态，即不可交互、不可聚焦，并且对辅助技术隐藏。CSS可以通过:inert伪类选择器来样式化这些惰性元素。

基本用法：

```html
<!-- HTML中使用inert属性 -->
<div inert>
    <button>This button is inert</button>
    <input type="text" placeholder="This input is inert">
    <a href="#">This link is inert</a>
</div>
```

```css
/* CSS中样式化惰性元素 */
:inert {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
}
```

inert的效果：

1. 元素不能接收焦点
2. 元素不响应用户交互（点击、键盘等）
3. 元素对屏幕阅读器等辅助技术隐藏
4. 元素的所有后代也会变为惰性

实际应用场景：

1. 模态框背景内容：

```html
<div class="page-content" id="mainContent">
    <header>
        <h1>Main Page Content</h1>
        <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    <main>
        <button id="openModal">Open Modal</button>
        <form>
            <input type="text" placeholder="Name">
            <input type="email" placeholder="Email">
            <button type="submit">Submit</button>
        </form>
    </main>
</div>

<div class="modal" id="modal" hidden>
    <div class="modal-content">
        <h2>Modal Dialog</h2>
        <p>This is a modal dialog.</p>
        <button id="closeModal">Close</button>
    </div>
</div>
```

```css
/* 惰性内容的样式 */
:inert {
    opacity: 0.3;
    filter: blur(2px);
    pointer-events: none;
    user-select: none;
    transition: opacity 0.3s ease, filter 0.3s ease;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal[hidden] {
    display: none;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
}
```

```javascript
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const mainContent = document.getElementById('mainContent');

openModalBtn.addEventListener('click', () => {
    modal.hidden = false;
    mainContent.inert = true; // 使背景内容变为惰性
});

closeModalBtn.addEventListener('click', () => {
    modal.hidden = true;
    mainContent.inert = false; // 恢复背景内容的交互性
});
```

2. 加载状态管理：

```html
<div class="app-container">
    <div class="content" id="appContent">
        <h1>Application Content</h1>
        <form id="dataForm">
            <input type="text" placeholder="Enter data">
            <button type="submit">Submit</button>
        </form>
        <div class="data-list">
            <div class="data-item">Item 1</div>
            <div class="data-item">Item 2</div>
            <div class="data-item">Item 3</div>
        </div>
    </div>
    
    <div class="loading-overlay" id="loadingOverlay" hidden>
        <div class="spinner"></div>
        <p>Loading...</p>
    </div>
</div>
```

```css
.app-container {
    position: relative;
    min-height: 100vh;
}

/* 加载时的惰性样式 */
:inert {
    opacity: 0.4;
    filter: grayscale(100%);
    transition: opacity 0.3s ease, filter 0.3s ease;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.loading-overlay[hidden] {
    display: none;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

```javascript
function showLoading() {
    const content = document.getElementById('appContent');
    const loading = document.getElementById('loadingOverlay');
    
    content.inert = true;
    loading.hidden = false;
}

function hideLoading() {
    const content = document.getElementById('appContent');
    const loading = document.getElementById('loadingOverlay');
    
    content.inert = false;
    loading.hidden = true;
}

// 模拟异步操作
document.getElementById('dataForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading();
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    hideLoading();
});
```

3. 分步表单：

```html
<div class="multi-step-form">
    <div class="step-indicators">
        <div class="step active">1</div>
        <div class="step">2</div>
        <div class="step">3</div>
    </div>
    
    <div class="form-step active" id="step1">
        <h2>Step 1: Personal Information</h2>
        <input type="text" placeholder="First Name">
        <input type="text" placeholder="Last Name">
        <button onclick="nextStep(2)">Next</button>
    </div>
    
    <div class="form-step" id="step2" inert>
        
```
