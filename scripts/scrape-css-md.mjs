/**
 * Scrape Feishu CSS interview docx into per-question pages under content/css/
 * Source: https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde
 * (single docx with heading2 Q&A sections — not a wiki folder)
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'content', 'css')
const PARENT = 'KrzqwnIMfiVDAAkVDHWc7fq9nde'
const DOC_TOKEN = 'W5p1dsp1aoSLbVx6J4AchkB1noT'
const SOURCE = `https://w0hog67yl81.feishu.cn/wiki/${PARENT}`
const MODULE_ID = 'css'

function blockText(block) {
  return block?.data?.text?.initialAttributedTexts?.text?.['0'] ?? ''
}

function slugFromTitle(title) {
  const raw = title.trim()
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

function blocksToMarkdown(blocks) {
  const lines = []
  let orderedIndex = 0

  for (const block of blocks) {
    const type = block?.data?.type
    if (!type) continue

    if (type === 'divider') {
      lines.push('', '---', '')
      orderedIndex = 0
      continue
    }

    const text = blockText(block).replace(/\r\n/g, '\n')

    if (type === 'heading2') {
      lines.push('', `## ${text}`, '')
      orderedIndex = 0
      continue
    }

    if (type === 'code') {
      const lang = (block.data.language || '').toLowerCase() || 'css'
      lines.push('', `\`\`\`${lang}`, text, '```', '')
      orderedIndex = 0
      continue
    }

    if (type === 'bullet') {
      if (text) lines.push(`- ${text}`)
      orderedIndex = 0
      continue
    }

    if (type === 'ordered') {
      orderedIndex += 1
      if (text) lines.push(`${orderedIndex}. ${text}`)
      continue
    }

    if (type === 'text') {
      orderedIndex = 0
      if (!text) {
        lines.push('')
        continue
      }
      const prev = lines[lines.length - 1] || ''
      if (/^[-*] |\d+\. /.test(prev)) lines.push('')
      lines.push(text)
      lines.push('')
      continue
    }

    // fallback
    if (text) {
      lines.push(text, '')
      orderedIndex = 0
    }
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

async function fetchAllBlocks(page, docId) {
  let cursor = ''
  const block_map = {}
  for (let i = 0; i < 50; i++) {
    const u =
      `/space/api/docx/pages/client_vars?id=${docId}&mode=7&limit=500` +
      (cursor ? `&cursor=${encodeURIComponent(cursor)}` : '')
    const j = await page.evaluate(async (url) => {
      const r = await fetch(url, { credentials: 'include' })
      return await r.json()
    }, u)
    if (j.code !== 0) throw new Error(`client_vars fail: ${JSON.stringify(j).slice(0, 200)}`)
    Object.assign(block_map, j.data.block_map || {})
    if (!j.data.has_more) break
    cursor = j.data.cursor || ''
    if (!cursor) break
  }
  return block_map
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    locale: 'zh-CN',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
  })
  const page = await context.newPage()

  console.log('open CSS wiki doc…')
  await page.goto(SOURCE, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(2500)

  console.log('fetch client_vars…')
  const block_map = await fetchAllBlocks(page, DOC_TOKEN)
  const pageBlock = block_map[DOC_TOKEN]
  if (!pageBlock) throw new Error('root page block missing')
  const children = pageBlock.data.children || []
  console.log('blocks', Object.keys(block_map).length, 'children', children.length)

  // Split by heading2
  const sections = []
  let current = null
  for (const cid of children) {
    const block = block_map[cid]
    if (!block) continue
    if (block.data?.type === 'heading2') {
      if (current) sections.push(current)
      current = {
        title: blockText(block).trim(),
        blocks: [block],
      }
      continue
    }
    if (current) current.blocks.push(block)
  }
  if (current) sections.push(current)

  console.log('questions:', sections.length)
  if (!sections.length) throw new Error('no heading2 sections found')

  await fs.mkdir(outDir, { recursive: true })
  const existing = await fs.readdir(outDir)
  for (const f of existing) {
    if (f.endsWith('.md')) await fs.unlink(path.join(outDir, f))
  }

  const docsMeta = []
  const usedSlugs = new Set()

  for (let i = 0; i < sections.length; i++) {
    const { title, blocks } = sections[i]
    let slug = slugFromTitle(title)
    if (usedSlugs.has(slug)) slug = `${slug}-${i}`
    usedSlugs.add(slug)

    // body without repeating the heading as ## (page already has # title)
    const bodyBlocks = blocks.filter((b) => b.data?.type !== 'heading2')
    const body = blocksToMarkdown(bodyBlocks)
    const md = `# ${title}

> 来源：[飞书原文](${SOURCE})

${body}
`
    await fs.writeFile(path.join(outDir, `${slug}.md`), md, 'utf8')
    docsMeta.push({ slug, title, sourceUrl: SOURCE })
    console.log(`[${i + 1}/${sections.length}] ${title} (${md.length} chars)`)
  }

  const links = docsMeta.map((d) => `- [${d.title}](/m/${MODULE_ID}/${d.slug})`).join('\n')
  const indexMd = `# CSS 面试题库 · 目录

> 来源：[飞书 Wiki](${SOURCE})

共 **${docsMeta.length}** 题，正文已从飞书文档同步。

## 题目列表

${links}
`
  await fs.writeFile(path.join(outDir, 'index.md'), indexMd, 'utf8')

  const metaPath = path.join(root, 'content', 'meta.json')
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'))
  const mod = meta.modules.find((m) => m.id === MODULE_ID)
  if (!mod) throw new Error(`${MODULE_ID} module missing`)
  mod.sourceUrl = SOURCE
  mod.title = `CSS 面试题库（${docsMeta.length}）`
  mod.docs = [
    { slug: 'index', title: '目录总览' },
    ...docsMeta.map((d) => ({ slug: d.slug, title: d.title })),
  ]
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf8')

  await fs.writeFile(
    path.join(root, 'scripts', 'css-feishu-map.json'),
    JSON.stringify(docsMeta, null, 2),
    'utf8',
  )

  // Sidebar subgroups for long list
  console.log('done. docs:', mod.docs.length)
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
