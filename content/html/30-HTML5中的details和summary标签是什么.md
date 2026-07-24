# 30. HTML5中的details和summary标签是什么？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

details和summary标签用于创建可折叠的内容区域：

1. 基本用法：

  ```html
<details>
    <summary>点击展开详情</summary>
    <p>这里是详细内容，默认隐藏。</p>
    <p>点击上方标题可以展开或收起。</p>
</details>
```

2. 默认展开：

  ```html
<details open>
    <summary>默认展开的内容</summary>
    <p>这个内容区域默认是展开的。</p>
</details>
```

3. 复杂内容：

  ```html
<details>
    <summary>FAQ - 如何使用这个功能？</summary>
    <div>
        <h4>步骤说明：</h4>
        <ol>
            <li>首先打开设置页面</li>
            <li>找到相关选项</li>
            <li>按照提示操作</li>
        </ol>
        <img src="screenshot.png" alt="操作截图">
    </div>
</details>
```

4. JavaScript控制：

  ```javascript
const details = document.querySelector('details');
details.addEventListener('toggle', function() {
    console.log(this.open ? '展开了' : '收起了');
});
```

---
