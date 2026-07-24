# 49. HTML中的tabindex属性如何控制焦点顺序？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

tabindex属性控制元素的Tab键焦点顺序：

1. 基本用法：

  ```html
<!-- 正常Tab顺序（1, 2, 3） -->
<input type="text" tabindex="1" placeholder="第一个">
<input type="text" tabindex="2" placeholder="第二个">
<input type="text" tabindex="3" placeholder="第三个">

<!-- 自定义Tab顺序（2, 1, 3） -->
<input type="text" tabindex="2" placeholder="第二个获得焦点">
<input type="text" tabindex="1" placeholder="第一个获得焦点">
<input type="text" tabindex="3" placeholder="第三个获得焦点">
```

2. 特殊值：

  ```html
<!-- tabindex="0": 正常Tab顺序，但在指定tabindex之后 -->
<div tabindex="0">可获得焦点的div</div>

<!-- tabindex="-1": 不参与Tab导航，但可通过JavaScript获得焦点 -->
<div tabindex="-1" id="skipFocus">跳过Tab导航</div>
<button onclick="document.getElementById('skipFocus').focus()">
    点击让上面的div获得焦点
</button>
```

3. 复杂表单的焦点管理：

  ```html
<form>
    <fieldset>
        <legend>基本信息</legend>
        <input type="text" tabindex="1" placeholder="姓名">
        <input type="email" tabindex="2" placeholder="邮箱">
    </fieldset>
    
    <fieldset>
        <legend>详细信息</legend>
        <input type="tel" tabindex="3" placeholder="电话">
        <textarea tabindex="4" placeholder="地址"></textarea>
    </fieldset>
    
    <div>
        <button type="submit" tabindex="5">提交</button>
        <button type="reset" tabindex="6">重置</button>
    </div>
</form>
```

4. 可访问性增强：

  ```html
<!-- 自定义组件的焦点管理 -->
<div class="custom-dropdown" tabindex="0" role="combobox" aria-expanded="false">
    <span class="selected">请选择...</span>
    <ul class="options" hidden>
        <li tabindex="-1" role="option">选项1</li>
        <li tabindex="-1" role="option">选项2</li>
        <li tabindex="-1" role="option">选项3</li>
    </ul>
</div>

<script>
// 键盘导航支持
document.querySelector('.custom-dropdown').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        // 打开/关闭下拉菜单
        const options = this.querySelector('.options');
        options.hidden = !options.hidden;
    }
});
</script>
```

---
