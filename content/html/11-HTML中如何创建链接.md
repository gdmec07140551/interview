# 11. HTML中如何创建链接？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

使用 &lt;a&gt; 标签创建链接：

1. 外部链接：

  ```html
<a href="https://www.example.com">访问示例网站</a>
```

2. 内部链接：

  ```html
<a href="about.html">关于我们</a>
<a href="/contact">联系页面</a>
```

3. 锚点链接：

  ```html
<a href="#section1">跳转到第一节</a>
<h2 id="section1">第一节标题</h2>
```

4. 邮件链接：

  ```html
<a href="mailto:contact@example.com">发送邮件</a>
```

5. 电话链接：

  ```html
<a href="tel:+86-138-0000-0000">拨打电话</a>
```

6. 新窗口打开：

  ```html
<a href="https://example.com" target="_blank">在新窗口打开</a>
```

---
