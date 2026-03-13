import type { Task } from '../types';

import { TaskItem } from './TaskItem';
import styles from '../styles/TaskList.module.css';

type TaskListProps = {
  tasks: Task[];
  disabled: boolean;
  onToggleTask: (task: Task) => Promise<void>;
  onRemoveTask: (taskId: string) => Promise<void>;
};

export function TaskList({ tasks, disabled, onToggleTask, onRemoveTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>Sem tarefas para mostrar</h3>
        <p>Adiciona uma nova tarefa ou ajusta os filtros para continuares a demonstracao.</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          disabled={disabled}
          onToggleTask={onToggleTask}
          onRemoveTask={onRemoveTask}
        />
      ))}
    </ul>
  );
}

