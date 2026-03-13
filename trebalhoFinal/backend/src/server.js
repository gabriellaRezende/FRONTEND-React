import { randomUUID } from 'node:crypto';

import cors from 'cors';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Armazenamento em memoria para manter a API simples e didatica.

//aqui inicia algums tarefas pre-definidas comentadas
let tasks = [
  {
    id: randomUUID(),
    title: 'Preparar apresentacao sobre React Hooks',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    title: 'Rever a API Express antes da aula',
    completed: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: randomUUID(),
    title: 'Criar exemplos de useReducer e useMemo',
    completed: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
];

//aqui inicia a lista de tarefas vazia
app.get('/tasks', (_request, response) => {
  response.json(tasks);
});

//aqui cria uma nova tarefa, verificando se o titulo foi fornecido e nao esta vazio, caso contrario retorna um erro 400
app.post('/tasks', (request, response) => {
  const title = request.body?.title?.trim();

  if (!title) {
    return response.status(400).json({ message: 'O titulo da tarefa e obrigatorio.' });
  }

  const task = {
    id: randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks = [task, ...tasks];
  return response.status(201).json(task);
});

//aqui deleta todas as tarefas marcadas como completas, retornando a quantidade de tarefas removidas e a lista atualizada de tarefas
app.delete('/tasks/completed', (_request, response) => {
  const initialSize = tasks.length;
  tasks = tasks.filter((task) => !task.completed);

  return response.json({
    removed: initialSize - tasks.length,
    tasks,
  });
});

//aqui atualiza uma tarefa existente, verificando se a tarefa existe, se o titulo fornecido e valido e atualizando o status de concluida caso o campo completed seja booleano ou nao seja fornecido
app.patch('/tasks/:id', (request, response) => {
  const task = tasks.find((item) => item.id === request.params.id);

  if (!task) {
    return response.status(404).json({ message: 'Tarefa nao encontrada.' });
  }

  const { title, completed } = request.body ?? {};

  if (typeof title === 'string') {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return response.status(400).json({ message: 'O titulo nao pode ficar vazio.' });
    }

    task.title = normalizedTitle;
  }

  if (typeof completed === 'boolean') {
    task.completed = completed;
  } else if (title === undefined) {
    task.completed = !task.completed;
  }

  return response.json(task);
});

//aqui deleta uma tarefa especifica, verificando se a tarefa existe e retornando um status 204 caso a exclusao seja bem sucedida ou um erro 404 caso a tarefa nao seja encontrada
app.delete('/tasks/:id', (request, response) => {
  const taskExists = tasks.some((task) => task.id === request.params.id);

  if (!taskExists) {
    return response.status(404).json({ message: 'Tarefa nao encontrada.' });
  }

  tasks = tasks.filter((task) => task.id !== request.params.id);
  return response.status(204).send();
});

//aqui trata erros inesperados
app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
});

//aqui inicia o servidor na porta especifica
app.listen(PORT, () => {
  console.log(`Task Manager API ativa em http://localhost:${PORT}`);
});
