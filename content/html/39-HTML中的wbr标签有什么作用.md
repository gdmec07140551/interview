# 39. HTML中的wbr标签有什么作用？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

wbr（Word Break Opportunity）标签表示可能的换行位置：

1. 基本用法：

  ```html
<p>这是一个很长的URL：http://www.<wbr>example<wbr>.com/<wbr>very/<wbr>long/<wbr>path/<wbr>to/<wbr>resource</p>
```

2. 长单词换行：

  ```html
<p>Pneumono<wbr>ultra<wbr>microscopic<wbr>silico<wbr>volcano<wbr>coniosis</p>
```

3. 代码换行：

  ```html
<code>
function very<wbr>Long<wbr>Function<wbr>Name<wbr>That<wbr>Might<wbr>Need<wbr>Breaking() {
    // 代码内容
}
</code>
```

4. 与CSS word-break的区别：

  ```html
<!-- wbr：建议换行位置 -->
<p>super<wbr>cali<wbr>fragi<wbr>listic<wbr>expiali<wbr>docious</p>

<!-- CSS：强制换行 -->
<p style="word-break: break-all;">supercalifragilisticexpialidocious</p>
```

5. 实际应用：
  - 长URL的友好显示
  - 技术文档中的长标识符
  - 多语言文本的换行控制
  - 响应式设计中的文本处理

---
