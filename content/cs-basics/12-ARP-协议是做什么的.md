# 12. ARP 协议是做什么的？


> 分类：计算机网络

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/SKQgwolgNiwW3BkoaQecUVXhnRc)

参考答案：

ARP（Address Resolution Protocol，地址解析协议）的作用是在局域网中，根据一个已知的 IP 地址，解析出其对应的 MAC（物理）地址。当一台主机需要和局域网内的另一台主机通信时，它知道对方的 IP 地址，但数据包在数据链路层传输需要目标的 MAC 地址。此时，它会广播一个 ARP 请求，请求中包含目标的 IP 地址。局域网内所有主机都会收到这个请求，但只有 IP 地址匹配的主机会响应一个 ARP 应答，应答中包含自己的 MAC 地址。
