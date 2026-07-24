import { Link } from 'react-router-dom'
import { getDoc } from '../lib/content'
import { getRecent } from '../lib/storage'

export function RecentBar({ refreshKey }: { refreshKey: number }) {
  void refreshKey
  const recent = getRecent()
    .map((key) => {
      const [moduleId, slug] = key.split('/')
      const doc = getDoc(moduleId, slug)
      return doc ? { key, doc } : null
    })
    .filter(Boolean)
    .slice(0, 6)

  if (!recent.length) return null

  return (
    <div className="recent-bar">
      <span>最近：</span>
      {recent.map((item) =>
        item ? (
          <Link key={item.key} to={item.doc.path}>
            {item.doc.title}
          </Link>
        ) : null,
      )}
    </div>
  )
}
