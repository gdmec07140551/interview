/**
 * Scrape Feishu React interview wiki into content/react/
 * Source: https://w0hog67yl81.feishu.cn/wiki/PLICwMsqwiGkEuk01lWcdTXVn8e
 *
 * Structure: index wiki → 4 chapter wikis → question docx pages
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'content', 'react')
const SPACE = '7314262008335974428'
const WIKI_TOKEN = 'PLICwMsqwiGkEuk01lWcdTXVn8e'
const SOURCE = `https://w0hog67yl81.feishu.cn/wiki/${WIKI_TOKEN}`
const MODULE_ID = 'react'

function blockText(block) {
  const raw = block?.data?.text?.initialAttributedTexts?.text?.['0'] ?? ''
  return raw.replace(/\\([_*`\[\]])/g, '$1')
}

function escapeInlineHtml(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function slugFromTitle(title, num) {
  const rest = title
    .trim()
    .replace(/^\d+[\.\s、:：]*/, '')
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  return `${String(num).padStart(2, '0')}-${rest || 'item'}`
}

function cellPlainText(blockId, blockMap) {
  const cell = blockMap[blockId]
  if (!cell) return ''
  const parts = []
  const walk = (cid) => {
    const b = blockMap[cid]
    if (!b) return
    const t = blockText(b)
    if (t.trim()) parts.push(escapeInlineHtml(t.trim()))
    for (const c of b.data?.children || []) walk(c)
  }
  for (const c of cell.data?.children || []) walk(c)
  return parts.join('<br>').trim()
}

function tableToMarkdown(tableBlock, blockMap) {
  const d = tableBlock.data
  const rows = d.rows_id || []
  const cols = d.columns_id || []
  if (!rows.length || !cols.length) return ''
  const grid = rows.map((rid) =>
    cols.map((cid) => {
      const entry = d.cell_set?.[rid + cid]
      return (cellPlainText(entry?.block_id, blockMap) || ' ').replace(/\|/g, '\\|').replace(/\n/g, '<br>')
    }),
  )
  const header = grid[0] || cols.map(() => '')
  const sep = header.map(() => '---')
  const body = grid.slice(1)
  return [
    `| ${header.join(' | ')} |`,
    `| ${sep.join(' | ')} |`,
    ...body.map((r) => `| ${r.join(' | ')} |`),
  ].join('\n')
}

function appendBlocks(lines, blocks, blockMap, depth = 0) {
  let orderedIndex = 0
  const indent = '  '.repeat(depth)

  for (const block of blocks) {
    const type = block?.data?.type
    if (!type) continue
    if (type === 'folder_manager' || type === 'page') continue

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
      type === 'heading4'
    ) {
      const level =
        type === 'heading1' ? '#' : type === 'heading2' ? '##' : type === 'heading3' ? '###' : '####'
      if (text.trim()) lines.push('', `${level} ${text.trim()}`, '')
      orderedIndex = 0
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth)
      continue
    }

    if (type === 'code') {
      const lang = (block.data.language || '').toLowerCase() || 'javascript'
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

    if (type === 'table') {
      const md = tableToMarkdown(block, blockMap)
      if (md) lines.push('', md, '')
      orderedIndex = 0
      continue
    }

    if (type === 'callout' || type === 'quote_container') {
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth)
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

async function getWikiChildren(page, wikiToken) {
  const j = await page.evaluate(
    async ({ space, parent }) => {
      const r = await fetch(
        `/space/api/wiki/v2/tree/get_node_child/?space_id=${space}&wiki_token=${parent}`,
        { credentials: 'include' },
      )
      return await r.json()
    },
    { space: SPACE, parent: wikiToken },
  )
  if (j.code !== 0) throw new Error(`get_node_child fail ${wikiToken}: ${j.msg}`)
  const val = j.data?.[wikiToken]
  return Array.isArray(val) ? val : []
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    locale: 'zh-CN',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
  })
  const page = await context.newPage()

  console.log('open React wiki…')
  await page.goto(SOURCE, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(2500)

  const chapters = await getWikiChildren(page, WIKI_TOKEN)
  console.log('chapters:', chapters.length)
  if (!chapters.length) throw new Error('no chapter children found')

  await fs.mkdir(outDir, { recursive: true })
  const existing = await fs.readdir(outDir)
  for (const f of existing) {
    if (f.endsWith('.md')) await fs.unlink(path.join(outDir, f))
  }

  const docsMeta = []
  const byChapter = []
  const usedSlugs = new Set()
  let globalNum = 0

  for (let ci = 0; ci < chapters.length; ci++) {
    const ch = chapters[ci]
    const chTitle = (ch.title || '').trim()
    console.log(`\n==> [${ci + 1}/${chapters.length}] ${chTitle}`)
    const questions = await getWikiChildren(page, ch.wiki_token)
    console.log('  questions:', questions.length)
    const chapterDocs = []

    for (let qi = 0; qi < questions.length; qi++) {
      const q = questions[qi]
      const title = (q.title || '').trim()
      globalNum += 1
      console.log(`  [${qi + 1}/${questions.length}] ${title}`)

      let body = ''
      const qUrl = `https://w0hog67yl81.feishu.cn/wiki/${q.wiki_token}`
      try {
        const bm = await fetchAllBlocks(page, q.obj_token)
        body = blocksToMarkdown(q.obj_token, bm)
      } catch (e) {
        console.error('    download fail', e.message)
        body = `_未能下载正文，请打开飞书原文查看。_\n\n原文：${qUrl}`
      }

      let slug = slugFromTitle(title, globalNum)
      if (usedSlugs.has(slug)) slug = `${slug}-${globalNum}`
      usedSlugs.add(slug)

      const md = `# ${title}

> 章节：${chTitle}  
> 来源：[飞书原文](${qUrl})

${body}
`
      await fs.writeFile(path.join(outDir, `${slug}.md`), md, 'utf8')
      const meta = { slug, title, chapter: chTitle, sourceUrl: qUrl }
      docsMeta.push(meta)
      chapterDocs.push(meta)
      await page.waitForTimeout(80)
    }

    byChapter.push({ title: chTitle, docs: chapterDocs })
  }

  const catSections = byChapter
    .map((ch) => {
      const links = ch.docs.map((d) => `- [${d.title}](/m/${MODULE_ID}/${d.slug})`).join('\n')
      return `## ${ch.title}\n\n${links}`
    })
    .join('\n\n')

  const indexMd = `# React 高频面试题 · 目录

> 来源：[飞书 Wiki](${SOURCE})

共 **${docsMeta.length}** 题，正文已从飞书 Wiki 同步。

${catSections}
`
  await fs.writeFile(path.join(outDir, 'index.md'), indexMd, 'utf8')

  const metaPath = path.join(root, 'content', 'meta.json')
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'))
  const mod = meta.modules.find((m) => m.id === MODULE_ID)
  if (!mod) throw new Error(`${MODULE_ID} module missing`)
  mod.sourceUrl = SOURCE
  mod.title = `React 高频（${docsMeta.length}）`
  mod.docs = [
    { slug: 'index', title: '目录总览' },
    ...docsMeta.map((d) => ({ slug: d.slug, title: d.title })),
  ]
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf8')

  await fs.writeFile(
    path.join(root, 'scripts', 'react-feishu-map.json'),
    JSON.stringify({ chapters: byChapter, docs: docsMeta }, null, 2),
    'utf8',
  )

  console.log('\ndone. docs:', mod.docs.length)
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
