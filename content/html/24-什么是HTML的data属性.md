# 24. 什么是HTML的data属性？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

data属性用于存储自定义数据：

1. 基本语法：

  ```html
<div data-user-id="123" data-role="admin" data-status="active">
    用户信息
</div>
```

2. JavaScript访问：

  ```javascript
const element = document.querySelector('div');

// 获取data属性
console.log(element.dataset.userId);    // "123"
console.log(element.dataset.role);      // "admin"
console.log(element.dataset.status);    // "active"

// 设置data属性
element.dataset.newAttribute = 'value';
```

3. CSS访问：

  ```css
div[data-status="active"] {
    color: green;
}

div::before {
    content: attr(data-role);
}
```

4. 命名规则：
  - 必须以 data- 开头
  - 只能包含小写字母、数字、连字符、点、冒号、下划线
  - JavaScript中转换为驼峰命名

---
