# 22. HTML中的iframe标签是什么？如何使用？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

iframe用于在当前页面中嵌入另一个HTML页面：

1. 基本语法：

  ```html
<iframe src="https://www.example.com" width="800" height="600"></iframe>
```

2. 常用属性：

  ```html
<iframe src="page.html"
        width="100%"
        height="400"
        frameborder="0"
        scrolling="auto"
        name="myframe">
</iframe>
```

3. 安全属性：

  ```html
<iframe src="external-site.com"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy">
</iframe>
```

4. 响应式iframe：

  ```html
<div style="position: relative; padding-bottom: 56.25%; height: 0;">
    <iframe src="video.html" 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
</div>
```

5. 注意事项：
  - 可能存在安全风险
  - 影响页面加载速度
  - SEO不友好

---
