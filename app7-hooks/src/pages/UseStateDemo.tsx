import { useState } from 'react'

export default function UseStateDemo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState('')

  const addItem = () => {
    if (input.trim()) {
      setItems(prev => [...prev, input.trim()])
      setInput('')
    }
  }

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h2 className="mb-1 fw-bold" style={{ color: '#0d6efd' }}>useState</h2>
      <p className="text-muted mb-4">Gerencia estado local em componentes funcionais.</p>

      {/* Counter */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">🔢 Contador</h5>
          <div className="d-flex align-items-center gap-3 mt-3">
            <button className="btn btn-outline-danger" onClick={() => setCount(c => c - 1)}>−</button>
            <span className="fs-2 fw-bold px-3">{count}</span>
            <button className="btn btn-outline-success" onClick={() => setCount(c => c + 1)}>+</button>
            <button className="btn btn-outline-secondary ms-2" onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>
      </div>

      {/* Name input */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">✏️ Input Controlado</h5>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Digite seu nome..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {name && <p className="mt-2 mb-0">Olá, <strong>{name}</strong>! 👋</p>}
        </div>
      </div>

      {/* List */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">📋 Lista Dinâmica</h5>
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Adicionar item..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem()}
            />
            <button className="btn btn-primary" onClick={addItem}>Adicionar</button>
          </div>
          <ul className="list-group mt-3">
            {items.map((item, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                {item}
                <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(i)}>✕</button>
              </li>
            ))}
            {items.length === 0 && <p className="text-muted mt-2 mb-0">Nenhum item adicionado.</p>}
          </ul>
        </div>
      </div>

      <div className="alert alert-info mt-4">
        <code>const [state, setState] = useState(initialValue)</code>
      </div>
    </div>
  )
}
