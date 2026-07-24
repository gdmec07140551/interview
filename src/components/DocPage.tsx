import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { extractHeadings, getDoc, getModule, siteMeta } from '../lib/content'
import { docKey, isRead, pushRecent, toggleRead } from '../lib/storage'
import { MarkdownView } from './MarkdownView'
import { Toc } from './Toc'

export function DocPage({ onReadChange }: { onReadChange: () => void }) {
  const { moduleId = '', slug = 'index' } = useParams()
  const doc = getDoc(moduleId, slug)
  const mod = getModule(moduleId)
  const key = docKey(moduleId, slug)
  const [read, setRead] = useState(() => isRead(key))

  useEffect(() => {
    setRead(isRead(key))
    if (doc) pushRecent(key)
  }, [key, doc])

  if (!mod) {
    return <Navigate to={`/m/${siteMeta.modules[0].id}/index`} replace />
  }
  if (!doc) {
    return <Navigate to={`/m/${moduleId}/${mod.docs[0]?.slug ?? 'index'}`} replace />
  }

  const headings = doc.pdfUrl ? [] : extractHeadings(doc.content)
  const idx = mod.docs.findIndex((d) => d.slug === slug)
  const prev = idx > 0 ? mod.docs[idx - 1] : null
  const next = idx >= 0 && idx < mod.docs.length - 1 ? mod.docs[idx + 1] : null

  return (
    <div className={`doc-layout ${doc.pdfUrl ? 'has-pdf' : ''}`}>
      <div className="doc-main">
        <header className="doc-header">
          <div className="breadcrumb">
            <span>{mod.title}</span>
            <span>/</span>
            <span>{doc.title}</span>
          </div>
          <div className="doc-actions">
            {doc.pdfUrl && (
              <>
                <a href={doc.pdfUrl} target="_blank" rel="noreferrer" className="source-link">
                  新窗口打开
                </a>
                <a href={doc.pdfUrl} download className="source-link">
                  下载 PDF
                </a>
              </>
            )}
            <a href={doc.sourceUrl} target="_blank" rel="noreferrer" className="source-link">
              飞书原文
            </a>
            <label className="read-toggle">
              <input
                type="checkbox"
                checked={read}
                onChange={() => {
                  const v = toggleRead(key)
                  setRead(v)
                  onReadChange()
                }}
              />
              已读
            </label>
          </div>
        </header>

        {doc.pdfUrl ? (
          <div className="pdf-viewer">
            <MarkdownView content={doc.content} />
            <iframe
              className="pdf-frame"
              title={doc.title}
              src={`${doc.pdfUrl}#toolbar=1&navpanes=0`}
            />
          </div>
        ) : (
          <MarkdownView content={doc.content} />
        )}

        <footer className="doc-pager">
          {prev ? (
            <Link to={`/m/${moduleId}/${prev.slug}`}>← {prev.title}</Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/m/${moduleId}/${next.slug}`}>{next.title} →</Link>
          ) : (
            <span />
          )}
        </footer>
      </div>
      {!doc.pdfUrl && <Toc headings={headings} />}
    </div>
  )
}
