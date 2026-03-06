import { useReducer } from 'react'

// --- Shopping Cart example ---
interface CartItem {
  id: number
  name: string
  price: number
  qty: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; item: Omit<CartItem, 'qty'> }
  | { type: 'INCREMENT'; id: number }
  | { type: 'DECREMENT'; id: number }
  | { type: 'REMOVE'; id: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.item.id)
      if (exists) {
        return { items: state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i) }
      }
      return { items: [...state.items, { ...action.item, qty: 1 }] }
    }
    case 'INCREMENT':
      return { items: state.items.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i) }
    case 'DECREMENT':
      return { items: state.items.map(i => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i) }
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

const PRODUCTS = [
  { id: 1, name: '🍎 Maçã', price: 2.5 },
  { id: 2, name: '🍌 Banana', price: 1.8 },
  { id: 3, name: '🍇 Uva', price: 5.0 },
  { id: 4, name: '🥝 Kiwi', price: 3.2 },
]

export default function UseReducerDemo() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] })

  const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div>
      <h2 className="mb-1 fw-bold" style={{ color: '#fd7e14' }}>useReducer</h2>
      <p className="text-muted mb-4">Alternativa ao useState para lógica de estado complexa com múltiplas ações.</p>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🛒 Produtos</h5>
              <div className="list-group">
                {PRODUCTS.map(p => (
                  <button
                    key={p.id}
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    onClick={() => dispatch({ type: 'ADD', item: p })}
                  >
                    <span>{p.name}</span>
                    <span className="badge bg-primary">R$ {p.price.toFixed(2)} +</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🛍️ Carrinho</h5>
              {cart.items.length === 0 ? (
                <p className="text-muted">Carrinho vazio. Adicione itens!</p>
              ) : (
                <>
                  {cart.items.map(item => (
                    <div key={item.id} className="d-flex align-items-center gap-2 mb-2">
                      <span className="flex-grow-1 small">{item.name}</span>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => dispatch({ type: 'DECREMENT', id: item.id })}>−</button>
                      <span className="fw-bold">{item.qty}</span>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => dispatch({ type: 'INCREMENT', id: item.id })}>+</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>✕</button>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <button className="btn btn-outline-danger btn-sm mt-2 w-100" onClick={() => dispatch({ type: 'CLEAR' })}>
                    Limpar Carrinho
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="alert mt-4" style={{ background: '#fff3e0', borderLeft: '4px solid #fd7e14' }}>
        <code>const [state, dispatch] = useReducer(reducer, initialState)</code>
      </div>
    </div>
  )
}
