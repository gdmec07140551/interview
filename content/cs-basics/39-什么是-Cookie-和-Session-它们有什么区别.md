# 39. 什么是 Cookie 和 Session？它们有什么区别？


> 分类：其他综合

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/SKQgwolgNiwW3BkoaQecUVXhnRc)

参考答案：

Cookie 和 Session 都是用来在客户端和服务器之间维持状态的机制。

- Cookie:
  - 数据存储在**客户端**（浏览器）。
  - 不安全，容易被篡改。
  - 单个 Cookie 大小有限制（约 4KB），一个域名下的 Cookie 数量也有限制。
- Session:
  - 数据存储在**服务器端**。
  - 相对安全。
  - 服务器通过一个 Session ID 来识别不同的用户，这个 Session ID 通常通过 Cookie 发送给客户端。
  - 会占用服务器资源，并发用户多时会对服务器造成压力。
区别总结：

- 存储位置： Cookie 在客户端，Session 在服务器端。
- 安全性： Session 比 Cookie 安全。
- 存储容量： Session 能存储的数据量远大于 Cookie。
- 服务器压力： Session 会增加服务器的开销。
