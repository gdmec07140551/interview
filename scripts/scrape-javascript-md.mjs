/**
 * Scrape Feishu JS wiki folder .md files into content/javascript/
 * Parent: https://w0hog67yl81.feishu.cn/wiki/NyLwwaMuaihlFikDr7Kcv8ypn2c
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'content', 'javascript')
const PARENT = 'NyLwwaMuaihlFikDr7Kcv8ypn2c'
const SPACE = '7314262008335974428'
const SOURCE = `https://w0hog67yl81.feishu.cn/wiki/${PARENT}`

function slugFromTitle(title) {
  const raw = title.replace(/\.md$/i, '').trim()
  const num = raw.match(/^(\d+)/)?.[1]
  const rest = raw
    .replace(/^\d+[\.\s、]*/, '')
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  if (num) return `${String(num).padStart(2, '0')}-${rest || 'item'}`
  return rest || 'item'
}

function cleanMarkdown(md) {
  return md
    .replace(/\\\./g, '.')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function wrapPage(title, wikiUrl, body) {
  return `# ${title.replace(/\.md$/i, '')}\n\n> 来源：[飞书原文](${wikiUrl})\n\n${cleanMarkdown(body)}\n`
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    locale: 'zh-CN',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
  })
  const page = await context.newPage()

  console.log('open parent wiki…')
  await page.goto(SOURCE, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(3000)

  const children = await page.evaluate(async ({ space, parent }) => {
    const r = await fetch(
      `/space/api/wiki/v2/tree/get_node_child/?space_id=${space}&wiki_token=${parent}`,
      { credentials: 'include' },
    )
    const j = await r.json()
    return j.data?.[parent] || []
  }, { space: SPACE, parent: PARENT })

  console.log('children:', children.length)
  await fs.mkdir(outDir, { recursive: true })

  // clear old article md except we'll rewrite all
  const existing = await fs.readdir(outDir)
  for (const f of existing) {
    if (f.endsWith('.md')) await fs.unlink(path.join(outDir, f))
  }

  const docsMeta = []
  const usedSlugs = new Set()

  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const title = child.title || `item-${i}`
    let slug = slugFromTitle(title)
    if (usedSlugs.has(slug)) slug = `${slug}-${i}`
    usedSlugs.add(slug)

    const wikiUrl = child.url || `https://w0hog67yl81.feishu.cn/wiki/${child.wiki_token}`
    console.log(`[${i + 1}/${children.length}] ${title}`)

    let body = ''
    try {
      body = await page.evaluate(async (obj) => {
        const r = await fetch(`/space/api/box/stream/download/all/${obj}/`, {
          credentials: 'include',
        })
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return await r.text()
      }, child.obj_token)
    } catch (e) {
      console.error('  download fail', e.message)
      body = `_未能下载正文，请打开飞书原文查看。_\n\n原文：${wikiUrl}`
    }

    const md = wrapPage(title, wikiUrl, body)
    await fs.writeFile(path.join(outDir, `${slug}.md`), md, 'utf8')
    docsMeta.push({
      slug,
      title: title.replace(/\.md$/i, ''),
      sourceUrl: wikiUrl,
    })
    await page.waitForTimeout(120)
  }

  // index overview
  const links = docsMeta.map((d) => `- [${d.title}](/m/javascript/${d.slug})`).join('\n')
  const indexMd = `# JavaScript 系列知识点 · 目录

> 来源：[飞书 Wiki](${SOURCE})

共 **${docsMeta.length}** 篇，正文已从飞书文件夹中的 Markdown 原文同步。

## 文章列表

${links}
`
  await fs.writeFile(path.join(outDir, 'index.md'), indexMd, 'utf8')

  const metaPath = path.join(root, 'content', 'meta.json')
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'))
  const mod = meta.modules.find((m) => m.id === 'javascript')
  if (!mod) throw new Error('javascript module missing')
  mod.sourceUrl = SOURCE
  mod.docs = [{ slug: 'index', title: '目录总览' }, ...docsMeta.map(({ slug, title }) => ({ slug, title }))]
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf8')

  // save mapping for debug
  await fs.writeFile(
    path.join(root, 'scripts', 'javascript-feishu-map.json'),
    JSON.stringify(docsMeta, null, 2),
    'utf8',
  )

  console.log('done. docs:', mod.docs.length)
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
