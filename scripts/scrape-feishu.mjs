import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const contentDir = path.join(root, 'content')

const modules = [
  {
    id: 'interview-prep',
    title: '面试该如何准备',
    url: 'https://my.feishu.cn/docx/BTIkdAC4MorCtHxEP4DcnJqenWg',
    docs: [{ slug: 'index', title: '面试该如何准备', url: null }],
  },
  {
    id: 'javascript',
    title: 'JavaScript 系列知识点',
    url: 'https://w0hog67yl81.feishu.cn/wiki/NyLwwaMuaihlFikDr7Kcv8ypn2c',
    docs: [{ slug: 'index', title: 'JavaScript 系列知识点', url: null }],
  },
  {
    id: 'css-layout',
    title: 'CSS 布局全解',
    url: 'https://w0hog67yl81.feishu.cn/wiki/Abt9w8NlGi0KJckWOU7cugyVnIb',
    docs: [{ slug: 'index', title: 'CSS 布局全解', url: null }],
  },
  {
    id: 'css',
    title: 'CSS 面试题库',
    url: 'https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde',
    docs: [{ slug: 'index', title: 'CSS 面试题库', url: null }],
  },
  {
    id: 'html',
    title: 'HTML 面试题库',
    url: 'https://w0hog67yl81.feishu.cn/wiki/UXLkwcSP6io0LJk6gInc1p3Ynxe',
    docs: [{ slug: 'index', title: 'HTML 面试题库', url: null }],
  },
  {
    id: 'browser',
    title: '浏览器原理核心知识点',
    url: 'https://w0hog67yl81.feishu.cn/wiki/DraiwExLji1DOfkZiGucEljKnEb',
    docs: [{ slug: 'index', title: '浏览器原理核心知识点', url: null }],
  },
  {
    id: 'es6',
    title: 'ES6 高频面试题',
    url: 'https://w0hog67yl81.feishu.cn/wiki/GctYwGIMRi3qNIk7caYck20hnof',
    docs: [{ slug: 'index', title: 'ES6 高频面试题', url: null }],
  },
  {
    id: 'react',
    title: 'React 高频面试题',
    url: 'https://w0hog67yl81.feishu.cn/wiki/PLICwMsqwiGkEuk01lWcdTXVn8e',
    docs: [
      { slug: 'index', title: 'React 总览', url: null },
      { slug: 'basics', title: '第一部分：基础与核心思想', url: null },
      { slug: 'state', title: '第二部分：状态管理', url: null },
      { slug: 'hooks', title: '第三部分：Hooks 深度解析', url: null },
      { slug: 'perf', title: '第四部分：性能优化与新特性', url: null },
    ],
  },
  {
    id: 'vue',
    title: 'Vue 高频面试题',
    url: 'https://my.feishu.cn/docx/YVtrdaQRboVBWjxuGM4cXpFAnMb',
    docs: [{ slug: 'index', title: 'Vue 高频面试题', url: null }],
  },
  {
    id: 'typescript',
    title: 'TypeScript 面试题',
    url: 'https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf',
    docs: [{ slug: 'index', title: 'TypeScript 面试题', url: null }],
  },
  {
    id: 'engineering',
    title: '前端工程化面试题',
    url: 'https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l',
    docs: [{ slug: 'index', title: '前端工程化面试题', url: null }],
  },
  {
    id: 'cs-basics',
    title: '计算机基础面试题',
    url: 'https://w0hog67yl81.feishu.cn/wiki/SKQgwolgNiwW3BkoaQecUVXhnRc',
    docs: [{ slug: 'index', title: '计算机基础面试题', url: null }],
  },
  {
    id: 'nodejs',
    title: 'Node.js 面试题',
    url: 'https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c',
    docs: [{ slug: 'index', title: 'Node.js 面试题', url: null }],
  },
  {
    id: 'performance',
    title: '前端性能优化',
    url: 'https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf',
    docs: [{ slug: 'index', title: '前端性能优化', url: null }],
  },
  {
    id: 'miniprogram',
    title: '小程序八股文',
    url: 'https://w0hog67yl81.feishu.cn/wiki/QwmHwAqJYiktztkd3S9cRpQUn5r',
    docs: [{ slug: 'index', title: '小程序八股文', url: null }],
  },
  {
    id: 'design-patterns',
    title: '设计模式',
    url: 'https://w0hog67yl81.feishu.cn/wiki/CAAaw7kNBi8icxkzcFAcBRVVnje',
    docs: [{ slug: 'index', title: '设计模式', url: null }],
  },
  {
    id: 'security',
    title: '前端安全面试题',
    url: 'https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh',
    docs: [{ slug: 'index', title: '前端安全面试题', url: null }],
  },
  {
    id: 'js-handwrite',
    title: 'JS 手写题',
    url: 'https://w0hog67yl81.feishu.cn/wiki/WA8Cw0NJFiEDSWkfEnNciVmrnww',
    docs: [{ slug: 'index', title: 'JS 手写题', url: null }],
  },
]

function toMarkdown(title, sourceUrl, text) {
  const cleaned = text
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  // Heuristic: lines that look like questions become h2; code-ish blocks get fences if indented heavily
  const lines = cleaned.split('\n')
  const out = []
  out.push(`# ${title}`)
  out.push('')
  out.push(`> 来源：[飞书文档](${sourceUrl})`)
  out.push('')

  let inCode = false
  for (const raw of lines) {
    const line = raw.trimEnd()
    const t = line.trim()

    if (!t) {
      out.push('')
      continue
    }

    // Skip chrome UI noise
    if (
      /^(Log In or Sign Up|Feishu Docs|Last updated|Shared With Me|List View|Display Settings|Upload|New|Help Center|Keyboard Shortcuts)$/i.test(
        t,
      )
    ) {
      continue
    }
    if (t === title || t === `${title} ​`) continue

    // Detect fenced-like code: lines starting with typical code tokens when many consecutive
    const looksCode =
      /^(const |let |var |function |class |import |export |return |if \(|for \(|while \(|=>|<\/?[a-zA-Z]|\{|\}|\);?$|console\.|document\.|React\.|use[A-Z])/.test(
        t,
      ) || /^\s{2,}/.test(raw)

    if (looksCode && !inCode) {
      out.push('')
      out.push('```js')
      inCode = true
    } else if (inCode && !looksCode && !/^[\])}.;,`]/.test(t)) {
      out.push('```')
      out.push('')
      inCode = false
    }

    if (!inCode) {
      if (/^第[一二三四五六七八九十\d]+部分/.test(t) || /^#{1,3}\s/.test(t)) {
        out.push(`## ${t.replace(/^#+\s*/, '')}`)
        continue
      }
      if (/^(\d+[\.、]|Q\d+|题目\s*\d+)/.test(t) && t.length < 120) {
        out.push('')
        out.push(`## ${t}`)
        out.push('')
        continue
      }
      if (/^(参考答案|答案|解析|要点|示例|注意)[:：]?$/.test(t)) {
        out.push('')
        out.push('<details class="answer-fold">')
        out.push(`<summary>${t.replace(/[:：]$/, '') || '参考要点'}</summary>`)
        out.push('')
        continue
      }
    }

    out.push(inCode ? raw.replace(/\t/g, '  ') : t)
  }

  if (inCode) out.push('```')

  // Close dangling details roughly if opened
  let openDetails = (out.join('\n').match(/<details/g) || []).length
  let closeDetails = (out.join('\n').match(/<\/details>/g) || []).length
  while (closeDetails < openDetails) {
    out.push('')
    out.push('</details>')
    closeDetails++
  }

  return `${out.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`
}

async function extractPage(page) {
  await page.waitForTimeout(2500)
  // Try scroll to load lazy content
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    for (let i = 0; i < 8; i++) {
      window.scrollBy(0, 1200)
      await sleep(200)
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(800)

  return page.evaluate(() => {
    const pick =
      document.querySelector('.page-block-content') ||
      document.querySelector('[class*="wiki-page"]') ||
      document.querySelector('article') ||
      document.querySelector('[data-content-editable-root]') ||
      document.querySelector('.doc-content') ||
      document.body

    const title =
      document.querySelector('h1')?.innerText?.trim() ||
      document.title.replace(/\s*-\s*Feishu Docs.*/, '').trim()

    const childLinks = [...document.querySelectorAll('a[href*="/wiki/"], a[href*="/docx/"]')]
      .map((a) => ({
        text: (a.innerText || '').replace(/\s+/g, ' ').trim(),
        href: a.href.split('?')[0],
      }))
      .filter((x) => x.text && x.text.length < 80)

    return {
      title,
      text: (pick?.innerText || '').trim(),
      childLinks,
    }
  })
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    locale: 'zh-CN',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
  })
  const page = await context.newPage()
  const metaModules = []

  for (const mod of modules) {
    console.log(`\n==> ${mod.id}: ${mod.url}`)
    const dir = path.join(contentDir, mod.id)
    await fs.mkdir(dir, { recursive: true })

    let pageData
    try {
      await page.goto(mod.url, { waitUntil: 'domcontentloaded', timeout: 60000 })
      pageData = await extractPage(page)
    } catch (e) {
      console.error('  fail open', e.message)
      pageData = { title: mod.title, text: '', childLinks: [] }
    }

    // Match react subdocs by child wiki titles if present
    if (mod.id === 'react' && pageData.childLinks.length) {
      const partMap = [
        ['basics', /第一部分|基础与核心/],
        ['state', /第二部分|状态管理/],
        ['hooks', /第三部分|Hooks/],
        ['perf', /第四部分|性能|最新特性|新特性/],
      ]
      for (const [slug, re] of partMap) {
        const hit = pageData.childLinks.find((c) => re.test(c.text) && c.href.includes('/wiki/'))
        const doc = mod.docs.find((d) => d.slug === slug)
        if (hit && doc) doc.url = hit.href
      }
    }

    // For wiki catalog pages with little body text, try collecting unique child pages under same space
    const uniqueChildren = []
    const seen = new Set()
    for (const c of pageData.childLinks) {
      if (!c.href || c.href === mod.url.split('?')[0]) continue
      if (seen.has(c.href)) continue
      // Prefer same wiki space pages that look like content titles
      if (/^第|^Q\d|面试|知识点|原理|题/.test(c.text) || c.text.length > 4) {
        seen.add(c.href)
        uniqueChildren.push(c)
      }
    }

    const docsMeta = []

    // Always write index from current page
    {
      const md = toMarkdown(
        pageData.title || mod.title,
        mod.url,
        pageData.text || `暂未能抓取正文，请打开原文查看。\n\n原文：${mod.url}`,
      )
      await fs.writeFile(path.join(dir, 'index.md'), md, 'utf8')
      docsMeta.push({ slug: 'index', title: pageData.title || mod.docs[0].title })
      console.log(`  wrote index.md (${md.length} chars)`)
    }

    // React parts
    if (mod.id === 'react') {
      for (const doc of mod.docs.filter((d) => d.slug !== 'index')) {
        const url = doc.url
        if (!url) {
          await fs.writeFile(
            path.join(dir, `${doc.slug}.md`),
            `# ${doc.title}\n\n> 来源：[飞书文档](${mod.url})\n\n暂未能定位子文档链接，请从总览页进入对应章节。\n`,
            'utf8',
          )
          docsMeta.push({ slug: doc.slug, title: doc.title })
          continue
        }
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
          const data = await extractPage(page)
          const md = toMarkdown(doc.title, url, data.text)
          await fs.writeFile(path.join(dir, `${doc.slug}.md`), md, 'utf8')
          docsMeta.push({ slug: doc.slug, title: doc.title })
          console.log(`  wrote ${doc.slug}.md (${md.length} chars)`)
        } catch (e) {
          console.error(`  fail ${doc.slug}`, e.message)
          docsMeta.push({ slug: doc.slug, title: doc.title })
        }
      }
    } else if (uniqueChildren.length > 2 && pageData.text.length < 1500) {
      // Catalog-like page: scrape a few top children into separate docs (cap to avoid explosion)
      const extras = uniqueChildren.slice(0, 12)
      for (const child of extras) {
        const slug = slugify(child.text) || `doc-${docsMeta.length}`
        if (slug === 'index') continue
        if (docsMeta.some((d) => d.slug === slug)) continue
        try {
          await page.goto(child.href, { waitUntil: 'domcontentloaded', timeout: 60000 })
          const data = await extractPage(page)
          if ((data.text || '').length < 80) continue
          const md = toMarkdown(child.text, child.href, data.text)
          await fs.writeFile(path.join(dir, `${slug}.md`), md, 'utf8')
          docsMeta.push({ slug, title: child.text })
          console.log(`  wrote ${slug}.md (${md.length} chars)`)
        } catch (e) {
          console.error(`  fail child ${child.text}`, e.message)
        }
      }
    }

    metaModules.push({
      id: mod.id,
      title: mod.title,
      sourceUrl: mod.url,
      docs: docsMeta.length ? docsMeta : [{ slug: 'index', title: mod.title }],
    })
  }

  // Merge with friendly titles for sidebar where useful
  const titleOverrides = {
    'interview-prep': '面试准备',
    javascript: 'JavaScript 系列知识点',
    'css-layout': 'CSS 布局全解',
    css: 'CSS 面试题库（44）',
    html: 'HTML 面试题库（50）',
    browser: '浏览器原理',
    es6: 'ES6 高频（30）',
    react: 'React 高频',
    vue: 'Vue 高频',
    typescript: 'TypeScript（50）',
    engineering: '前端工程化（30）',
    'cs-basics': '网络 / OS / 数据结构（50）',
    nodejs: 'Node.js（30）',
    performance: '性能优化（30）',
    miniprogram: '小程序（10）',
    'design-patterns': '设计模式（10）',
    security: '前端安全（20）',
    'js-handwrite': 'JS 手写题（50）',
  }

  const meta = {
    title: '前端面试知识站',
    modules: metaModules.map((m) => ({
      ...m,
      title: titleOverrides[m.id] || m.title,
    })),
  }

  // Keep react doc titles stable
  const react = meta.modules.find((m) => m.id === 'react')
  if (react) {
    const order = ['index', 'basics', 'state', 'hooks', 'perf']
    const titleMap = {
      index: 'React 总览',
      basics: '第一部分：基础与核心思想',
      state: '第二部分：状态管理',
      hooks: '第三部分：Hooks 深度解析',
      perf: '第四部分：性能优化与新特性',
    }
    react.docs = order
      .map((slug) => react.docs.find((d) => d.slug === slug) || { slug, title: titleMap[slug] })
      .map((d) => ({ ...d, title: titleMap[d.slug] || d.title }))
  }

  await fs.writeFile(path.join(contentDir, 'meta.json'), JSON.stringify(meta, null, 2), 'utf8')
  console.log('\nDone. Updated content/meta.json')
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
