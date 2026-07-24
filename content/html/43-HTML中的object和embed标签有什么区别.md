# 43. HTML中的object和embed标签有什么区别？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

object和embed都用于嵌入外部内容，但有不同的特点：

1. object标签：

  ```html
<!-- 嵌入PDF -->
<object data="document.pdf" type="application/pdf" width="600" height="400">
    <p>您的浏览器不支持PDF显示。<a href="document.pdf">点击下载</a></p>
</object>

<!-- 嵌入Flash -->
<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="400" height="300">
    <param name="movie" value="animation.swf">
    <param name="quality" value="high">
    <embed src="animation.swf" width="400" height="300" type="application/x-shockwave-flash">
</object>
```

2. embed标签：

  ```html
<!-- 嵌入音频 -->
<embed src="music.mp3" type="audio/mpeg" width="300" height="50">

<!-- 嵌入视频 -->
<embed src="video.mp4" type="video/mp4" width="640" height="480">
```

3. 主要区别：
  - object：W3C标准，支持回退内容，更灵活
  - embed：简单直接，但标准化程度较低
  - object：可以嵌套param标签设置参数
  - embed：参数直接作为属性设置

4. 现代替代方案：

  ```html
<!-- 使用HTML5原生标签 -->
<audio controls>
    <source src="music.mp3" type="audio/mpeg">
</audio>

<video controls width="640" height="480">
    <source src="video.mp4" type="video/mp4">
</video>

<!-- 使用iframe -->
<iframe src="document.pdf" width="600" height="400"></iframe>
```

---
