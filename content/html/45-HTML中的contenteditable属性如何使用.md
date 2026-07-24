# 45. HTML中的contenteditable属性如何使用？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

contenteditable属性使HTML元素可以被用户编辑：

1. 基本用法：

  ```html
<div contenteditable="true">
    这段文字可以直接编辑，点击试试看！
</div>

<p contenteditable="false">这段文字不能编辑</p>
```

2. 富文本编辑器：

  ```html
<div contenteditable="true" style="border: 1px solid #ccc; padding: 10px; min-height: 200px;">
    <h2>可编辑的标题</h2>
    <p>这是一个简单的富文本编辑器。你可以：</p>
    <ul>
        <li>编辑文字</li>
        <li>添加<strong>粗体</strong>和<em>斜体</em></li>
        <li>创建列表</li>
    </ul>
</div>
```

3. 与JavaScript配合：

  ```html
<div id="editor" contenteditable="true">编辑我...</div>
<button onclick="getContent()">获取内容</button>
<button onclick="setContent()">设置内容</button>

<script>
function getContent() {
    const editor = document.getElementById('editor');
    console.log(editor.innerHTML);
}

function setContent() {
    const editor = document.getElementById('editor');
    editor.innerHTML = '<p>新的<strong>内容</strong></p>';
}

// 监听内容变化
document.getElementById('editor').addEventListener('input', function(e) {
    console.log('内容已改变:', e.target.innerHTML);
});
</script>
```

4. 样式化可编辑区域：

  ```css
[contenteditable="true"] {
    border: 2px dashed #ccc;
    padding: 10px;
    min-height: 100px;
}

[contenteditable="true"]:focus {
    border-color: #007bff;
    outline: none;
}

[contenteditable="true"]:empty::before {
    content: "点击这里开始编辑...";
    color: #999;
}
```

---
