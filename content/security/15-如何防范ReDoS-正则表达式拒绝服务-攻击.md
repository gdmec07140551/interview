# 15. 如何防范ReDoS（正则表达式拒绝服务）攻击？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh)

参考答案：

ReDoS攻击利用正则表达式的回溯特性，通过特殊输入导致CPU占用过高。

危险模式：

```javascript
// 危险的正则表达式
const badRegex = /^(a+)+$/;
const input = 'a'.repeat(25) + 'X'; // 触发灾难性回溯
```

防范措施：

- 避免嵌套量词：(a+)+、(a*)*
- 使用具体量词：{1,10}代替+
- 设置超时限制
- 使用正则表达式安全检测工具
- 考虑使用有限状态自动机
