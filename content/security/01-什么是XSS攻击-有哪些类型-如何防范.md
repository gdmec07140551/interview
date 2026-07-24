# 1. 什么是XSS攻击？有哪些类型？如何防范？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh)

参考答案：

XSS（Cross-Site Scripting）跨站脚本攻击是指攻击者在网页中注入恶意脚本代码，当用户浏览该网页时，脚本会在用户浏览器中执行。

类型：

- 存储型XSS：恶意脚本被存储在服务器数据库中
- 反射型XSS：恶意脚本通过URL参数等方式反射给用户
- DOM型XSS：通过修改DOM结构来执行恶意脚本

防范措施：

- 输入验证和输出编码
- 使用CSP（Content Security Policy）
- 设置HttpOnly Cookie
- 使用安全的DOM操作方法
