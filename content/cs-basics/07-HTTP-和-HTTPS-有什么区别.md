# 7. HTTP 和 HTTPS 有什么区别？


> 分类：计算机网络

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/SKQgwolgNiwW3BkoaQecUVXhnRc)

参考答案：

- 安全性： HTTP 是超文本传输协议，数据以明文方式传输，不安全。HTTPS（HTTP Secure）是 HTTP 的安全版，通过 SSL/TLS 协议对数据进行加密传输，并进行身份认证，安全性更高。
- 连接方式和端口： HTTP 的默认端口是 80。HTTPS 的默认端口是 443。HTTPS 在 TCP 三次握手之后，还需要进行 SSL/TLS 的握手过程。
- 证书： HTTPS 需要向证书颁发机构（CA）申请数字证书，以证明服务器的身份。
- 开销： HTTPS 因为涉及加密解密和证书验证，会比 HTTP 消耗更多的服务器资源和处理时间。
