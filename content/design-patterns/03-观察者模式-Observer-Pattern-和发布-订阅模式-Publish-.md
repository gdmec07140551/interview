# 问题 3：观察者模式（Observer Pattern）和发布-订阅模式（Publish-Subscribe Pattern）有什么区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/CAAaw7kNBi8icxkzcFAcBRVVnje)

答案：

两者都用于处理对象间的解耦和消息传递，但存在一个关键区别：

- 观察者模式： 观察者（Observer）直接订阅主题（Subject），并维护在主题的订阅者列表中。当主题状态变化时，它会直接通知所有观察者。这是一个紧耦合的关系，主题直接知道它的观察者。
- 发布-订阅模式： 发布者（Publisher）和订阅者（Subscriber）之间是完全解耦的，它们不直接交互。它们通过一个中心的事件总线（Event Bus / Broker）进行通信。发布者向总线发布事件，而订阅者向总线订阅事件。发布者不知道谁是订阅者，反之亦然。

简单来说： 发布-订阅模式多了一个“中间商”（事件总线），实现了更彻底的解耦。DOM事件监听（addEventListener）更接近观察者模式，而像 Vue.js 中的 $on 和 $emit 或 Node.js 的 EventEmitter 则属于发布-订阅模式。

---
