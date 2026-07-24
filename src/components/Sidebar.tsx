import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { siteMeta } from '../lib/content'
import type { DocMeta } from '../types'
import { docKey, isRead, setExpanded } from '../lib/storage'

function parseRoute(pathname: string) {
  const m = pathname.match(/^\/m\/([^/]+)(?:\/([^/]+))?/)
  return {
    moduleId: m?.[1],
    slug: m?.[2] ?? 'index',
  }
}

function IconFolder({ open = false }: { open?: boolean }) {
  return (
    <svg className="nav-icon-svg" viewBox="0 0 16 16" width="14" height="14" aria-hidden>
      {open ? (
        <>
          <path
            fill="currentColor"
            opacity="0.35"
            d="M1.75 3.5A1.25 1.25 0 0 1 3 2.25h2.9c.25 0 .5.1.68.27L7.8 3.75H13a1.25 1.25 0 0 1 1.25 1.25V5.5H2.2z"
          />
          <path
            fill="currentColor"
            d="M1.4 6.25h13.2c.5 0 .9.46.8.95l-1.15 5.1A1.5 1.5 0 0 1 12.8 13.5H3.2a1.5 1.5 0 0 1-1.45-1.2L.6 7.2a.85.85 0 0 1 .8-.95Z"
          />
        </>
      ) : (
        <path
          fill="currentColor"
          d="M1.75 3.5A1.25 1.25 0 0 1 3 2.25h2.9c.25 0 .5.1.68.27L7.8 3.75H13A1.25 1.25 0 0 1 14.25 5v7A1.25 1.25 0 0 1 13 13.25H3A1.25 1.25 0 0 1 1.75 12V3.5Zm1.5.75V12H13V5H7.45L6.23 3.75H3.25Z"
        />
      )}
    </svg>
  )
}

function IconToc() {
  return (
    <svg className="nav-icon-svg" viewBox="0 0 16 16" width="14" height="14" aria-hidden>
      <path
        fill="currentColor"
        d="M3 3.75h10a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5Zm0 3.5h10a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5Zm0 3.5h7a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5Z"
      />
    </svg>
  )
}

export function Sidebar({ refreshKey }: { refreshKey: number }) {
  const { pathname } = useLocation()
  const { moduleId } = parseRoute(pathname)

  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    () => new Set(moduleId ? [moduleId] : siteMeta.modules[0] ? [siteMeta.modules[0].id] : []),
  )

  useEffect(() => {
    if (!moduleId) return
    setExpandedModules(new Set([moduleId]))
    setExpanded(new Set([moduleId]))
  }, [moduleId])

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const next = prev.has(id) ? new Set<string>() : new Set([id])
      setExpanded(next)
      return next
    })
  }

  const renderDocLink = (modId: string, doc: DocMeta) => {
    const key = docKey(modId, doc.slug)
    const read = isRead(key)
    const isIndex = doc.slug === 'index'
    void refreshKey
    return (
      <li key={doc.slug}>
        <NavLink
          to={`/m/${modId}/${doc.slug}`}
          className={({ isActive }) =>
            [isActive ? 'active' : '', isIndex ? 'is-index' : ''].filter(Boolean).join(' ')
          }
        >
          {isIndex ? (
            <span className="nav-icon nav-icon-toc" aria-hidden>
              <IconToc />
            </span>
          ) : (
            <span className={`dot ${read ? 'read' : ''}`} />
          )}
          <span className="nav-doc-title">{doc.title}</span>
        </NavLink>
      </li>
    )
  }

  const modulesView = useMemo(() => siteMeta.modules, [])

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">FE</span>
        <div>
          <strong>{siteMeta.title}</strong>
          <p>面试速览 · 本地复习</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {modulesView.map((mod) => {
          const open = expandedModules.has(mod.id)
          return (
            <div key={mod.id} className={`nav-module ${open ? 'is-open' : ''}`}>
              <button
                type="button"
                className={`nav-module-btn ${moduleId === mod.id ? 'current' : ''}`}
                aria-expanded={open}
                onClick={() => toggleModule(mod.id)}
              >
                <span className={`chev ${open ? 'open' : ''}`} aria-hidden>
                  ▸
                </span>
                <span className="nav-icon nav-icon-folder" aria-hidden>
                  <IconFolder open={open} />
                </span>
                <span className="nav-module-title">{mod.title}</span>
                <span className="nav-count">{mod.docs.length}</span>
              </button>

              {open && (
                <div className="nav-module-body">
                  <ul className="nav-doc-list">
                    {mod.docs.map((d) => renderDocLink(mod.id, d))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
