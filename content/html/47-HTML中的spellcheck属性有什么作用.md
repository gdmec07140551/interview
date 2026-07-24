# 47. HTML中的spellcheck属性有什么作用？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

spellcheck属性控制浏览器是否对元素内容进行拼写检查：

1. 基本用法：

  ```html
<!-- 启用拼写检查 -->
<textarea spellcheck="true" placeholder="输入一些英文文本试试..."></textarea>

<!-- 禁用拼写检查 -->
<input type="text" spellcheck="false" placeholder="代码或专业术语">

<!-- 可编辑div的拼写检查 -->
<div contenteditable="true" spellcheck="true">
    这里可以编辑文本，浏览器会检查拼写错误。
</div>
```

2. 不同场景的应用：

  ```html
<!-- 文章编辑器 - 启用拼写检查 -->
<textarea spellcheck="true" placeholder="写文章..."></textarea>

<!-- 代码编辑器 - 禁用拼写检查 -->
<textarea spellcheck="false" placeholder="输入代码..."></textarea>

<!-- 用户名输入 - 禁用拼写检查 -->
<input type="text" name="username" spellcheck="false" placeholder="用户名">

<!-- 邮箱输入 - 禁用拼写检查 -->
<input type="email" name="email" spellcheck="false" placeholder="邮箱地址">
```

3. 继承性：

  ```html
<!-- 父元素设置会被子元素继承 -->
<div spellcheck="false">
    <input type="text" placeholder="继承父元素设置，不检查拼写">
    <textarea placeholder="同样不检查拼写"></textarea>
    
    <!-- 子元素可以覆盖父元素设置 -->
    <input type="text" spellcheck="true" placeholder="覆盖设置，检查拼写">
</div>
```

4. CSS样式化拼写错误：

  ```css
/* 某些浏览器允许自定义拼写错误样式 */
::spelling-error {
    text-decoration: underline wavy red;
}

/* 语法错误样式 */
::grammar-error {
    text-decoration: underline wavy green;
}
```

---
