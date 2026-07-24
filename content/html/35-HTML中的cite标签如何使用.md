# 35. HTML中的cite标签如何使用？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

cite标签用于标记作品的标题或引用来源：

1. 引用书籍：

  ```html
<p>我最近在读<cite>《JavaScript高级程序设计》</cite>这本书。</p>
```

2. 引用文章：

  ```html
<blockquote>
    <p>学而时习之，不亦说乎？</p>
    <footer>—— <cite>《论语》</cite></footer>
</blockquote>
```

3. 引用网站或博客：

  ```html
<p>
    根据<cite>MDN Web Docs</cite>的说明，HTML5引入了许多新特性。
</p>
```

4. 引用电影、歌曲等：

  ```html
<p>电影<cite>《肖申克的救赎》</cite>是我最喜欢的电影之一。</p>
<p>这首<cite>《月亮代表我的心》</cite>很好听。</p>
```

5. 与blockquote结合：

  ```html
<blockquote cite="https://example.com/article">
    <p>这是一段引用的内容。</p>
    <footer>来源：<cite>某某网站</cite></footer>
</blockquote>
```

6. 样式化：

  ```css
cite {
    font-style: italic;
    color: #666;
}
```

---
