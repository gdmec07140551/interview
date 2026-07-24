# 37. HTML中的map和area标签如何创建图像映射？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

map和area标签用于创建图像映射，让图片的不同区域可以点击：

1. 基本结构：

  ```html
<img src="world-map.jpg" alt="世界地图" usemap="#worldmap">

<map name="worldmap">
    <area shape="rect" coords="0,0,100,50" href="asia.html" alt="亚洲">
    <area shape="circle" coords="200,100,50" href="europe.html" alt="欧洲">
    <area shape="poly" coords="300,0,400,50,350,100" href="africa.html" alt="非洲">
</map>
```

2. 不同形状的区域：

  ```html
<img src="office-layout.jpg" alt="办公室布局" usemap="#office">

<map name="office">
    <!-- 矩形区域 -->
    <area shape="rect" coords="10,10,110,60" href="reception.html" alt="前台">
    
    <!-- 圆形区域 -->
    <area shape="circle" coords="200,150,40" href="meeting-room.html" alt="会议室">
    
    <!-- 多边形区域 -->
    <area shape="poly" coords="300,100,400,100,350,200" href="office.html" alt="办公区">
    
    <!-- 默认区域 -->
    <area shape="default" href="main.html" alt="主页">
</map>
```

3. 坐标说明：
  - rect：左上角x,y，右下角x,y
  - circle：圆心x,y，半径
  - poly：各个顶点的x,y坐标对

4. 响应式图像映射：

  ```html
<img src="responsive-map.jpg" alt="响应式地图" usemap="#responsivemap" style="width:100%;">

<map name="responsivemap">
    <area shape="rect" coords="0,0,50,25" href="link1.html" alt="区域1" style="cursor:pointer;">
</map>
```

---
