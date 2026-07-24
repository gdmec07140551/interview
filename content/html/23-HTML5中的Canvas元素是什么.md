# 23. HTML5中的Canvas元素是什么？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

Canvas是HTML5中用于绘制图形的元素：

1. 基本用法：

  ```html
<canvas id="myCanvas" width="800" height="600"></canvas>
```

2. JavaScript绘图：

  ```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制矩形
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

// 绘制圆形
ctx.beginPath();
ctx.arc(200, 200, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();
```

3. Canvas的用途：
  - 动态图形绘制
  - 图表和数据可视化
  - 游戏开发
  - 图像处理
  - 动画效果

4. Canvas vs SVG：
  - Canvas：基于像素，适合复杂动画
  - SVG：基于矢量，适合静态图形

---
