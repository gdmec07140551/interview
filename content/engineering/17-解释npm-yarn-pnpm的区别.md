# 17. 解释npm、yarn、pnpm的区别？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

npm（Node Package Manager）：

- Node.js官方包管理器
- 使用node_modules扁平化结构
- 有lock文件（package-lock.json）
- 安装速度相对较慢

yarn：

- Facebook开发的包管理器
- 并行下载，速度更快
- 更好的缓存机制
- yarn.lock文件锁定版本
- 支持工作空间（Workspaces）

pnpm：

- 使用硬链接和符号链接
- 节省磁盘空间
- 更严格的依赖管理
- 安装速度快
- 天然支持Monorepo

主要区别：

- 存储方式：pnpm使用全局存储，避免重复
- 安装速度：pnpm &gt; yarn &gt; npm
- 磁盘占用：pnpm最少，npm最多
- 依赖管理：pnpm最严格，避免幽灵依赖
