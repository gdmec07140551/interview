# 16. 什么是HTML的DOCTYPE声明？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

DOCTYPE声明告诉浏览器文档使用哪种HTML版本：

1. HTML5的DOCTYPE：

  ```html
<!DOCTYPE html>
```

2. 作用和重要性：
  - 必须放在HTML文档的第一行
  - 告诉浏览器使用标准模式渲染页面
  - 避免浏览器进入怪异模式（Quirks Mode）
  - 确保页面在不同浏览器中的一致性

3. 历史版本的DOCTYPE：

  ```html
<!-- HTML 4.01 Strict -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" 
"http://www.w3.org/TR/html4/strict.dtd">

<!-- XHTML 1.0 Strict -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

4. HTML5简化：
  - HTML5的DOCTYPE非常简洁
  - 向后兼容，适用于所有现代浏览器

---
