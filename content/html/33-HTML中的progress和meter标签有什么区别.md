# 33. HTML中的progress和meter标签有什么区别？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

progress和meter都用于显示数值，但用途不同：

1. progress标签（进度条）：

  ```html
<!-- 确定进度 -->
<progress value="70" max="100">70%</progress>

<!-- 不确定进度 -->
<progress>加载中...</progress>

<!-- 文件上传进度 -->
<label for="upload">上传进度：</label>
<progress id="upload" value="32" max="100">32%</progress>
```

2. meter标签（测量值）：

  ```html
<!-- 磁盘使用量 -->
<meter value="6" min="0" max="10">6 out of 10</meter>

<!-- 温度显示 -->
<meter value="25" min="-10" max="50" optimum="20" high="35" low="5">
    25°C
</meter>

<!-- 电池电量 -->
<meter value="0.6" optimum="1" high="0.9" low="0.2">60%</meter>
```

3. 主要区别：
  - progress：表示任务完成进度，有明确的开始和结束
  - meter：表示已知范围内的标量值或分数值

4. meter的特殊属性：
  - optimum：最佳值
  - high：高值阈值
  - low：低值阈值

---
