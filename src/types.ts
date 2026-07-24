export interface DocMeta {
  slug: string
  title: string
  /** Optional local PDF path under public/, e.g. /css-layout/01-xxx.pdf */
  pdfUrl?: string
}

export interface ModuleMeta {
  id: string
  title: string
  sourceUrl: string
  docs: DocMeta[]
}

export interface SiteMeta {
  title: string
  modules: ModuleMeta[]
}

export interface DocEntry {
  moduleId: string
  slug: string
  title: string
  sourceUrl: string
  content: string
  path: string
  pdfUrl?: string
}

export interface SearchHit {
  moduleId: string
  slug: string
  title: string
  moduleTitle: string
  snippet: string
}
