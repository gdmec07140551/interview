# 前端面试知识站

本地可打开的前端面试复习站：左侧专题模块、顶部全局搜索、右侧 Markdown（代码高亮 / 折叠要点）。

## 使用

```bash
npm install
npm run dev
```

浏览器打开终端提示的本地地址即可。

| 快捷键 | 作用 |
|--------|------|
| `Ctrl/Cmd + K` | 打开搜索 |

## 内容

- 模块树与飞书「史上最全八股文」对齐，见 `content/meta.json`
- 正文在 `content/<模块>/*.md`，每篇带飞书原文链接
- 重新生成内容：`npm run generate:content`

## 脚本

- `npm run dev` — 开发
- `npm run build` — 生产构建
- `npm run scrape` — 尝试从飞书抓取（匿名页内容有限时以 generate 为准）
