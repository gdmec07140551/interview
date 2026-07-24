/**
 * Scrape Feishu interview-prep docx into content/interview-prep/index.md
 * Source: https://my.feishu.cn/docx/BTIkdAC4MorCtHxEP4DcnJqenWg
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'content', 'interview-prep')
const DOC_TOKEN = 'BTIkdAC4MorCtHxEP4DcnJqenWg'
const SOURCE = `https://my.feishu.cn/docx/${DOC_TOKEN}`
const MODULE_ID = 'interview-prep'

function blockText(block) {
  return block?.data?.text?.initialAttributedTexts?.text?.['0'] ?? ''
}

function escapeInlineHtml(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function appendBlocks(lines, blocks, blockMap, depth = 0) {
  let orderedIndex = 0
  const indent = '  '.repeat(depth)

  for (const block of blocks) {
    const type = block?.data?.type
    if (!type || type === 'page' || type === 'sheet') continue

    if (type === 'divider') {
      if (depth === 0) lines.push('', '---', '')
      orderedIndex = 0
      continue
    }

    const raw = blockText(block).replace(/\r\n/g, '\n')
    const text = type === 'code' ? raw : escapeInlineHtml(raw)
    const childIds = block.data.children || []
    const childBlocks = childIds.map((id) => blockMap[id]).filter(Boolean)

    if (
      type === 'heading1' ||
      type === 'heading2' ||
      type === 'heading3' ||
      type === 'heading4' ||
      type === 'heading5'
    ) {
      const levelMap = {
        heading1: '#',
        heading2: '##',
        heading3: '###',
        heading4: '####',
        heading5: '#####',
      }
      if (text.trim()) lines.push('', `${levelMap[type]} ${text.trim()}`, '')
      orderedIndex = 0
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth)
      continue
    }

    if (type === 'code') {
      const lang = (block.data.language || '').toLowerCase() || 'text'
      lines.push('', `${indent}\`\`\`${lang}`, text, '```', '')
      orderedIndex = 0
      continue
    }

    if (type === 'bullet') {
      if (text.trim()) lines.push(`${indent}- ${text.trim()}`)
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth + 1)
      orderedIndex = 0
      continue
    }

    if (type === 'ordered') {
      orderedIndex += 1
      if (text.trim()) lines.push(`${indent}${orderedIndex}. ${text.trim()}`)
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth + 1)
      continue
    }

    if (type === 'callout' || type === 'quote_container') {
      const buf = []
      appendBlocks(buf, childBlocks, blockMap, 0)
      const quoted = buf
        .join('\n')
        .split('\n')
        .map((l) => (l.trim() ? `> ${l}` : '>'))
        .join('\n')
      if (quoted.trim()) lines.push('', quoted, '')
      orderedIndex = 0
      continue
    }

    if (type === 'text') {
      orderedIndex = 0
      if (!text.trim()) {
        lines.push('')
      } else {
        lines.push(`${indent}${text.trim()}`, '')
      }
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

  console.log('open interview-prep doc…')
  await page.goto(SOURCE, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(2500)

  const blockMap = await fetchAllBlocks(page, DOC_TOKEN)
  console.log('blocks', Object.keys(blockMap).length)
  const body = blocksToMarkdown(DOC_TOKEN, blockMap)
  if (!body) throw new Error('empty body')

  await fs.mkdir(outDir, { recursive: true })
  const title =
    blockMap[DOC_TOKEN]?.data?.text?.initialAttributedTexts?.text?.['0']?.trim() ||
    '面试该如何准备'

  const md = `# ${title}

> 来源：[飞书原文](${SOURCE})

${body}
`
  await fs.writeFile(path.join(outDir, 'index.md'), md, 'utf8')
  console.log('wrote index.md', md.length, 'chars')

  const metaPath = path.join(root, 'content', 'meta.json')
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'))
  const mod = meta.modules.find((m) => m.id === MODULE_ID)
  if (!mod) throw new Error(`${MODULE_ID} module missing`)
  mod.sourceUrl = SOURCE
  mod.title = '面试准备'
  mod.docs = [{ slug: 'index', title }]
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf8')

  console.log('done')
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
