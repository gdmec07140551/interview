# 42. HTML中的noscript标签有什么用途？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

noscript标签用于在JavaScript被禁用时显示替代内容：

1. 基本用法：

  ```html
<script>
    document.write("JavaScript已启用");
</script>
<noscript>
    <p>您的浏览器不支持JavaScript或JavaScript已被禁用。</p>
    <p>请启用JavaScript以获得最佳体验。</p>
</noscript>
```

2. 提供替代功能：

  ```html
<div id="interactive-map"></div>
<script>
    // 加载交互式地图
    loadInteractiveMap();
</script>
<noscript>
    <img src="static-map.jpg" alt="静态地图" usemap="#maplinks">
    <map name="maplinks">
        <area shape="rect" coords="0,0,100,100" href="location1.html" alt="位置1">
        <area shape="rect" coords="100,0,200,100" href="location2.html" alt="位置2">
    </map>
</noscript>
```

3. 表单回退：

  ```html
<form id="ajax-form">
    <input type="email" name="email" required>
    <button type="button" onclick="submitAjax()">提交</button>
</form>

<noscript>
    <form action="/submit" method="post">
        <input type="email" name="email" required>
        <button type="submit">提交</button>
    </form>
</noscript>
```

4. SEO和可访问性：

  ```html
<div id="dynamic-content"></div>
<script>
    loadDynamicContent();
</script>
<noscript>
    <div>
        <h2>重要内容</h2>
        <p>这是重要的内容，确保搜索引擎和禁用JavaScript的用户都能看到。</p>
    </div>
</noscript>
```

---
