# 44. 解释一下 TypeScript 的“名义化类型”模拟。

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: TypeScript 是结构化类型系统，有时我们需要名义化类型（即类型名称不同就视为不同类型）。可以通过品牌化（Branding）技术来模拟，即在类型中添加一个唯一的、私有的品牌属性（如 __brand: 'UserId'），使得即使两个类型结构相同，由于品牌不同，它们也不再兼容。
