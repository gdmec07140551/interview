# 8. HTML表单的基本结构是什么？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

HTML表单用于收集用户输入：

1. 基本结构：

  ```html
<form action="/submit" method="post">
    <label for="name">姓名：</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email" required>
    
    <button type="submit">提交</button>
</form>
```

2. 重要属性：
  - action：表单提交的URL
  - method：提交方法（GET或POST）
  - enctype：编码类型（用于文件上传时）

3. 表单控件：
  - &lt;input&gt;：输入字段
  - &lt;textarea&gt;：多行文本区域
  - &lt;select&gt;：下拉选择框
  - &lt;button&gt;：按钮

---
