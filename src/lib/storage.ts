const READ_KEY = 'interview-read'
const RECENT_KEY = 'interview-recent'
const EXPANDED_KEY = 'interview-expanded'

function readSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

function writeSet(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]))
}

export function isRead(docKey: string): boolean {
  return readSet(READ_KEY).has(docKey)
}

export function toggleRead(docKey: string): boolean {
  const set = readSet(READ_KEY)
  if (set.has(docKey)) set.delete(docKey)
  else set.add(docKey)
  writeSet(READ_KEY, set)
  return set.has(docKey)
}

export function getRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') as string[]
  } catch {
    return []
  }
}

export function pushRecent(docKey: string) {
  const list = getRecent().filter((k) => k !== docKey)
  list.unshift(docKey)
  localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 12)))
}

export function getExpanded(): Set<string> {
  return readSet(EXPANDED_KEY)
}

export function setExpanded(ids: Set<string>) {
  writeSet(EXPANDED_KEY, ids)
}

export function docKey(moduleId: string, slug: string) {
  return `${moduleId}/${slug}`
}
