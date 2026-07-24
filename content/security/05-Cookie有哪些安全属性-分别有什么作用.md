# 5. Cookie有哪些安全属性？分别有什么作用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh)

参考答案：

安全属性：

- HttpOnly：防止JavaScript访问Cookie，减少XSS攻击
- Secure：只在HTTPS连接中传输Cookie
- SameSite：控制跨站请求时是否发送Cookie
  - Strict：完全禁止跨站发送
  - Lax：部分跨站请求可发送
  - None：允许跨站发送（需配合Secure）

```javascript
document.cookie = "sessionId=abc123; HttpOnly; Secure; SameSite=Strict";
```
