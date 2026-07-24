# 6. 什么是SQL注入？前端如何防范？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh)

参考答案：

SQL注入是指攻击者通过在输入中插入恶意SQL代码来操作数据库。

前端防范：

- 输入验证和过滤
- 使用参数化查询（后端配合）
- 对特殊字符进行转义
- 限制输入长度和格式
- 使用白名单验证

```javascript
// 输入验证示例
function validateInput(input) {
    const sqlKeywords = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\b)/i;
    return !sqlKeywords.test(input);
}
```
