/**
 * Scrape Feishu「浏览器原理」wiki folder into content/browser/
 * Parent: https://w0hog67yl81.feishu.cn/wiki/DraiwExLji1DOfkZiGucEljKnEb
 * Structure: 3 section docs (tables) → each row mentions a detail wiki page
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'content', 'browser')
const PARENT = 'DraiwExLji1DOfkZiGucEljKnEb'
const SPACE = '7314262008335974428'
const SOURCE = `https://w0hog67yl81.feishu.cn/wiki/${PARENT}`
const MODULE_ID = 'browser'

const SECTIONS = [
  {
    id: 'render',
    title: '一、渲染流程与性能优化',
    wiki: 'S35VwTooHiOI7JkeHiectTj4n5c',
    obj: 'KpXjd5qwVoR9XFxXIFBcJapjneg',
  },
  {
    id: 'dom',
    title: '二、DOM与事件模型',
    wiki: 'IUHOwucHSifqLFkI2jkc4ozonVd',
    obj: 'Nrm1dEMUaoRwwMxhFjrccWLWnUd',
  },
  {
    id: 'async',
    title: '三、异步、网络与安全',
    wiki: 'PoDbwIuTDiaSi2kHb7UcrBBFnIh',
    obj: 'UmFodRLIwoZC0tx7W2ZcLIfTnTd',
  },
]

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
          title: data.data.title,
          token: data.data.token,
          url: data.data.raw_url || `https://w0hog67yl81.feishu.cn/wiki/${data.data.token}`,
        }
      }
    } catch {
      /* ignore */
    }
  }
  return null
}

function slugFromTitle(title, sectionPrefix) {
  const raw = title.trim()
  const num = raw.match(/^(\d+)/)?.[1]
  const rest = raw
    .replace(/^\d+[\.\s、]*/, '')
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 36)
  const body = num ? `${String(num).padStart(2, '0')}-${rest || 'item'}` : rest || 'item'
  return sectionPrefix ? `${sectionPrefix}-${body}` : body
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
    if (mention && (!text || text.trim() === '' || text.trim() === '&lt;' /* unlikely */ || text === ' ' || text === '&nbsp;')) {
      text = mention.title
    } else if (mention && text.trim() === '') {
      text = mention.title
    } else if (mention && /^[\s\u00a0]*$/.test(raw)) {
      text = mention.title
    }

    const childIds = block.data.children || []
    const childBlocks = childIds.map((id) => blockMap[id]).filter(Boolean)

    if (type === 'heading1' || type === 'heading2' || type === 'heading3') {
      const level = type === 'heading1' ? '#' : type === 'heading2' ? '##' : '###'
      const headingText = text.trim() || mention?.title || ''
      if (headingText) lines.push('', `${level} ${headingText}`, '')
      orderedIndex = 0
      if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth)
      continue
    }

    if (type === 'code') {
      const lang = (block.data.language || '').toLowerCase() || 'js'
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

    if (type === 'table') {
      const md = tableToMarkdown(block, blockMap)
      if (md) lines.push('', md, '')
      continue
    }

    if (text.trim()) {
      lines.push(`${indent}${text.trim()}`, '')
      orderedIndex = 0
    }
    if (childBlocks.length) appendBlocks(lines, childBlocks, blockMap, depth + 1)
  }
}

function cellPlainText(blockId, blockMap) {
  const cell = blockMap[blockId]
  if (!cell) return ''
  const parts = []
  const walk = (cid) => {
    const b = blockMap[cid]
    if (!b) return
    const mention = extractMentionTitle(b)
    const t = blockText(b)
    if (mention && /^[\s\u00a0]*$/.test(t)) parts.push(mention.title)
    else if (t.trim()) parts.push(escapeInlineHtml(t.trim()))
    else if (mention) parts.push(mention.title)
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

async function resolveObjToken(page, wikiToken) {
  const j = await page.evaluate(
    async ({ space, token }) => {
      const r = await fetch(
        `/space/api/wiki/v2/tree/get_node/?wiki_token=${token}&space_id=${space}`,
        { credentials: 'include' },
      )
      return await r.json()
    },
    { space: SPACE, token: wikiToken },
  )
  if (j.code !== 0) throw new Error(`get_node fail ${wikiToken}: ${j.msg}`)
  return j.data
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    locale: 'zh-CN',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
  })
  const page = await context.newPage()

  console.log('open browser wiki…')
  await page.goto(SOURCE, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(2500)

  await fs.mkdir(outDir, { recursive: true })
  const existing = await fs.readdir(outDir)
  for (const f of existing) {
    if (f.endsWith('.md')) await fs.unlink(path.join(outDir, f))
  }

  const docsMeta = []
  const catalog = []
  const usedSlugs = new Set()
  const sectionPrefixes = { render: 'a', dom: 'b', async: 'c' }

  for (const section of SECTIONS) {
    console.log(`\n==> ${section.title}`)
    const sectionMap = await fetchAllBlocks(page, section.obj)
    const mentions = extractMentionsFromMap(sectionMap)
    console.log('  topics:', mentions.length)

    // also write section overview from the table itself
    const sectionSlug = `${sectionPrefixes[section.id]}-overview`
    const sectionBody = blocksToMarkdown(section.obj, sectionMap)
    const sectionMd = `# ${section.title}

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/${section.wiki})

${sectionBody}
`
    await fs.writeFile(path.join(outDir, `${sectionSlug}.md`), sectionMd, 'utf8')
    docsMeta.push({ slug: sectionSlug, title: section.title, section: section.id })
    usedSlugs.add(sectionSlug)

    for (let i = 0; i < mentions.length; i++) {
      const m = mentions[i]
      console.log(`  [${i + 1}/${mentions.length}] ${m.title}`)
      let node
      try {
        node = await resolveObjToken(page, m.token)
      } catch (e) {
        console.error('    resolve fail', e.message)
        continue
      }
      const objToken = node.obj_token
      let body = ''
      try {
        const bm = await fetchAllBlocks(page, objToken)
        body = blocksToMarkdown(objToken, bm)
      } catch (e) {
        console.error('    download fail', e.message)
        body = `_未能下载正文，请打开飞书原文查看。_\n\n原文：${m.url}`
      }

      let slug = slugFromTitle(m.title, sectionPrefixes[section.id])
      if (usedSlugs.has(slug)) slug = `${slug}-${i}`
      usedSlugs.add(slug)

      const md = `# ${m.title}

> 来源：[飞书原文](${m.url})  
> 章节：${section.title}

${body}
`
      await fs.writeFile(path.join(outDir, `${slug}.md`), md, 'utf8')
      docsMeta.push({ slug, title: m.title, section: section.id, sourceUrl: m.url })
      catalog.push({ ...m, section: section.title, sectionId: section.id, slug, chars: md.length })
      await page.waitForTimeout(100)
    }
  }

  const links = docsMeta.map((d) => `- [${d.title}](/m/${MODULE_ID}/${d.slug})`).join('\n')
  const indexMd = `# 浏览器原理 · 目录

> 来源：[飞书 Wiki](${SOURCE})

共 **${docsMeta.length}** 篇（含 3 个章节总览），正文已从飞书同步。

## 文章列表

${links}
`
  await fs.writeFile(path.join(outDir, 'index.md'), indexMd, 'utf8')

  const metaPath = path.join(root, 'content', 'meta.json')
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'))
  const mod = meta.modules.find((m) => m.id === MODULE_ID)
  if (!mod) throw new Error(`${MODULE_ID} module missing`)
  mod.sourceUrl = SOURCE
  mod.title = '浏览器原理'
  mod.docs = [
    { slug: 'index', title: '目录总览' },
    ...docsMeta.map((d) => ({ slug: d.slug, title: d.title })),
  ]
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf8')
  await fs.writeFile(path.join(root, 'scripts', 'browser-feishu-map.json'), JSON.stringify(catalog, null, 2), 'utf8')

  console.log('\ndone. docs:', mod.docs.length)
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
