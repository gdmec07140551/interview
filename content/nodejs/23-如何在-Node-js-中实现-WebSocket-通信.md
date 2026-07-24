# 23. 如何在 Node.js 中实现 WebSocket 通信？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

使用 ws 库：

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('新的连接建立');
  
  ws.on('message', (message) => {
    console.log('收到消息:', message);
    
    // 广播给所有客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`广播: ${message}`);
      }
    });
  });
  
  ws.on('close', () => {
    console.log('连接关闭');
  });
  
  // 发送欢迎消息
  ws.send('欢迎连接到 WebSocket 服务器');
});
```

使用 Socket.io：

```javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('用户断开连接:', socket.id);
  });
});
```
