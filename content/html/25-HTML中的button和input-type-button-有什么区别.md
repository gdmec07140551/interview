# 25. HTML中的button和input[type="button"]有什么区别？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

button元素和input[type="button"]的主要区别：

1. 内容支持：

  ```html
<!-- button可以包含HTML内容 -->
<button type="button">
    <img src="icon.png" alt="图标"> 点击我
</button>

<!-- input只能显示纯文本 -->
<input type="button" value="点击我">
```

2. 默认行为：

  ```html
<!-- button在表单中默认type="submit" -->
<form>
    <button>提交</button> <!-- 会提交表单 -->
    <button type="button">不提交</button>
</form>

<!-- input[type="button"]不会提交表单 -->
<input type="button" value="不提交">
```

3. 样式控制：
  - button更容易样式化
  - button支持伪元素（::before, ::after）
  - input的样式选项更有限

4. 可访问性：
  - button语义更明确
  - 屏幕阅读器支持更好

---
