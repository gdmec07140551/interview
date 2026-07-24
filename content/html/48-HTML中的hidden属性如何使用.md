# 48. HTML中的hidden属性如何使用？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

hidden属性用于隐藏HTML元素：

1. 基本用法：

  ```html
<!-- 隐藏元素 -->
<div hidden>这个div被隐藏了</div>

<!-- 显示元素 -->
<div>这个div是可见的</div>

<!-- 通过JavaScript控制 -->
<button onclick="toggleVisibility()">切换显示/隐藏</button>
<p id="toggleText" hidden>这段文字可以切换显示状态</p>

<script>
function toggleVisibility() {
    const text = document.getElementById('toggleText');
    text.hidden = !text.hidden;
}
</script>
```

2. 与CSS display的区别：

  ```html
<!-- hidden属性 -->
<div hidden>使用hidden属性隐藏</div>

<!-- CSS display: none -->
<div style="display: none;">使用CSS隐藏</div>

<!-- CSS visibility: hidden -->
<div style="visibility: hidden;">使用visibility隐藏（占用空间）</div>
```

3. 条件显示内容：

  ```html
<form>
    <label>
        <input type="checkbox" id="showAdvanced"> 显示高级选项
    </label>
    
    <div id="advancedOptions" hidden>
        <h3>高级选项</h3>
        <label>选项1: <input type="text"></label>
        <label>选项2: <input type="text"></label>
    </div>
</form>

<script>
document.getElementById('showAdvanced').addEventListener('change', function() {
    document.getElementById('advancedOptions').hidden = !this.checked;
});
</script>
```

4. 模态框或弹窗：

  ```html
<button onclick="showModal()">显示模态框</button>

<div id="modal" hidden style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);">
    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:20px;">
        <h2>模态框标题</h2>
        <p>模态框内容</p>
        <button onclick="hideModal()">关闭</button>
    </div>
</div>

<script>
function showModal() {
    document.getElementById('modal').hidden = false;
}

function hideModal() {
    document.getElementById('modal').hidden = true;
}
</script>
```

---
