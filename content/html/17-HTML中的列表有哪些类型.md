# 17. HTML中的列表有哪些类型？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

HTML提供三种类型的列表：

1. 无序列表（Unordered List）：

  ```html
<ul>
    <li>项目1</li>
    <li>项目2</li>
    <li>项目3</li>
</ul>
```

2. 有序列表（Ordered List）：

  ```html
<ol>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
</ol>
```

3. 描述列表（Description List）：

  ```html
<dl>
    <dt>术语1</dt>
    <dd>术语1的描述</dd>
    <dt>术语2</dt>
    <dd>术语2的描述</dd>
</dl>
```

4. 嵌套列表：

  ```html
<ul>
    <li>主项目1
        <ul>
            <li>子项目1</li>
            <li>子项目2</li>
        </ul>
    </li>
    <li>主项目2</li>
</ul>
```

---
