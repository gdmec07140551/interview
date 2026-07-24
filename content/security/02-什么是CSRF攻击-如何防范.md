# 2. 什么是CSRF攻击？如何防范？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh)

参考答案：

CSRF（Cross-Site Request Forgery）跨站请求伪造是指攻击者诱导用户在已登录的网站上执行非本意的操作。

防范措施：

- 使用CSRF Token验证
- 检查Referer头
- 使用SameSite Cookie属性
- 重要操作添加验证码
- 使用双重Cookie验证
