/**
 * Scrape Feishu ES6 interview docx into per-question pages under content/es6/
 * Source: https://my.feishu.cn/docx/QFVxdRXAxoQN9Hxo22ScylnXnsc
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'content', 'es6')
const DOC_TOKEN = 'QFVxdRXAxoQN9Hxo22ScylnXnsc'
const SOURCE = `https://my.feishu.cn/docx/${DOC_TOKEN}`
const MODULE_ID = 'es6'

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

function escapeInlineHtml(text) {
  // Avoid rehype-raw treating <tag> as real HTML nodes
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function appendBlocks(lines, blocks, blockMap, depth = 0) {
  let orderedIndex = 0
  const indent = '  '.repeat(depth)

  for (const block of blocks) {
    const type = block?.data?.type
    if (!type) continue

    if (type === 'divider') {
      if (depth === 0) lines.push('', '---', '')
      orderedIndex = 0
      continue
    }

    const raw = blockText(block).replace(/\r\n/g, '\n')
    const text = type === 'code' ? raw : escapeInlineHtml(raw)
    const childIds = block.data.children || []
    const childBlocks = childIds.map((id) => blockMap[id]).filter(Boolean)

    if (type === 'heading1' || type === 'heading2' || type === 'heading3') {
      const level = type === 'heading1' ? '#' : type === 'heading2' ? '##' : '###'
      lines.push('', `${level} ${text}`, '')
      orderedIndex = 0
      continue
    }

    if (type === 'code') {
      const lang = (block.data.language || '').toLowerCase() || 'javascript'
      lines.push('', `${indent}\`\`\`${lang}`, text, '```', '')
      orderedIndex = 0
      continue
    }

    if (type === 'bullet') {
      if (text) lines.push(`${indent}- ${text}`)
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth + 1)
      orderedIndex = 0
      continue
    }

    if (type === 'ordered') {
      orderedIndex += 1
      if (text) lines.push(`${indent}${orderedIndex}. ${text}`)
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth + 1)
      continue
    }

    if (type === 'text') {
      orderedIndex = 0
      if (!text) {
        lines.push('')
      } else {
        const prev = lines[lines.length - 1] || ''
        if (/^(\s*)([-*] |\d+\. )/.test(prev)) lines.push('')
        lines.push(`${indent}${text}`, '')
      }
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth)
      continue
    }

    if (text) {
      lines.push(`${indent}${text}`, '')
      orderedIndex = 0
    }
    if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth + 1)
  }
}

function blocksToMarkdown(blocks, blockMap) {
  const lines = []
  appendBlocks(lines, blocks, blockMap, 0)
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

  console.log('open ES6 docx…')
  await page.goto(SOURCE, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(2500)

  console.log('fetch client_vars…')
  const block_map = await fetchAllBlocks(page, DOC_TOKEN)
  const pageBlock = block_map[DOC_TOKEN]
  if (!pageBlock) throw new Error('root page block missing')
  const children = pageBlock.data.children || []
  console.log('blocks', Object.keys(block_map).length, 'children', children.length)

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

    const bodyBlocks = blocks.filter((b) => b.data?.type !== 'heading2')
    const body = blocksToMarkdown(bodyBlocks, block_map)
    const md = `# ${title}

> 来源：[飞书原文](${SOURCE})

${body}
`
    await fs.writeFile(path.join(outDir, `${slug}.md`), md, 'utf8')
    docsMeta.push({ slug, title, sourceUrl: SOURCE })
    console.log(`[${i + 1}/${sections.length}] ${title} (${md.length} chars)`)
  }

  const links = docsMeta.map((d) => `- [${d.title}](/m/${MODULE_ID}/${d.slug})`).join('\n')
  const indexMd = `# ES6 高频面试题 · 目录

> 来源：[飞书文档](${SOURCE})

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
  mod.title = `ES6 高频（${docsMeta.length}）`
  mod.docs = [
    { slug: 'index', title: '目录总览' },
    ...docsMeta.map((d) => ({ slug: d.slug, title: d.title })),
  ]
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf8')

  await fs.writeFile(
    path.join(root, 'scripts', 'es6-feishu-map.json'),
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
