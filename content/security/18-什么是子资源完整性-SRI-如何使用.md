# 18. 什么是子资源完整性（SRI）？如何使用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh)

参考答案：

SRI（Subresource Integrity）用于验证外部资源的完整性，防止CDN劫持等攻击。

使用方法：

```html
<!-- 为外部脚本添加integrity属性 -->
<script src="https://cdn.example.com/library.js" 
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
        crossorigin="anonymous"></script>

<link rel="stylesheet" 
      href="https://cdn.example.com/style.css"
      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
      crossorigin="anonymous">
```

生成哈希值：

```bash
# 使用openssl生成SHA384哈希
openssl dgst -sha384 -binary file.js | openssl base64 -A
```
