# 20. HTML中的head标签包含哪些内容？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

head标签包含文档的元数据，不在页面中显示：

1. 必需元素：

  ```html
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
</head>
```

2. 常见元素：

  ```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
    <meta name="description" content="页面描述">
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="favicon.ico">
    <script src="script.js"></script>
</head>
```

3. head中的标签：
  - &lt;title&gt;：页面标题
  - &lt;meta&gt;：元数据
  - &lt;link&gt;：外部资源链接
  - &lt;style&gt;：内部样式
  - &lt;script&gt;：JavaScript代码
  - &lt;base&gt;：基础URL

---
