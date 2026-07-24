# 19. 什么是Vite？它相比Webpack有什么优势？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Vite是一个现代化的前端构建工具，由Vue.js作者尤雨溪开发。

核心特性：

- 极速的服务启动：使用原生ES模块
- 轻量快速的热重载：基于ESM的HMR
- 丰富的功能：TypeScript、JSX、CSS等开箱即用
- 优化的构建：使用Rollup进行生产构建

相比Webpack的优势：

开发环境：

- 启动速度快：不需要打包，直接使用ES模块
- 热更新快：只需要重新请求单个模块
- 配置简单：零配置即可使用

生产环境：

- 构建速度快：使用esbuild进行预构建
- 更好的Tree Shaking：基于Rollup
- 现代化输出：原生支持ES模块

适用场景：

- 新项目推荐使用Vite
- 现代浏览器环境
- Vue、React等现代框架项目

局限性：

- 生态系统相对较新
- 某些老旧插件可能不兼容
