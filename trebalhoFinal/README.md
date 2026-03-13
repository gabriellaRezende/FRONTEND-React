# Task Manager Full Stack Demo

Aplicacao academica para demonstrar uma arquitetura simples com `React` no frontend e `Node.js + Express` no backend.
Todo o projeto ficou agrupado dentro da pasta `trebalhoFinal`.

## Estrutura

```text
/frontend  -> interface React com os hooks pedidos
/backend   -> API Express com armazenamento em memoria
```

## Como correr o backend

```bash
cd backend
npm install
npm run dev
```

A API fica disponivel em `http://localhost:4000`.

## Como correr o frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend abre por defeito em `http://localhost:5173` e comunica com a API em `http://localhost:4000`.

Se quiseres mudar a URL da API, cria um ficheiro `.env` em `frontend`:

```bash
VITE_API_URL=http://localhost:4000
```

## Funcionalidades incluidas

- Adicionar tarefa
- Remover tarefa
- Marcar tarefa como concluida ou pendente
- Filtrar por todas, concluidas e pendentes
- Pesquisar por texto
- Mostrar estatisticas derivadas
- Limpar tarefas concluidas
- Alternar entre tema claro e escuro
- Foco automatico no input
- Atualizar o `document.title` com o numero de tarefas pendentes

## Hooks usados

### `useState`

Usado para estados simples da interface:

- texto do input no `TaskForm`
- filtro e pesquisa no `App`
- estados de `loading`, submissao e feedback
- tema atual no `ThemeProvider`

Motivo: e a forma mais direta de controlar estados pequenos e independentes.

### `useEffect`

Usado para efeitos colaterais:

- carregar tarefas da API quando a app monta em [frontend/src/App.tsx](/Users/gabriella.rzende/Library/Mobile Documents/com~apple~CloudDocs/FRONTEND-React/trebalhoFinal/frontend/src/App.tsx)
- atualizar `document.title` conforme o numero de pendentes em [frontend/src/App.tsx](/Users/gabriella.rzende/Library/Mobile Documents/com~apple~CloudDocs/FRONTEND-React/trebalhoFinal/frontend/src/App.tsx)
- sincronizar tema com `localStorage` e com o atributo global `data-theme` em [frontend/src/context/ThemeContext.tsx](/Users/gabriella.rzende/Library/Mobile Documents/com~apple~CloudDocs/FRONTEND-React/trebalhoFinal/frontend/src/context/ThemeContext.tsx)
- focar o input ao abrir o formulario em [frontend/src/components/TaskForm.tsx](/Users/gabriella.rzende/Library/Mobile Documents/com~apple~CloudDocs/FRONTEND-React/trebalhoFinal/frontend/src/components/TaskForm.tsx)

Motivo: serve para lidar com operacoes externas ao ciclo normal de render, como `fetch`, DOM e persistencia local.

### `useMemo`

Usado para memorizar calculos derivados:

- estatisticas de tarefas em [frontend/src/App.tsx](/Users/gabriella.rzende/Library/Mobile Documents/com~apple~CloudDocs/FRONTEND-React/trebalhoFinal/frontend/src/App.tsx)
- lista visivel apos filtro e pesquisa em [frontend/src/App.tsx](/Users/gabriella.rzende/Library/Mobile Documents/com~apple~CloudDocs/FRONTEND-React/trebalhoFinal/frontend/src/App.tsx)

Motivo: evita recalculos desnecessarios sempre que o componente renderiza.

### `useReducer`

Usado para gerir a logica principal das tarefas em [frontend/src/reducers/taskReducer.ts](/Users/gabriella.rzende/Library/Mobile Documents/com~apple~CloudDocs/FRONTEND-React/trebalhoFinal/frontend/src/reducers/taskReducer.ts).

Acoes implementadas:

- `SET_TASKS`
- `ADD_TASK`
- `REMOVE_TASK`
- `TOGGLE_TASK`
- `CLEAR_COMPLETED`

Motivo: concentra as transicoes de estado numa unica funcao previsivel, o que facilita a explicacao e a manutencao.

### `useContext`

Usado para criar um tema global em [frontend/src/context/ThemeContext.tsx](/Users/gabriella.rzende/Library/Mobile Documents/com~apple~CloudDocs/FRONTEND-React/trebalhoFinal/frontend/src/context/ThemeContext.tsx).

Inclui:

- `ThemeProvider`
- `useTheme`
- `ThemeToggle`

Motivo: permite partilhar o tema entre componentes sem `props drilling`.

### `useRef`

Usado no `TaskForm` em [frontend/src/components/TaskForm.tsx](/Users/gabriella.rzende/Library/Mobile Documents/com~apple~CloudDocs/FRONTEND-React/trebalhoFinal/frontend/src/components/TaskForm.tsx):

- foco automatico ao abrir a app
- devolver o foco ao input depois de adicionar uma tarefa

Motivo: oferece acesso direto ao elemento DOM quando a interface precisa de controlo imperativo.

## Backend Express

Rotas disponiveis:

- `GET /tasks` -> listar tarefas
- `POST /tasks` -> criar tarefa
- `PATCH /tasks/:id` -> atualizar ou alternar o estado da tarefa
- `DELETE /tasks/:id` -> remover uma tarefa
- `DELETE /tasks/completed` -> remover tarefas concluidas

Nota: o armazenamento e em memoria. Ao reiniciar o servidor, a lista volta ao estado inicial.
