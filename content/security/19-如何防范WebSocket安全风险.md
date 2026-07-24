# 19. 如何防范WebSocket安全风险？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh)

参考答案：

主要风险：

- 跨站WebSocket劫持
- 缺乏同源策略保护
- 数据传输安全

防范措施：

```javascript
// 1. 使用WSS加密连接
const socket = new WebSocket('wss://secure-server.com/socket');

// 2. 验证Origin头（服务端）
if (request.headers.origin !== 'https://trusted-domain.com') {
    return reject();
}

// 3. 使用Token认证
socket.onopen = function() {
    socket.send(JSON.stringify({
        type: 'auth',
        token: getAuthToken()
    }));
};

// 4. 输入验证
socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (validateMessage(data)) {
        processMessage(data);
    }
};
```
