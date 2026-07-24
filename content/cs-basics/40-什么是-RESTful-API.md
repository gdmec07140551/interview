# 40. 什么是 RESTful API？


> 分类：其他综合

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/SKQgwolgNiwW3BkoaQecUVXhnRc)

参考答案：

REST（Representational State Transfer）是一种软件架构风格，不是标准。RESTful API 是遵循 REST 风格设计的 API。

其核心特点包括：

- 资源（Resources）： API 操作的对象都是资源，用 URI (统一资源标识符) 来表示。
- 表现层（Representation）： 资源以某种表现形式（如 JSON, XML）进行传输。
- 状态转移（State Transfer）： 通过 HTTP 动词（GET, POST, PUT, DELETE 等）来对资源进行操作，实现客户端和服务器状态的转移。
  - GET: 获取资源
  - POST: 新建资源
  - PUT: 更新整个资源
  - DELETE: 删除资源
- 无状态（Stateless）： 服务器不保存客户端的会话状态。每一次请求都必须包含所有必要的信息。
