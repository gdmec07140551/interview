# 38. HTML中的ruby、rt、rp标签用于什么？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

ruby、rt、rp标签用于显示东亚文字的注音或注释：

1. 基本用法：

  ```html
<ruby>
    汉 <rt>hàn</rt>
    字 <rt>zì</rt>
</ruby>
```

2. 日语假名注音：

  ```html
<ruby>
    日本語 <rt>にほんご</rt>
</ruby>

<ruby>
    東京 <rt>とうきょう</rt>
</ruby>
```

3. 使用rp标签（兼容性）：

  ```html
<ruby>
    北京 <rp>(</rp><rt>Běi jīng</rt><rp>)</rp>
</ruby>
```

4. 复杂注音：

  ```html
<ruby>
    <rb>超</rb><rb>電磁</rb><rb>砲</rb>
    <rt>レール</rt><rt>ガン</rt><rt></rt>
</ruby>
```

5. 样式化：

  ```css
ruby {
    ruby-align: center;
}

rt {
    font-size: 0.7em;
    color: #666;
}

rp {
    color: #999;
}
```

6. 用途：
  - 中文拼音注音
  - 日语假名注音
  - 韩语注音
  - 古文注释

---
