# 41. HTML中的slot标签在Web Components中如何使用？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

slot标签用于Web Components中的内容分发：

1. 基本概念：
  - slot定义内容插入点
  - 允许外部内容插入到组件内部
  - 支持默认内容和命名插槽

2. 基本用法：

  ```html
<!-- 自定义组件模板 -->
<template id="my-component">
    <div class="wrapper">
        <h2>组件标题</h2>
        <slot>默认内容</slot>
    </div>
</template>

<!-- 使用组件 -->
<my-component>
    <p>这是插入的内容</p>
</my-component>
```

3. 命名插槽：

  ```html
<template id="card-component">
    <div class="card">
        <header>
            <slot name="header">默认标题</slot>
        </header>
        <main>
            <slot>默认内容</slot>
        </main>
        <footer>
            <slot name="footer">默认页脚</slot>
        </footer>
    </div>
</template>

<!-- 使用命名插槽 -->
<card-component>
    <h1 slot="header">自定义标题</h1>
    <p>主要内容</p>
    <p slot="footer">自定义页脚</p>
</card-component>
```

4. JavaScript定义组件：

  ```javascript
class MyComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const template = document.getElementById('my-component');
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('my-component', MyComponent);
```

---
