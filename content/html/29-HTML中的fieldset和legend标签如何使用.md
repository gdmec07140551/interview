# 29. HTML中的fieldset和legend标签如何使用？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

fieldset和legend用于组织表单元素：

1. 基本结构：

  ```html
<fieldset>
    <legend>个人信息</legend>
    <label for="name">姓名：</label>
    <input type="text" id="name" name="name">
    
    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email">
</fieldset>
```

2. 多组表单：

  ```html
<form>
    <fieldset>
        <legend>基本信息</legend>
        <input type="text" name="name" placeholder="姓名">
        <input type="email" name="email" placeholder="邮箱">
    </fieldset>
    
    <fieldset>
        <legend>联系方式</legend>
        <input type="tel" name="phone" placeholder="电话">
        <textarea name="address" placeholder="地址"></textarea>
    </fieldset>
</form>
```

3. 禁用整组：

  ```html
<fieldset disabled>
    <legend>已禁用的选项</legend>
    <input type="text" name="disabled-input">
</fieldset>
```

4. 样式化：

  ```css
fieldset {
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 10px;
}

legend {
    font-weight: bold;
    padding: 0 10px;
}
```

---
