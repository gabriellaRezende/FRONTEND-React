import { useState } from 'react'
import UseStateDemo from './pages/UseStateDemo'
import UseMemoDemo from './pages/UseMemoDemo'
import UseContextDemo from './pages/UseContextDemo'
import UseEffectDemo from './pages/UseEffectDemo'
import UseReducerDemo from './pages/UseReducerDemo'
import UseRefDemo from './pages/UseRefDemo'

type Hook = 'useState' | 'useMemo' | 'useContext' | 'useEffect' | 'useReducer' | 'useRef'

const HOOKS: { id: Hook; label: string; color: string; icon: string; desc: string }[] = [
  { id: 'useState',    label: 'useState',    color: '#0d6efd', icon: '⚡', desc: 'Estado local' },
  { id: 'useMemo',     label: 'useMemo',     color: '#198754', icon: '🧠', desc: 'Memoização' },
  { id: 'useContext',  label: 'useContext',  color: '#dc3545', icon: '🌐', desc: 'Contexto global' },
  { id: 'useEffect',  label: 'useEffect',  color: '#6f42c1', icon: '🔄', desc: 'Efeitos colaterais' },
  { id: 'useReducer', label: 'useReducer', color: '#fd7e14', icon: '🏗️', desc: 'Estado complexo' },
  { id: 'useRef',     label: 'useRef',     color: '#20c997', icon: '📌', desc: 'Referências DOM' },
]

function renderPage(hook: Hook) {
  switch (hook) {
    case 'useState':    return <UseStateDemo />
    case 'useMemo':     return <UseMemoDemo />
    case 'useContext':  return <UseContextDemo />
    case 'useEffect':  return <UseEffectDemo />
    case 'useReducer': return <UseReducerDemo />
    case 'useRef':     return <UseRefDemo />
  }
}

export default function App() {
  const [active, setActive] = useState<Hook>('useState')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const current = HOOKS.find(h => h.id === active)!

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb', display: 'flex' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? 240 : 64,
          background: '#1a1d2e',
          transition: 'width 0.25s ease',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1.25rem 1rem',
            borderBottom: '1px solid #2d3150',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {sidebarOpen && (
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap', flex: 1 }}>
              ⚛️ React Hooks
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{
              background: 'none',
              border: 'none',
              color: '#8b8fa8',
              cursor: 'pointer',
              fontSize: '1.1rem',
              lineHeight: 1,
              padding: 4,
              marginLeft: sidebarOpen ? 0 : 'auto',
              marginRight: sidebarOpen ? 0 : 'auto',
            }}
            title={sidebarOpen ? 'Recolher' : 'Expandir'}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav style={{ flex: 1, padding: '0.75rem 0.5rem' }}>
          {HOOKS.map(h => {
            const isActive = h.id === active
            return (
              <button
                key={h.id}
                onClick={() => setActive(h.id)}
                title={h.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: sidebarOpen ? '0.6rem 0.75rem' : '0.75rem',
                  marginBottom: 4,
                  background: isActive ? h.color : 'transparent',
                  border: 'none',
                  borderRadius: 8,
                  color: isActive ? '#fff' : '#8b8fa8',
                  cursor: 'pointer',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                }}
              >
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{h.icon}</span>
                {sidebarOpen && (
                  <div>
                    <div style={{ lineHeight: 1.2 }}>{h.label}</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.75, fontWeight: 400 }}>{h.desc}</div>
                  </div>
                )}
              </button>
            )
          })}
        </nav>

        {sidebarOpen && (
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #2d3150' }}>
            <span style={{ color: '#4a4f6e', fontSize: '0.75rem' }}>React + TypeScript + Vite</span>
          </div>
        )}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div className="d-flex align-items-center gap-2 mb-4">
            <span style={{ fontSize: '1.6rem' }}>{current.icon}</span>
            <div>
              <div style={{ color: '#8b8fa8', fontSize: '0.8rem' }}>React Hooks</div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', color: current.color }}>{current.label}</div>
            </div>
          </div>

          {renderPage(active)}
        </div>
      </main>
    </div>
  )
}
