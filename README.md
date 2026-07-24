# 前端面试知识站

本地 / 可部署的前端面试复习站：左侧专题模块、顶部全局搜索、Markdown / PDF 预览。

## 本地使用

```bash
npm install
npm run dev
```

| 快捷键 | 作用 |
|--------|------|
| `Ctrl/Cmd + K` | 打开搜索 |

## 部署到 Gitee Pages（可公网访问）

仓库已关联：`https://gitee.com/joke.com/interview.git`

### 1. 推送源码到 Gitee

```bash
git add .
git commit -m "deploy: ready for gitee pages"
git push gitee master
```

### 2. 构建并发布静态站点

```bash
npm run deploy:gitee
```

该命令会：

1. 以 `/interview/` 为 base 构建到 `dist/`
2. 把 `dist/` 推到 Gitee 的 `gh-pages` 分支

### 3. 在 Gitee 开启 Pages

1. 打开仓库 → **服务** → **Gitee Pages**
2. 部署分支选 **`gh-pages`**，目录选 **`/`**
3. 首次使用通常需要 **实名认证** 后才能开启
4. 点击启动 / 更新

访问地址一般为：

`https://joke.com.gitee.io/interview/`

（Hash 路由，完整示例：`https://joke.com.gitee.io/interview/#/m/interview-prep/index`）

### 说明

- 已使用 `HashRouter`，Gitee 静态托管下刷新页面不会 404
- `public/` 里的 PDF 会一并发布；仓库体积较大，首次推送可能较慢
- 以后改完内容再执行一次 `npm run deploy:gitee`，并在 Pages 页点「更新」

## 内容

- 模块树见 `content/meta.json`
- 正文在 `content/<模块>/*.md`
- PDF 在 `public/`（如 `public/css-layout/`、`public/baguwen/`）

## 常用脚本

| 命令 | 作用 |
|------|------|
| `npm run dev` | 本地开发 |
| `npm run build` | 生产构建（根路径） |
| `npm run build:gitee` | 面向 Gitee Pages 构建 |
| `npm run deploy:gitee` | 构建并推送到 `gh-pages` |
| `npm run scrape:*` | 从飞书同步各模块内容 |
