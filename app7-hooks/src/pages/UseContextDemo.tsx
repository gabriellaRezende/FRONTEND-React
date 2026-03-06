import { useState } from 'react'
import { ThemeContext, useTheme, type Theme } from '../context/ThemeContext'

function ThemedCard() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      className="card border-0 shadow"
      style={{
        background: isDark ? '#1e1e2e' : '#ffffff',
        color: isDark ? '#cdd6f4' : '#333',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="card-body p-4">
        <h5 className="card-title">{isDark ? '🌙 Modo Escuro' : '☀️ Modo Claro'}</h5>
        <p>Este componente lê o tema via <strong>useContext</strong>, sem precisar de props!</p>
        <button
          className={`btn ${isDark ? 'btn-warning' : 'btn-dark'}`}
          onClick={toggleTheme}
        >
          Alternar para {isDark ? 'Claro' : 'Escuro'}
        </button>
      </div>
    </div>
  )
}

function NestedChild() {
  const { theme } = useTheme()
  return (
    <div className={`alert ${theme === 'dark' ? 'alert-warning' : 'alert-primary'} mt-3`}>
      <strong>Componente Filho Aninhado</strong> — também tem acesso ao tema: <code>{theme}</code>
    </div>
  )
}

export default function UseContextDemo() {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <div>
      <h2 className="mb-1 fw-bold" style={{ color: '#dc3545' }}>useContext</h2>
      <p className="text-muted mb-4">Compartilha dados entre componentes sem passar props manualmente.</p>

      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">🎨 Exemplo de Tema Global</h5>
            <p className="text-muted small">O Provider envolve os filhos — qualquer descendente pode consumir o contexto.</p>
            <ThemedCard />
            <NestedChild />
          </div>
        </div>
      </ThemeContext.Provider>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5>🏗️ Como funciona?</h5>
          <ol className="mb-0">
            <li>Cria o contexto com <code>createContext()</code></li>
            <li>Envolve componentes com <code>&lt;Context.Provider value=&#123;...&#125;&gt;</code></li>
            <li>Consome em qualquer filho com <code>useContext(Context)</code></li>
          </ol>
        </div>
      </div>

      <div className="alert alert-danger">
        <code>const value = useContext(MyContext)</code>
      </div>
    </div>
  )
}
