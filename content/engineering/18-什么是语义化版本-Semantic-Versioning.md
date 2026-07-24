# 18. 什么是语义化版本（Semantic Versioning）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

语义化版本是一套版本号命名规则，格式为：主版本号.次版本号.修订号（MAJOR.MINOR.PATCH）。

版本号递增规则：

- MAJOR：不兼容的API修改
- MINOR：向下兼容的功能性新增
- PATCH：向下兼容的问题修正

预发布版本：

- alpha：内部测试版本
- beta：公开测试版本
- rc：候选发布版本

npm中的版本范围：

- ^1.2.3：兼容1.x.x，但不包括2.0.0
- ~1.2.3：兼容1.2.x，但不包括1.3.0
- 1.2.3：精确版本
- &gt;=1.2.3：大于等于指定版本
- latest：最新版本

示例：

```json
{
  "dependencies": {
    "vue": "^3.2.0",      // 3.2.0 <= version < 4.0.0
    "lodash": "~4.17.21", // 4.17.21 <= version < 4.18.0
    "axios": "0.27.2"     // 精确版本
  }
}
```
