import { useEffect, useMemo, useReducer, useState } from 'react';

import { FilterBar } from './components/FilterBar';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { taskReducer } from './reducers/taskReducer';
import { clearCompletedTasks, createTask, deleteTask, fetchTasks, updateTask } from './services/api';
import styles from './styles/App.module.css';
import type { Feedback, FilterStatus, Task, TaskStatsData } from './types';

function AppContent() {
  const { theme } = useTheme();
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  //Uso o useEffect para carregar as tarefas iniciais da API. 
  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      try {
        setLoading(true);
        const initialTasks = await fetchTasks();

        if (isMounted) {
          dispatch({ type: 'SET_TASKS', payload: initialTasks });
        }
      } catch (error) {
        if (isMounted) {
          setFeedback({
            type: 'error',
            message: error instanceof Error ? error.message : 'Nao foi possivel carregar as tarefas.',
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  //O useMemo é utilizado na aplicação para 
  // As estatisticas sao derivadas do reducer e memoizadas para evitar recalculos repetidos.
  const stats = useMemo<TaskStatsData>(() => {
    const completed = tasks.filter((task) => task.completed).length;

    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
    };
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'completed' && task.completed) ||
        (filter === 'pending' && !task.completed);

      const matchesSearch =
        normalizedSearch.length === 0 || task.title.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, searchTerm]);

  useEffect(() => {
    document.title = `${stats.pending} pendente(s) | Task Manager`;

    return () => {
      document.title = 'Task Manager';
    };
  }, [stats.pending]);

  useEffect(() => {
    if (!feedback || feedback.type !== 'success') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback(null);
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  const handleAddTask = async (title: string) => {
    try {
      setIsSubmitting(true);
      setFeedback(null);
      const newTask = await createTask(title);
      dispatch({ type: 'ADD_TASK', payload: newTask });
      setFeedback({ type: 'success', message: 'Tarefa adicionada com sucesso.' });
      return true;
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Nao foi possivel criar a tarefa.',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      setIsSubmitting(true);
      setFeedback(null);
      const updatedTask = await updateTask(task.id, !task.completed);
      dispatch({ type: 'TOGGLE_TASK', payload: updatedTask });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Nao foi possivel atualizar a tarefa.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveTask = async (taskId: string) => {
    try {
      setIsSubmitting(true);
      setFeedback(null);
      await deleteTask(taskId);
      dispatch({ type: 'REMOVE_TASK', payload: taskId });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Nao foi possivel remover a tarefa.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearCompleted = async () => {
    try {
      setIsSubmitting(true);
      setFeedback(null);
      await clearCompletedTasks();
      dispatch({ type: 'CLEAR_COMPLETED' });
      setFeedback({ type: 'success', message: 'Tarefas concluidas removidas.' });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Nao foi possivel limpar as tarefas concluidas.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <header className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>React + Node.js + Express</span>
            <h1 className={styles.title}>Task Manager Pessoal</h1>
            <p className={styles.subtitle}>
              Uma aplicação simples para gerenciar suas tarefas do dia-a-dia.
            </p>
          </div>

          <div className={styles.heroActions}>
            <span className={styles.themeBadge}>Tema ativo: {theme === 'light' ? 'Claro' : 'Escuro'}</span>
            <ThemeToggle />
          </div>
        </header>

        <TaskStats stats={stats} disabled={loading || isSubmitting} onClearCompleted={handleClearCompleted} />

        <div className={styles.grid}>
          <section className={`${styles.column} ${styles.sidebarColumn}`}>
            <TaskForm onAddTask={handleAddTask} disabled={loading || isSubmitting} />
            <FilterBar
              filter={filter}
              searchTerm={searchTerm}
              onChangeFilter={setFilter}
              onChangeSearch={setSearchTerm}
              disabled={loading || isSubmitting}
            />
          </section>

          <section className={`${styles.column} ${styles.contentColumn}`}>
            {feedback ? (
              <div
                className={`${styles.feedback} ${feedback.type === 'error' ? styles.feedbackError : styles.feedbackSuccess}`}
              >
                {feedback.message}
              </div>
            ) : null}

            {loading ? (
              <div className={styles.loader}>A carregar tarefas da API...</div>
            ) : (
              <TaskList
                tasks={visibleTasks}
                disabled={isSubmitting}
                onToggleTask={handleToggleTask}
                onRemoveTask={handleRemoveTask}
              />
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
