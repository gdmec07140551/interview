/**
 * Scrape Feishu Vue interview index + chapter docx into content/vue/
 * Source: https://my.feishu.cn/docx/YVtrdaQRboVBWjxuGM4cXpFAnMb
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'content', 'vue')
const DOC_TOKEN = 'YVtrdaQRboVBWjxuGM4cXpFAnMb'
const SOURCE = `https://my.feishu.cn/docx/${DOC_TOKEN}`
const MODULE_ID = 'vue'

function blockText(block) {
  return block?.data?.text?.initialAttributedTexts?.text?.['0'] ?? ''
}

function escapeInlineHtml(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function extractMentionTitle(block) {
  const apool = block?.data?.text?.apool?.numToAttrib
  if (!apool) return null
  for (const v of Object.values(apool)) {
    if (v?.[0] !== 'inline-component') continue
    try {
      const data = JSON.parse(v[1])
      if (data.type === 'mention_doc' && data.data?.title) {
        return {
          title: String(data.data.title).replace(/\s*副本\s*$/, '').trim(),
          token: data.data.token,
          url: data.data.raw_url || `https://my.feishu.cn/docx/${data.data.token}`,
        }
      }
    } catch {
      /* ignore */
    }
  }
  return null
}

function extractMentionsFromMap(blockMap) {
  const items = []
  const seen = new Set()
  for (const b of Object.values(blockMap)) {
    const m = extractMentionTitle(b)
    if (!m || seen.has(m.token)) continue
    seen.add(m.token)
    items.push(m)
  }
  items.sort((a, b) => {
    const na = +(a.title.match(/^(\d+)/)?.[1] || 999)
    const nb = +(b.title.match(/^(\d+)/)?.[1] || 999)
    return na - nb || a.title.localeCompare(b.title)
  })
  return items
}

function slugFromTitle(title) {
  const raw = title.trim()
  const num = raw.match(/^(\d+)/)?.[1]
  const rest = raw
    .replace(/^\d+[\.\s、:：]*/, '')
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  if (num) return `${String(num).padStart(2, '0')}-${rest || 'item'}`
  return rest || 'item'
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

    const mention = extractMentionTitle(block)
    const raw = blockText(block).replace(/\r\n/g, '\n')
    let text = type === 'code' ? raw : escapeInlineHtml(raw)
    if (mention && /^[\s\u00a0]*$/.test(raw)) text = mention.title

    const childIds = block.data.children || []
    const childBlocks = childIds.map((id) => blockMap[id]).filter(Boolean)

    if (type === 'heading1' || type === 'heading2' || type === 'heading3') {
      const level = type === 'heading1' ? '#' : type === 'heading2' ? '##' : '###'
      const headingText = (text.trim() || mention?.title || '').trim()
      if (headingText) lines.push('', `${level} ${headingText}`, '')
      orderedIndex = 0
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth)
      continue
    }

    if (type === 'code') {
      const lang = (block.data.language || '').toLowerCase() || 'javascript'
      lines.push('', `${indent}\`\`\`${lang}`, raw, '```', '')
      orderedIndex = 0
      continue
    }

    if (type === 'bullet') {
      const bulletText = text.trim() || mention?.title
      if (bulletText) lines.push(`${indent}- ${bulletText}`)
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth + 1)
      orderedIndex = 0
      continue
    }

    if (type === 'ordered') {
      orderedIndex += 1
      const itemText = text.trim() || mention?.title
      if (itemText) lines.push(`${indent}${orderedIndex}. ${itemText}`)
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth + 1)
      continue
    }

    if (type === 'text') {
      orderedIndex = 0
      const t = text.trim() || (mention ? mention.title : '')
      if (!t) {
        lines.push('')
      } else {
        const prev = lines[lines.length - 1] || ''
        if (/^(\s*)([-*] |\d+\. )/.test(prev)) lines.push('')
        lines.push(`${indent}${t}`, '')
      }
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth)
      continue
    }

    if (type === 'callout' || type === 'quote_container') {
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth)
      continue
    }

    if (text.trim()) {
      lines.push(`${indent}${text.trim()}`, '')
      orderedIndex = 0
    }
    if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth + 1)
  }
}

function blocksToMarkdown(rootId, blockMap) {
  const root = blockMap[rootId]
  if (!root) return ''
  const lines = []
  const children = (root.data.children || []).map((id) => blockMap[id]).filter(Boolean)
  appendBlocks(lines, children, blockMap, 0)
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

async function fetchAllBlocks(page, docId) {
  let cursor = ''
  const block_map = {}
  for (let i = 0; i < 60; i++) {
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

  console.log('open Vue index…')
  await page.goto(SOURCE, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(2500)

  const indexMap = await fetchAllBlocks(page, DOC_TOKEN)
  const chapters = extractMentionsFromMap(indexMap)
  console.log('chapters:', chapters.length)
  if (!chapters.length) throw new Error('no chapter mentions found')

  await fs.mkdir(outDir, { recursive: true })
  const existing = await fs.readdir(outDir)
  for (const f of existing) {
    if (f.endsWith('.md')) await fs.unlink(path.join(outDir, f))
  }

  const docsMeta = []
  const usedSlugs = new Set()
  const catalog = []

  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i]
    console.log(`[${i + 1}/${chapters.length}] ${ch.title}`)

    let body = ''
    try {
      const bm = await fetchAllBlocks(page, ch.token)
      body = blocksToMarkdown(ch.token, bm)
    } catch (e) {
      console.error('  download fail', e.message)
      body = `_未能下载正文，请打开飞书原文查看。_\n\n原文：${ch.url}`
    }

    let slug = slugFromTitle(ch.title)
    if (usedSlugs.has(slug)) slug = `${slug}-${i}`
    usedSlugs.add(slug)

    const md = `# ${ch.title}

> 来源：[飞书原文](${ch.url})

${body}
`
    await fs.writeFile(path.join(outDir, `${slug}.md`), md, 'utf8')
    docsMeta.push({ slug, title: ch.title, sourceUrl: ch.url })
    catalog.push({ ...ch, slug, chars: md.length })
    console.log(`  wrote ${slug}.md (${md.length} chars)`)
    await page.waitForTimeout(120)
  }

  const links = docsMeta.map((d) => `- [${d.title}](/m/${MODULE_ID}/${d.slug})`).join('\n')
  const indexMd = `# Vue 高频面试题 · 目录

> 来源：[飞书文档](${SOURCE})

共 **${docsMeta.length}** 章，正文已从飞书文档同步。

## 章节列表

${links}
`
  await fs.writeFile(path.join(outDir, 'index.md'), indexMd, 'utf8')

  const metaPath = path.join(root, 'content', 'meta.json')
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'))
  const mod = meta.modules.find((m) => m.id === MODULE_ID)
  if (!mod) throw new Error(`${MODULE_ID} module missing`)
  mod.sourceUrl = SOURCE
  mod.title = 'Vue 高频'
  mod.docs = [
    { slug: 'index', title: '目录总览' },
    ...docsMeta.map((d) => ({ slug: d.slug, title: d.title })),
  ]
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf8')
  await fs.writeFile(path.join(root, 'scripts', 'vue-feishu-map.json'), JSON.stringify(catalog, null, 2), 'utf8')

  console.log('done. docs:', mod.docs.length)
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
