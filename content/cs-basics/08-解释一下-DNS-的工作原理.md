# 8. 解释一下 DNS 的工作原理？


> 分类：计算机网络

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/SKQgwolgNiwW3BkoaQecUVXhnRc)

参考答案：

DNS（Domain Name System）负责将人类可读的域名解析为机器可读的 IP 地址。

解析过程通常分为两种：

- 递归查询： 客户端向本地 DNS 服务器发起查询请求，如果本地 DNS 服务器没有缓存该域名的 IP，它会代替客户端向根 DNS 服务器、顶级域（TLD）DNS 服务器、权威 DNS 服务器逐级查询，直到找到结果，然后将最终结果返回给客户端。
- 迭代查询： 本地 DNS 服务器向根 DNS 服务器查询，根服务器返回 TLD 服务器的地址；本地 DNS 再向 TLD 服务器查询，TLD 服务器返回权威 DNS 服务器的地址；最后本地 DNS 向权威 DNS 服务器查询，得到最终的 IP 地址。
