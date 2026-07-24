# 18. HTML中如何插入音频和视频？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

HTML5提供了原生的音频和视频支持：

1. 音频标签：

  ```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持音频播放。
</audio>
```

2. 视频标签：

  ```html
<video width="640" height="480" controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    您的浏览器不支持视频播放。
</video>
```

3. 常用属性：
  - controls：显示播放控制器
  - autoplay：自动播放
  - loop：循环播放
  - muted：静音
  - poster：视频封面图片（仅视频）

4. 多格式支持：
  - 使用多个 &lt;source&gt; 标签提供不同格式
  - 浏览器会选择支持的第一个格式

---
