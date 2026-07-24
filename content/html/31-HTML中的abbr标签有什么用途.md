# 31. HTML中的abbr标签有什么用途？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

abbr标签用于标记缩写或首字母缩略词：

1. 基本用法：

  ```html
<p><abbr title="HyperText Markup Language">HTML</abbr>是网页标记语言。</p>
<p><abbr title="Cascading Style Sheets">CSS</abbr>用于样式设计。</p>
```

2. 可访问性增强：

  ```html
<p>我们公司位于<abbr title="中华人民共和国">中国</abbr>。</p>
<p>请在<abbr title="尽快">ASAP</abbr>完成任务。</p>
```

3. 样式化：

  ```css
abbr {
    text-decoration: underline dotted;
    cursor: help;
}

abbr:hover {
    color: #007bff;
}
```

4. 与其他标签结合：

  ```html
<p>
    <abbr title="World Wide Web Consortium">W3C</abbr>
    制定了<abbr title="HyperText Markup Language">HTML</abbr>标准。
</p>
```

5. 好处：
  - 提高可访问性
  - 帮助搜索引擎理解内容
  - 为用户提供额外信息

---
