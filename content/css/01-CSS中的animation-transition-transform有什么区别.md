# 1. CSS中的animation、transition、transform有什么区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

在CSS中，animation、transition和transform是用来创建动画效果的关键属性，它们各自具有不同的作用和特点。

animation：

- 用于创建复杂的动画序列，可以控制多个关键帧
- 可以设置动画的持续时间、延迟、重复次数、播放方向等
- 需要配合@keyframes规则定义动画的各个阶段

transition：

- 用于指定在元素状态改变时，要以何种方式过渡到新状态
- 通过指定过渡的属性、持续时间、动画方式、延迟时间等来控制过渡效果
- 适用于元素从一种状态平滑过渡到另一种状态

transform：

- 用于对元素进行变形，例如平移、旋转、缩放、倾斜等
- 通常与transition或animation结合使用，使得变形动画更加平滑
- 不会影响文档流，只是视觉上的变化

---
