# 问题 6：什么是策略模式（Strategy Pattern）？它如何帮助我们优化代码？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/CAAaw7kNBi8icxkzcFAcBRVVnje)

答案：

策略模式是一种行为设计模式，它定义了一系列算法，并将每个算法封装起来，使它们可以互相替换。策略模式让算法的变化独立于使用算法的客户。

如何优化代码：

它可以帮助我们消除冗长、复杂的 if...else 或 switch...case 语句。当业务逻辑中存在多种条件和多种处理方式时，我们可以将每种处理方式封装成一个独立的策略对象，然后根据上下文动态选择并执行相应的策略。

例子： 表单验证。与其写一长串 if/else 来检查不同类型的验证规则（如非空、最小长度、是否为邮件格式），不如将每条规则定义为一个策略对象。

```javascript
const strategies = {
    isNotEmpty: (value, errorMsg) => value === '' ? errorMsg : void 0,
    minLength: (value, length, errorMsg) => value.length < length ? errorMsg : void 0
};
// 验证时，根据需要动态调用策略
const error = strategies.isNotEmpty(inputValue, '用户名不能为空');
```

---
