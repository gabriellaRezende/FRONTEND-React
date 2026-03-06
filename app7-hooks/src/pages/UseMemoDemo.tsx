import { useState, useMemo } from 'react'

function isPrime(n: number): boolean {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}

function getPrimesUpTo(limit: number): number[] {
  const primes: number[] = []
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primes.push(i)
  }
  return primes
}

export default function UseMemoDemo() {
  const [limit, setLimit] = useState(100)
  const [filter, setFilter] = useState('')

  const primes = useMemo(() => {
    console.log('Recalculando primos até', limit)
    return getPrimesUpTo(limit)
  }, [limit])

  const filtered = useMemo(() => {
    return primes.filter(p => String(p).includes(filter))
  }, [primes, filter])

  return (
    <div>
      <h2 className="mb-1 fw-bold" style={{ color: '#198754' }}>useMemo</h2>
      <p className="text-muted mb-4">Memoriza o resultado de cálculos pesados, recalculando apenas quando dependências mudam.</p>

      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">🔢 Números Primos</h5>
          <p className="text-muted small">O cálculo é memorizado — só roda novamente quando o limite muda.</p>

          <div className="mb-3">
            <label className="form-label fw-semibold">Limite: <span className="text-primary">{limit}</span></label>
            <input
              type="range"
              className="form-range"
              min={10}
              max={500}
              value={limit}
              onChange={e => setLimit(Number(e.target.value))}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar primos..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>

          <div className="d-flex gap-3 mb-3">
            <div className="badge bg-primary fs-6 px-3 py-2">Total: {primes.length}</div>
            <div className="badge bg-success fs-6 px-3 py-2">Filtrados: {filtered.length}</div>
          </div>

          <div style={{ maxHeight: '200px', overflowY: 'auto' }} className="border rounded p-2 bg-light">
            <div className="d-flex flex-wrap gap-1">
              {filtered.map(p => (
                <span key={p} className="badge bg-secondary">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5>⚡ Quando usar?</h5>
          <ul className="mb-0">
            <li>Cálculos computacionalmente caros</li>
            <li>Transformações de listas grandes</li>
            <li>Evitar re-renders desnecessários em componentes filhos</li>
          </ul>
        </div>
      </div>

      <div className="alert alert-success mt-4">
        <code>const value = useMemo(() =&gt; compute(a, b), [a, b])</code>
      </div>
    </div>
  )
}
