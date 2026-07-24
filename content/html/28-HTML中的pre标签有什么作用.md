# 28. HTML中的pre标签有什么作用？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

pre标签用于显示预格式化文本：

1. 基本特性：
  - 保留空白字符（空格、制表符、换行符）
  - 使用等宽字体显示
  - 不会自动换行

2. 使用示例：

  ```html
<pre>
这是预格式化文本
    保留    所有空格
和换行符
</pre>
```

3. 代码显示：

  ```html
<pre><code>
function hello() {
    console.log("Hello World!");
}
</code></pre>
```

4. ASCII艺术：

  ```html
<pre>
     /\_/\  
    ( o.o ) 
     > ^ <
</pre>
```

5. 注意事项：
  - 内容会按原样显示
  - 长行不会自动换行
  - 通常与 &lt;code&gt; 标签配合使用

---
