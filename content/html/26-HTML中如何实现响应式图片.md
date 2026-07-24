# 26. HTML中如何实现响应式图片？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

HTML提供多种方式实现响应式图片：

1. srcset属性：

  ```html
<img src="small.jpg"
     srcset="small.jpg 480w, 
             medium.jpg 800w, 
             large.jpg 1200w"
     sizes="(max-width: 480px) 100vw, 
            (max-width: 800px) 50vw, 
            25vw"
     alt="响应式图片">
```

2. picture元素：

  ```html
<picture>
    <source media="(max-width: 480px)" srcset="mobile.jpg">
    <source media="(max-width: 800px)" srcset="tablet.jpg">
    <img src="desktop.jpg" alt="响应式图片">
</picture>
```

3. 不同格式支持：

  ```html
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="现代格式图片">
</picture>
```

4. CSS配合：

  ```css
img {
    max-width: 100%;
    height: auto;
}
```

---
