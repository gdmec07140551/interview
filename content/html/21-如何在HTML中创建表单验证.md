# 21. 如何在HTML中创建表单验证？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

HTML5提供了内置的表单验证功能：

1. 必填字段：

  ```html
<input type="text" name="username" required>
```

2. 输入类型验证：

  ```html
<input type="email" name="email" required>
<input type="url" name="website">
<input type="number" name="age" min="18" max="100">
```

3. 模式验证：

  ```html
<input type="text" name="phone" pattern="[0-9]{11}" title="请输入11位手机号">
```

4. 长度限制：

  ```html
<input type="text" name="username" minlength="3" maxlength="20">
<textarea name="message" maxlength="500"></textarea>
```

5. 自定义验证消息：

  ```html
<input type="email" name="email" required 
       oninvalid="this.setCustomValidity('请输入有效的邮箱地址')"
       oninput="this.setCustomValidity('')">
```

---
