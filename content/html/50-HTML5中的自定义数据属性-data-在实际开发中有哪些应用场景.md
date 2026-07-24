# 50. HTML5中的自定义数据属性（data-*）在实际开发中有哪些应用场景？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

自定义数据属性在现代Web开发中有广泛应用：

1. 组件配置：

  ```html
<!-- 轮播图组件配置 -->
<div class="carousel" 
     data-autoplay="true" 
     data-interval="3000" 
     data-animation="fade">
    <img src="slide1.jpg" alt="幻灯片1">
    <img src="slide2.jpg" alt="幻灯片2">
</div>

<script>
document.querySelectorAll('.carousel').forEach(carousel => {
    const autoplay = carousel.dataset.autoplay === 'true';
    const interval = parseInt(carousel.dataset.interval);
    const animation = carousel.dataset.animation;
    
    // 根据配置初始化轮播
    initCarousel(carousel, { autoplay, interval, animation });
});
</script>
```

2. 状态管理：

  ```html
<!-- 购物车商品 -->
<div class="product-item" 
     data-product-id="123" 
     data-price="99.99" 
     data-stock="10" 
     data-category="electronics">
    <h3>商品名称</h3>
    <button class="add-to-cart">加入购物车</button>
</div>

<script>
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const item = e.target.closest('.product-item');
        const productData = {
            id: item.dataset.productId,
            price: parseFloat(item.dataset.price),
            stock: parseInt(item.dataset.stock),
            category: item.dataset.category
        };
        
        addToCart(productData);
    }
});
</script>
```

3. 表单验证：

  ```html
<form>
    <input type="text" 
           name="username" 
           data-required="true"
           data-min-length="3"
           data-max-length="20"
           data-pattern="^[a-zA-Z0-9_]+$"
           data-error-message="用户名只能包含字母、数字和下划线">
    
    <input type="email" 
           name="email"
           data-required="true"
           data-error-message="请输入有效的邮箱地址">
</form>

<script>
function validateForm(form) {
    const inputs = form.querySelectorAll('input[data-required="true"]');
    
    inputs.forEach(input => {
        const minLength = input.dataset.minLength;
        const maxLength = input.dataset.maxLength;
        const pattern = input.dataset.pattern;
        const errorMessage = input.dataset.errorMessage;
        
        // 执行验证逻辑
        if (!validateInput(input.value, { minLength, maxLength, pattern })) {
            showError(input, errorMessage);
        }
    });
}
</script>
```

4. CSS样式控制：

  ```html
<div class="theme-switcher">
    <button data-theme="light">浅色主题</button>
    <button data-theme="dark">深色主题</button>
    <button data-theme="auto">自动主题</button>
</div>

<style>
[data-theme="light"] {
    background-color: white;
    color: black;
}

[data-theme="dark"] {
    background-color: black;
    color: white;
}

.button[data-theme="light"]:hover {
    background-color: #f0f0f0;
}
</style>

<script>
document.addEventListener('click', function(e) {
    if (e.target.dataset.theme) {
        document.body.dataset.theme = e.target.dataset.theme;
        localStorage.setItem('theme', e.target.dataset.theme);
    }
});
</script>
```

5. 分析和追踪：

  ```html
<button class="cta-button" 
        data-track-event="click"
        data-track-category="marketing"
        data-track-label="hero-cta"
        data-track-value="1">
    立即注册
</button>

<script>
document.addEventListener('click', function(e) {
    const trackEvent = e.target.dataset.trackEvent;
    if (trackEvent) {
        // 发送分析数据
        analytics.track(trackEvent, {
            category: e.target.dataset.trackCategory,
            label: e.target.dataset.trackLabel,
            value: e.target.dataset.trackValue
        });
    }
});
</script>
```
