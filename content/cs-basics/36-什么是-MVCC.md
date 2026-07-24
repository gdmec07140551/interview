# 36. 什么是 MVCC？


> 分类：数据库

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/SKQgwolgNiwW3BkoaQecUVXhnRc)

参考答案：

MVCC（Multi-Version Concurrency Control），多版本并发控制，是一种用来解决读-写冲突的无锁并发控制机制。它通过为数据行的每个修改都保存一个版本，并用版本号来区分，从而实现在不加锁的情况下处理读-写并发。

在 MVCC 中，读操作通常读取的是行在某个时间点的快照，而写操作（INSERT, UPDATE, DELETE）则是创建一个新的数据行版本，而不是直接覆盖旧版本。这样，读操作和写操作可以同时进行而不会互相阻塞。MVCC 是实现“读已提交”和“可重复读”隔离级别的关键技术。
