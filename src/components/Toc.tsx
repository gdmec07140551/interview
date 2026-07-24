import type { extractHeadings } from '../lib/content'

type Heading = ReturnType<typeof extractHeadings>[number]

export function Toc({ headings }: { headings: Heading[] }) {
  if (!headings.length) return null
  return (
    <aside className="toc">
      <h3>本页大纲</h3>
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={`lvl-${h.level}`}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
