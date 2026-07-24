# 15. 解释什么是持续集成（CI）和持续部署（CD）？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

持续集成（CI - Continuous Integration）：

- 开发人员频繁地将代码集成到主干
- 每次集成都通过自动化构建来验证
- 快速发现集成错误

持续部署（CD - Continuous Deployment/Delivery）：

- Continuous Delivery：确保代码随时可以部署到生产环境
- Continuous Deployment：每次通过CI的代码自动部署到生产环境

前端CI/CD流程：

1. 代码提交：开发者推送代码到仓库
2. 自动构建：触发构建流程
3. 代码检查：ESLint、TypeScript检查
4. 自动测试：单元测试、集成测试
5. 构建打包：Webpack打包
6. 部署：部署到测试/生产环境

常用工具：

- Jenkins、**GitHub Actions**、GitLab CI
- Docker、Kubernetes
- AWS、**阿里云**等云服务
