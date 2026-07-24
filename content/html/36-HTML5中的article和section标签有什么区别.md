# 36. HTML5中的article和section标签有什么区别？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

article和section都是HTML5的语义化标签，但用途不同：

1. article标签：
  - 表示独立、完整的内容
  - 可以单独存在和理解
  - 通常有自己的标题

  ```html
<article>
    <header>
        <h2>文章标题</h2>
        <time datetime="2023-12-25">2023年12月25日</time>
    </header>
    <p>文章内容...</p>
    <footer>
        <p>作者：张三</p>
    </footer>
</article>
```

2. section标签：
  - 表示文档中的一个章节或区域
  - 通常是更大内容的一部分
  - 按主题分组相关内容

  ```html
<article>
    <h1>完整指南</h1>
    <section>
        <h2>第一章：基础知识</h2>
        <p>基础内容...</p>
    </section>
    <section>
        <h2>第二章：高级技巧</h2>
        <p>高级内容...</p>
    </section>
</article>
```

3. 嵌套关系：

  ```html
<!-- article包含多个section -->
<article>
    <h1>博客文章</h1>
    <section>
        <h2>引言</h2>
        <p>...</p>
    </section>
    <section>
        <h2>正文</h2>
        <p>...</p>
    </section>
</article>

<!-- section包含多个article -->
<section>
    <h1>最新文章</h1>
    <article>
        <h2>文章1</h2>
        <p>...</p>
    </article>
    <article>
        <h2>文章2</h2>
        <p>...</p>
    </article>
</section>
```

---
