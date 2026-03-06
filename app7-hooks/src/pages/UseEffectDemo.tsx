import { useState, useEffect } from 'react'

interface Post {
  id: number
  title: string
  body: string
}

export default function UseEffectDemo() {
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState('')
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [postId, setPostId] = useState(1)
  const [time, setTime] = useState(new Date())

  // Atualiza title da aba
  useEffect(() => {
    document.title = `Contador: ${count}`
    return () => {
      document.title = 'app7'
    }
  }, [count])

  // Busca post da API
  useEffect(() => {
    setLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(r => r.json())
      .then((data: Post) => {
        setPost(data)
        setTitle(data.title)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [postId])

  // Timer — cleanup com return
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h2 className="mb-1 fw-bold" style={{ color: '#6f42c1' }}>useEffect</h2>
      <p className="text-muted mb-4">Executa efeitos colaterais: chamadas de API, subscriptions, timers, etc.</p>

      {/* Side effect no título */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">📌 Efeito no título da página</h5>
          <p className="text-muted small">Olhe a aba do navegador ao incrementar!</p>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-primary" onClick={() => setCount(c => c - 1)}>−</button>
            <span className="fs-3 fw-bold">{count}</span>
            <button className="btn btn-outline-primary" onClick={() => setCount(c => c + 1)}>+</button>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">⏱️ Timer com Cleanup</h5>
          <p className="text-muted small">O intervalo é limpo quando o componente desmonta.</p>
          <div className="fs-4 fw-bold text-primary font-monospace">
            {time.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Fetch API */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">🌐 Fetch de API</h5>
          <div className="d-flex align-items-center gap-2 mb-3">
            <label className="form-label mb-0 fw-semibold">Post ID:</label>
            <input
              type="number"
              className="form-control w-auto"
              min={1}
              max={100}
              value={postId}
              onChange={e => setPostId(Number(e.target.value))}
            />
          </div>
          {loading ? (
            <div className="spinner-border text-primary" role="status" />
          ) : post ? (
            <div>
              <h6 className="text-capitalize">{title}</h6>
              <p className="text-muted small mb-0">{post.body}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="alert alert-purple border" style={{ background: '#f8f0ff', borderColor: '#6f42c1' }}>
        <code>{'useEffect(() => { /* efeito */ return () => { /* cleanup */ } }, [deps])'}</code>
      </div>
    </div>
  )
}
