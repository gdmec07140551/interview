import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DocPage } from './components/DocPage'
import { RecentBar } from './components/RecentBar'
import { SearchBar } from './components/SearchBar'
import { Sidebar } from './components/Sidebar'
import { siteMeta } from './lib/content'

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const first = siteMeta.modules[0]

  return (
    <div className="app-shell">
      <Sidebar refreshKey={refreshKey} />
      <div className="main-column">
        <header className="topbar">
          <RecentBar refreshKey={refreshKey} />
          <SearchBar />
        </header>
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Navigate to={`/m/${first.id}/index`} replace />} />
            <Route
              path="/m/:moduleId/:slug?"
              element={<DocPage onReadChange={() => setRefreshKey((k) => k + 1)} />}
            />
            <Route path="*" element={<Navigate to={`/m/${first.id}/index`} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
