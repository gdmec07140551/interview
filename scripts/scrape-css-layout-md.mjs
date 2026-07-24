/**
 * Download Feishu embedded Slidev PDFs for CSS布局全解 into public/css-layout/
 * and update meta.json with pdfUrl for in-app preview.
 * Source: https://w0hog67yl81.feishu.cn/wiki/Abt9w8NlGi0KJckWOU7cugyVnIb
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'content', 'css-layout')
const publicDir = path.join(root, 'public', 'css-layout')
const WIKI_TOKEN = 'Abt9w8NlGi0KJckWOU7cugyVnIb'
const DOC_TOKEN = 'IaCidTMeWoMcsMxOotgcipXYnNc'
const SOURCE = `https://w0hog67yl81.feishu.cn/wiki/${WIKI_TOKEN}`
const MODULE_ID = 'css-layout'

function blockText(block) {
  return block?.data?.text?.initialAttributedTexts?.text?.['0'] ?? ''
}

function slugFromTitle(title) {
  return title
    .replace(/\.pdf$/i, '')
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50) || 'item'
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

function collectPdfsInOrder(blockMap, rootId) {
  const root = blockMap[rootId]
  const items = []
  let section = ''

  const walk = (blockId) => {
    const b = blockMap[blockId]
    if (!b) return
    const type = b.data?.type
    if (type === 'heading1' || type === 'heading2') {
      section = blockText(b).trim()
    }
    if (type === 'file' && b.data?.file?.mimeType === 'application/pdf') {
      items.push({
        name: b.data.file.name,
        token: b.data.file.token,
        size: b.data.file.size,
        section,
      })
    }
    for (const cid of b.data?.children || []) walk(cid)
  }

  for (const cid of root.data.children || []) walk(cid)
  return items
}

async function downloadPdf(page, token) {
  const bytes = await page.evaluate(async (tok) => {
    const r = await fetch(`/space/api/box/stream/download/all/${tok}/`, {
      credentials: 'include',
    })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const buf = await r.arrayBuffer()
    return Array.from(new Uint8Array(buf))
  }, token)
  return Buffer.from(bytes)
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    locale: 'zh-CN',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
  })
  const page = await context.newPage()

  console.log('open CSS layout wiki…')
  await page.goto(SOURCE, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(2500)

  const blockMap = await fetchAllBlocks(page, DOC_TOKEN)
  const pdfs = collectPdfsInOrder(blockMap, DOC_TOKEN)
  console.log('pdfs:', pdfs.length)
  if (!pdfs.length) throw new Error('no PDF files found')

  await fs.mkdir(outDir, { recursive: true })
  await fs.mkdir(publicDir, { recursive: true })

  // clear old extracted markdown (keep rewriting)
  for (const f of await fs.readdir(outDir)) {
    if (f.endsWith('.md')) await fs.unlink(path.join(outDir, f))
  }
  for (const f of await fs.readdir(publicDir)) {
    if (f.endsWith('.pdf')) await fs.unlink(path.join(publicDir, f))
  }

  const docsMeta = []
  const bySection = new Map()
  const usedSlugs = new Set()

  for (let i = 0; i < pdfs.length; i++) {
    const pdf = pdfs[i]
    const title = pdf.name.replace(/\.pdf$/i, '').trim()
    let slug = `${String(i + 1).padStart(2, '0')}-${slugFromTitle(title)}`
    if (usedSlugs.has(slug)) slug = `${slug}-${i}`
    usedSlugs.add(slug)

    const fileName = `${slug}.pdf`
    const pdfUrl = `/css-layout/${fileName}`
    console.log(`[${i + 1}/${pdfs.length}] ${title}`)

    const buf = await downloadPdf(page, pdf.token)
    if (buf[0] !== 0x25 || buf[1] !== 0x50) {
      throw new Error(`not a PDF for ${title}`)
    }
    await fs.writeFile(path.join(publicDir, fileName), buf)
    console.log(`  saved ${fileName} (${Math.round(buf.length / 1024)} KB)`)

    const md = `# ${title}

> 分类：${pdf.section || '未分类'}  
> 来源：[飞书原文](${SOURCE})  
> 原始文件：\`${pdf.name}\`

本页以 PDF 原件预览展示（Slidev 课件），可在下方阅读器中翻页，或[新窗口打开](${pdfUrl}) / [下载 PDF](${pdfUrl})。
`
    await fs.writeFile(path.join(outDir, `${slug}.md`), md, 'utf8')

    const meta = {
      slug,
      title,
      section: pdf.section || '未分类',
      pdfUrl,
      sourceUrl: SOURCE,
      file: pdf.name,
    }
    docsMeta.push(meta)
    if (!bySection.has(meta.section)) bySection.set(meta.section, [])
    bySection.get(meta.section).push(meta)
    await page.waitForTimeout(120)
  }

  const catSections = [...bySection.entries()]
    .map(([sec, docs]) => {
      const links = docs.map((d) => `- [${d.title}](/m/${MODULE_ID}/${d.slug})`).join('\n')
      return `## ${sec}\n\n${links}`
    })
    .join('\n\n')

  const indexMd = `# CSS 布局全解 · 目录

> 来源：[飞书 Wiki](${SOURCE})

共 **${docsMeta.length}** 份 Slidev PDF 课件，已下载到本地并支持页内预览。

${catSections}
`
  await fs.writeFile(path.join(outDir, 'index.md'), indexMd, 'utf8')

  const metaPath = path.join(root, 'content', 'meta.json')
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'))
  const mod = meta.modules.find((m) => m.id === MODULE_ID)
  if (!mod) throw new Error(`${MODULE_ID} module missing`)
  mod.sourceUrl = SOURCE
  mod.title = `CSS 布局全解（${docsMeta.length}）`
  mod.docs = [
    { slug: 'index', title: '目录总览' },
    ...docsMeta.map((d) => ({
      slug: d.slug,
      title: d.title,
      pdfUrl: d.pdfUrl,
    })),
  ]
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf8')

  await fs.writeFile(
    path.join(root, 'scripts', 'css-layout-feishu-map.json'),
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
