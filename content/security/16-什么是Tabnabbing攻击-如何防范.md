# 16. 什么是Tabnabbing攻击？如何防范？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh)

参考答案：

Tabnabbing攻击是指恶意网站通过window.opener修改原页面，进行钓鱼攻击。

攻击场景：

```javascript
// 恶意页面代码
if (window.opener) {
    window.opener.location = 'https://fake-bank.com/login';
}
```

防范措施：

```javascript
// 使用rel="noopener noreferrer"
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">链接</a>

// JavaScript打开窗口时清除opener
const newWindow = window.open('https://external-site.com');
newWindow.opener = null;
```
