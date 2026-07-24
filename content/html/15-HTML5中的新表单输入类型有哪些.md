# 15. HTML5中的新表单输入类型有哪些？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

HTML5 引入了多种新的输入类型：

1. 日期时间类型：

  ```html
<input type="date">        <!-- 日期选择器 -->
<input type="time">        <!-- 时间选择器 -->
<input type="datetime-local"> <!-- 日期时间选择器 -->
<input type="month">       <!-- 月份选择器 -->
<input type="week">        <!-- 周选择器 -->
```

2. 数值类型：

  ```html
<input type="number" min="0" max="100" step="1">
<input type="range" min="0" max="100" value="50">
```

3. 联系信息类型：

  ```html
<input type="email">       <!-- 邮箱验证 -->
<input type="tel">         <!-- 电话号码 -->
<input type="url">         <!-- URL验证 -->
```

4. 其他类型：

  ```html
<input type="search">      <!-- 搜索框 -->
<input type="color">       <!-- 颜色选择器 -->
<input type="file" multiple> <!-- 文件上传 -->
```

---
