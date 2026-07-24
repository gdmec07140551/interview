# 1. 描述一下 TCP 的三次握手过程？


> 分类：计算机网络

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/SKQgwolgNiwW3BkoaQecUVXhnRc)

参考答案：

- 第一次握手（SYN）： 客户端向服务器发送一个 SYN（同步序列编号）报文段，其中包含客户端的初始序列号 seq = x。此时客户端进入 SYN_SENT 状态。
- 第二次握手（SYN+ACK）： 服务器收到客户端的 SYN 报文段后，会向客户端发送一个 SYN 和 ACK（确认）都置位的报文段。其中包含服务器的初始序列号 seq = y，以及对客户端序列号的确认号 ack = x + 1。此时服务器进入 SYN_RCVD 状态。
- 第三次握手（ACK）： 客户端收到服务器的 SYN+ACK 报文段后，会向服务器发送一个 ACK 报文段。其中序列号为 seq = x + 1，确认号为 ack = y + 1。此时客户端进入 ESTABLISHED 状态，服务器收到该 ACK 后也进入 ESTABLISHED 状态，连接建立完成。
