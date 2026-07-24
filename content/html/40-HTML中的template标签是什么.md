# 40. HTML中的template标签是什么？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

template标签用于定义可重用的HTML模板：

1. 基本概念：
  - template内容不会直接显示
  - 需要通过JavaScript激活
  - 用于动态生成内容

2. 基本用法：

  ```html
<template id="user-template">
    <div class="user-card">
        <img src="" alt="用户头像" class="avatar">
        <h3 class="username"></h3>
        <p class="email"></p>
    </div>
</template>
```

3. JavaScript使用：

  ```javascript
const template = document.getElementById('user-template');
const users = [
    {name: '张三', email: 'zhang@example.com', avatar: 'zhang.jpg'},
    {name: '李四', email: 'li@example.com', avatar: 'li.jpg'}
];

users.forEach(user => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.username').textContent = user.name;
    clone.querySelector('.email').textContent = user.email;
    clone.querySelector('.avatar').src = user.avatar;
    document.body.appendChild(clone);
});
```

4. 复杂模板：

  ```html
<template id="product-template">
    <article class="product">
        <header>
            <h2 class="product-name"></h2>
            <span class="price"></span>
        </header>
        <img class="product-image" src="" alt="">
        <p class="description"></p>
        <button class="add-to-cart">添加到购物车</button>
    </article>
</template>
```

---
