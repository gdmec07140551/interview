# 8. 什么是Polyfill和Shim？它们有什么区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Polyfill：

- 用于实现浏览器并不支持的原生API的代码
- 模拟标准API的行为
- 例：Promise polyfill、Array.prototype.includes polyfill

Shim：

- 更广泛的概念，用于修复或增强现有API
- 可能改变现有API的行为
- 不一定遵循标准规范

主要区别：

- Polyfill严格按照标准实现，Shim可能有自己的实现方式
- Polyfill只添加缺失功能，Shim可能修改现有功能
- Polyfill更注重兼容性，Shim更注重功能增强

使用示例：

```javascript
// Polyfill示例
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    return this.indexOf(searchElement) !== -1;
  };
}
```
