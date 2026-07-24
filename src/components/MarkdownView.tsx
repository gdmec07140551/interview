import { useMemo, useCallback, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import type { Components } from 'react-markdown'

function CopyButton({ text }: { text: string }) {
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* ignore */
    }
  }, [text])

  return (
    <button type="button" className="copy-btn" onClick={onCopy} aria-label="复制代码">
      复制
    </button>
  )
}

function getText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    const el = node as { props?: { children?: ReactNode } }
    return getText(el.props?.children)
  }
  return ''
}

export function MarkdownView({ content }: { content: string }) {
  const components = useMemo<Components>(
    () => ({
      a({ href, children }) {
        if (href?.startsWith('/')) {
          return <Link to={href}>{children}</Link>
        }
        return (
          <a href={href} target="_blank" rel="noreferrer">
            {children}
          </a>
        )
      },
      pre({ children, ...props }) {
        const codeText = getText(children)
        return (
          <div className="code-block">
            <CopyButton text={codeText} />
            <pre {...props}>{children}</pre>
          </div>
        )
      },
      details({ children, ...props }) {
        return (
          <details className="answer-fold" {...props}>
            {children}
          </details>
        )
      },
    }),
    [],
  )

  return (
    <article className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
