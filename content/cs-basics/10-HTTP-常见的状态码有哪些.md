# 10. HTTP 常见的状态码有哪些？


> 分类：计算机网络

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/SKQgwolgNiwW3BkoaQecUVXhnRc)

参考答案：

- 1xx (信息性状态码): 接收的请求正在处理。
- 2xx (成功状态码):
  - 200 OK: 请求成功。
- 3xx (重定向状态码):
  - 301 Moved Permanently: 永久重定向。
  - 302 Found: 临时重定向。
  - 304 Not Modified: 资源未被修改，客户端可以使用缓存。
- 4xx (客户端错误状态码):
  - 400 Bad Request: 请求语法错误。
  - 401 Unauthorized: 请求需要用户认证。
  - 403 Forbidden: 服务器拒绝执行请求。
  - 404 Not Found: 请求的资源不存在。
- 5xx (服务器错误状态码):
  - 500 Internal Server Error: 服务器内部错误。
  - 502 Bad Gateway: 作为网关或代理的服务器从上游服务器收到无效响应。
  - 503 Service Unavailable: 服务器暂时无法处理请求（过载或维护）。
