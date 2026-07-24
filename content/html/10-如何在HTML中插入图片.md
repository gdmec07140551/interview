# 10. 如何在HTML中插入图片？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

使用 &lt;img&gt; 标签插入图片：

1. 基本语法：

  ```html
<img src="图片路径" alt="替代文字">
```

2. 重要属性：
  - src：图片的URL或路径（必需）
  - alt：替代文字，用于可访问性和SEO（必需）
  - width、height：设置图片尺寸
  - title：鼠标悬停时显示的提示文字

3. 完整示例：

  ```html
<img src="images/logo.png" 
     alt="公司logo" 
     width="200" 
     height="100"
     title="这是我们的logo">
```

4. 响应式图片：

  ```html
<img src="small.jpg" 
     srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 480px) 100vw, (max-width: 800px) 50vw, 25vw"
     alt="响应式图片">
```

---
