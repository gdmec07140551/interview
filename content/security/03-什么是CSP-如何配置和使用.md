# 3. 什么是CSP？如何配置和使用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh)

参考答案：

CSP（Content Security Policy）内容安全策略是一种安全机制，用于检测和减轻XSS攻击。

配置方式：

```html
<!-- HTTP头配置 -->
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'

<!-- Meta标签配置 -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
```

常用指令：

- default-src：默认策略
- script-src：脚本来源
- style-src：样式来源
- img-src：图片来源
