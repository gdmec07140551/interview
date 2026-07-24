# 问题 8：在React中，自定义Hooks（Custom Hooks）可以看作是哪种设计模式的应用？请说明理由。

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/CAAaw7kNBi8icxkzcFAcBRVVnje)

答案：

自定义 Hooks 可以看作是 策略模式（Strategy Pattern） 和 组合模式（Composition Pattern） 的一种应用。

- 策略模式： 每个自定义 Hook 封装了一段特定的、可复用的逻辑（一个“策略”），例如数据获取逻辑 (useFetch)、订阅事件逻辑 (useEventListener) 或表单状态管理逻辑 (useForm)。组件可以根据需要“选择”并使用这些策略，而无需关心其内部实现细节。这使得逻辑本身可以独立于使用它的UI组件。
- 组合模式： React 的核心思想之一就是“组合优于继承”。自定义 Hook 允许你将组件逻辑提取到可重用的函数中，然后通过简单地调用这些函数，将不同的逻辑“组合”到你的组件中。你可以将多个自定义 Hook 组合在一个组件里，也可以在一个自定义 Hook 内部调用另一个自定义 Hook，形成复杂的逻辑组合树。

---
