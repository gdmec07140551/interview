# 一、渲染流程与性能优化

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/S35VwTooHiOI7JkeHiectTj4n5c)

| 主题 | 核心知识点 | 概要 |
| --- | --- | --- |
| 1.从URL到完整页面的流程 | • 从输入URL到页面呈现的全过程<br>• 关键渲染路径 | 高度概括整个流程（网络请求、构建DOM/CSSOM、渲染、布局、绘制），建立宏观认知<br>了解关键渲染路径的几大阶段。 |
| 2.构建DOM与CSSOM | • DOM树与CSSOM树的构建过程<br>• CSSOM的渲染阻塞特性 | 解释为何DOM是渐进式的，而CSSOM是阻塞性的，为后续的优化打下基础。 |
| 3.JS的加载与阻塞 | • &lt;script&gt; 对解析的影响<br>• async vs defer | 讨论JavaScript在渲染流程中的角色。<br>解释默认脚本如何阻塞DOM构建<br>引出async和defer作为优化手段。 |
| 4.渲染树、布局与绘制 | • 什么是渲染树 (Render Tree)<br>• 什么是布局(Layout/Reflow)与绘制(Paint) | 将DOM和CSSOM结合，生成渲染树。<br>详细解释布局（计算位置大小）和绘制（填充像素）这两个核心步骤。 |
| 5.高性能的秘密：图层与合成 | • 图层(Layer)与合成(Compositing)<br>• transform 高性能的秘密 | 了解渲染的最后一步：合成。<br>解释为何transform和opacity能跳过布局和绘制，实现GPU加速（现代前端动画优化的关键） |
| 6.性能优化实战：减少回流与重绘 | • 常见触发回流/重绘的操作<br>• 批量修改DOM、读写分离 | 聚焦于如何通过具体的编码技巧（如DocumentFragment、批量修改样式）来避免不必要的渲染开销。 |
| 7.性能优化实战：合成层的妙用 | • will-change 的使用<br>• 合成层的利与弊 | 深入讲解如何通过will-change等CSS属性手动或自动创建合成层，并讨论过度使用可能带来的问题。 |
| 8.度量与分析：核心Web指标 | • LCP, INP, CLS<br>• 使用 DevTools 进行性能分析 | 用数据说话。介绍核心Web指标，并实战演示如何使用Lighthouse和Performance面板来发现、度量和验证渲染性能问题。 |
