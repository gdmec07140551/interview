# 14. 什么是Monorepo？它有什么优缺点？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Monorepo是一种项目代码管理策略，即在一个仓库中管理多个项目。

优点：

- 代码共享：容易共享代码和依赖
- 统一工具链：统一的构建、测试、部署流程
- 原子提交：跨项目的更改可以在一次提交中完成
- 依赖管理：更容易管理项目间依赖
- 重构友好：大规模重构更容易进行

缺点：

- 仓库体积大：随着项目增多，仓库会变得很大
- 构建时间长：可能需要构建整个仓库
- 权限控制：难以对不同项目设置不同权限
- 学习成本：需要学习相应的工具链

常用工具：

- Lerna：JavaScript项目的Monorepo工具
- Nx：可扩展的开发工具
- Rush：Microsoft开发的Monorepo工具
- Yarn Workspaces：Yarn的工作空间功能
