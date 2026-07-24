# 25. 什么是Serverless？它对前端开发有什么影响？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Serverless是一种云计算执行模型，开发者无需管理服务器基础设施。

特点：

- 无服务器管理：云服务商管理服务器
- 按需付费：只为实际使用付费
- 自动扩缩容：根据负载自动调整
- 事件驱动：通过事件触发执行

对前端的影响：

1. JAMstack架构：

- JavaScript + APIs + Markup
- 静态站点生成
- 通过API调用后端服务

2. 边缘计算：

- CDN边缘节点执行代码
- 降低延迟
- 提升用户体验

3. 全栈开发：

- 前端开发者可以编写后端逻辑
- 简化部署流程
- 降低运维成本

常见平台：

- Vercel：专注于前端部署
- Netlify：静态站点托管
- AWS Lambda：函数即服务
- Cloudflare Workers：边缘计算
