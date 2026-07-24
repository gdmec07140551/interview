# 38. unknown 和 any 在 JSON 解析场景下如何选择？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案: 应该选择 unknown。因为从外部（如 API）获取的 JSON 数据结构是不确定的，使用 unknown 会强制开发者在使用数据前进行安全的类型检查（如属性存在性检查、类型断言），而 any 则会绕过所有类型检查，容易引入运行时错误。
