# 12. HTML表格的基本结构是什么？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

HTML表格使用以下标签构建：

1. 基本结构：

  ```html
<table>
    <thead>
        <tr>
            <th>标题1</th>
            <th>标题2</th>
            <th>标题3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>数据1</td>
            <td>数据2</td>
            <td>数据3</td>
        </tr>
        <tr>
            <td>数据4</td>
            <td>数据5</td>
            <td>数据6</td>
        </tr>
    </tbody>
</table>
```

2. 主要标签：
  - &lt;table&gt;：表格容器
  - &lt;thead&gt;：表格头部
  - &lt;tbody&gt;：表格主体
  - &lt;tfoot&gt;：表格脚部
  - &lt;tr&gt;：表格行
  - &lt;th&gt;：表头单元格
  - &lt;td&gt;：数据单元格

3. 常用属性：
  - colspan：跨列合并
  - rowspan：跨行合并

---
