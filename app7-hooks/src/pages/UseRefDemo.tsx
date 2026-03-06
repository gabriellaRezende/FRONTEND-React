import { useRef, useState, useEffect } from 'react'

export default function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null)
  const renderCount = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [name, setName] = useState('')

  // Conta renders sem causar re-render
  renderCount.current += 1

  const focusInput = () => inputRef.current?.focus()
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
    setName('')
  }

  const startStop = () => {
    if (running) {
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = null
    } else {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    }
    setRunning(r => !r)
  }

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    setSeconds(0)
    setRunning(false)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')

  return (
    <div>
      <h2 className="mb-1 fw-bold" style={{ color: '#20c997' }}>useRef</h2>
      <p className="text-muted mb-4">Acessa elementos do DOM diretamente e persiste valores entre renders sem causar re-render.</p>

      {/* DOM ref */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">🎯 Referência ao DOM</h5>
          <p className="text-muted small">Acessa e controla o input diretamente.</p>
          <div className="input-group mt-3">
            <input
              ref={inputRef}
              type="text"
              className="form-control"
              placeholder="Clique em 'Focar' para dar foco..."
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <button className="btn btn-primary" onClick={focusInput}>Focar</button>
            <button className="btn btn-outline-secondary" onClick={clearInput}>Limpar</button>
          </div>
          {name && <p className="mt-2 mb-0 text-success">Digitando: <strong>{name}</strong></p>}
        </div>
      </div>

      {/* Render counter */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">🔄 Contador de Renders</h5>
          <p className="text-muted small">
            <code>useRef</code> armazena o valor <strong>sem</strong> causar re-render.
          </p>
          <div className="d-flex align-items-center gap-3 mt-3">
            <span className="badge bg-info text-dark fs-6 px-3 py-2">
              Renders: {renderCount.current}
            </span>
            <button className="btn btn-outline-primary" onClick={() => setName(n => n + '.')}>
              Forçar Re-render
            </button>
          </div>
        </div>
      </div>

      {/* Stopwatch */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">⏱️ Cronômetro</h5>
          <p className="text-muted small">O timer é guardado em ref para não ser perdido nos re-renders.</p>
          <div className="font-monospace fs-1 fw-bold text-center py-3" style={{ letterSpacing: '0.1em' }}>
            {mins}:{secs}
          </div>
          <div className="d-flex gap-2 justify-content-center">
            <button
              className={`btn ${running ? 'btn-warning' : 'btn-success'}`}
              onClick={startStop}
            >
              {running ? '⏸ Pausar' : '▶ Iniciar'}
            </button>
            <button className="btn btn-outline-danger" onClick={reset}>↺ Reset</button>
          </div>
        </div>
      </div>

      <div className="alert mt-4" style={{ background: '#e6fff9', borderLeft: '4px solid #20c997' }}>
        <code>const ref = useRef(initialValue) {'// ref.current para acessar'}</code>
      </div>
    </div>
  )
}
