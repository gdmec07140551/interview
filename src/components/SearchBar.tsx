import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'
import { listDocs, siteMeta } from '../lib/content'
import type { SearchHit } from '../types'

function buildHits(query: string): SearchHit[] {
  const docs = listDocs()
  const fuse = new Fuse(
    docs.map((d) => ({
      ...d,
      moduleTitle: siteMeta.modules.find((m) => m.id === d.moduleId)?.title ?? d.moduleId,
      plain: d.content.replace(/[`#>*_\-\[\]()]/g, ' ').slice(0, 4000),
    })),
    {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'moduleTitle', weight: 0.2 },
        { name: 'plain', weight: 0.4 },
      ],
      threshold: 0.35,
      includeMatches: true,
      ignoreLocation: true,
    },
  )

  return fuse.search(query, { limit: 20 }).map((r) => {
    const item = r.item
    const match = r.matches?.find((m) => m.key === 'plain')
    let snippet = item.plain.slice(0, 120)
    if (match?.indices?.[0]) {
      const [start] = match.indices[0]
      const from = Math.max(0, start - 40)
      snippet = item.plain.slice(from, from + 120)
    }
    return {
      moduleId: item.moduleId,
      slug: item.slug,
      title: item.title,
      moduleTitle: item.moduleTitle,
      snippet: snippet.replace(/\s+/g, ' ').trim(),
    }
  })
}

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const hits = useMemo(() => (query.trim() ? buildHits(query.trim()) : []), [query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
        setTimeout(() => inputRef.current?.focus(), 0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setActive(0)
  }, [query])

  const go = (hit: SearchHit) => {
    navigate(`/m/${hit.moduleId}/${hit.slug}`)
    setOpen(false)
    setQuery('')
  }

  return (
    <div className="search-wrap">
      <button
        type="button"
        className="search-trigger"
        onClick={() => {
          setOpen(true)
          setTimeout(() => inputRef.current?.focus(), 0)
        }}
      >
        <span>搜索知识点、题目…</span>
        <kbd>Ctrl K</kbd>
      </button>

      {open && (
        <div className="search-overlay" onClick={() => setOpen(false)}>
          <div className="search-panel" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索模块、题目、关键词…"
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setActive((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)))
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setActive((i) => Math.max(i - 1, 0))
                } else if (e.key === 'Enter' && hits[active]) {
                  go(hits[active])
                }
              }}
            />
            <ul className="search-results">
              {query.trim() && hits.length === 0 && <li className="search-empty">无匹配结果</li>}
              {hits.map((hit, i) => (
                <li key={`${hit.moduleId}/${hit.slug}`}>
                  <button
                    type="button"
                    className={i === active ? 'active' : ''}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(hit)}
                  >
                    <div className="search-hit-title">
                      <strong>{hit.title}</strong>
                      <span>{hit.moduleTitle}</span>
                    </div>
                    <p>{hit.snippet}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
