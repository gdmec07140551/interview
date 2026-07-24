# 44. HTML中的base标签有什么作用？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

base标签用于设置文档中所有相对URL的基础URL：

1. 基本用法：

  ```html
<head>
    <base href="https://www.example.com/pages/">
    <base target="_blank">
</head>
<body>
    <!-- 这个链接实际指向 https://www.example.com/pages/about.html -->
    <a href="about.html">关于我们</a>
    
    <!-- 这个图片实际指向 https://www.example.com/pages/images/logo.png -->
    <img src="images/logo.png" alt="Logo">
</body>
```

2. 设置默认目标：

  ```html
<head>
    <base target="_blank">
</head>
<body>
    <!-- 所有链接都会在新窗口打开 -->
    <a href="page1.html">页面1</a>
    <a href="page2.html">页面2</a>
    
    <!-- 除非明确指定其他target -->
    <a href="page3.html" target="_self">页面3（当前窗口）</a>
</body>
```

3. 注意事项：
  - base标签必须放在head中
  - 一个文档只能有一个base标签
  - 影响所有相对URL（链接、图片、表单等）
  - 不影响绝对URL

4. 实际应用场景：

  ```html
<!-- 适用于单页应用或子目录部署 -->
<head>
    <base href="/app/static/">
</head>
<body>
    <link rel="stylesheet" href="css/style.css">
    <!-- 实际路径：/app/static/css/style.css -->
    
    <script src="js/app.js"></script>
    <!-- 实际路径：/app/static/js/app.js -->
</body>
```

---
