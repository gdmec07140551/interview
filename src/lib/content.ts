import meta from '../../content/meta.json'
import type { DocEntry, ModuleMeta, SiteMeta } from '../types'

const markdownModules = import.meta.glob('../../content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const siteMeta = meta as SiteMeta

function normalizePath(p: string) {
  return p.replace(/\\/g, '/')
}

export function getModule(moduleId: string): ModuleMeta | undefined {
  return siteMeta.modules.find((m) => m.id === moduleId)
}

export function listDocs(): DocEntry[] {
  const entries: DocEntry[] = []

  for (const mod of siteMeta.modules) {
    for (const doc of mod.docs) {
      const key = Object.keys(markdownModules).find((k) => {
        const n = normalizePath(k)
        return n.endsWith(`/content/${mod.id}/${doc.slug}.md`)
      })
      const content = key ? markdownModules[key] : `# ${doc.title}\n\n> 内容待补充。来源：[飞书文档](${mod.sourceUrl})\n`
      entries.push({
        moduleId: mod.id,
        slug: doc.slug,
        title: doc.title,
        sourceUrl: mod.sourceUrl,
        content,
        path: `/m/${mod.id}/${doc.slug}`,
        pdfUrl: doc.pdfUrl,
      })
    }
  }

  return entries
}

export function getDoc(moduleId: string, slug: string): DocEntry | undefined {
  return listDocs().find((d) => d.moduleId === moduleId && d.slug === slug)
}

export function getDefaultDoc(moduleId: string): DocEntry | undefined {
  const mod = getModule(moduleId)
  if (!mod?.docs.length) return undefined
  return getDoc(moduleId, mod.docs[0].slug)
}

function slugifyHeading(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function extractHeadings(markdown: string): { id: string; text: string; level: number }[] {
  const lines = markdown.split('\n')
  const headings: { id: string; text: string; level: number }[] = []
  const used = new Map<string, number>()
  for (const line of lines) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line)
    if (!m) continue
    const text = m[2].replace(/#+$/, '').trim()
    let id = slugifyHeading(text)
    const n = used.get(id) ?? 0
    used.set(id, n + 1)
    if (n > 0) id = `${id}-${n}`
    headings.push({ id, text, level: m[1].length })
  }
  return headings
}
