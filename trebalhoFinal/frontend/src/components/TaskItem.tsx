import type { Task } from '../types';

import styles from '../styles/TaskItem.module.css';

type TaskItemProps = {
  task: Task;
  disabled: boolean;
  onToggleTask: (task: Task) => Promise<void>;
  onRemoveTask: (taskId: string) => Promise<void>;
};

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  dateStyle: 'short',
  timeStyle: 'short',
});

export function TaskItem({ task, disabled, onToggleTask, onRemoveTask }: TaskItemProps) {
  return (
    <li className={styles.item}>
      <label className={styles.checkArea}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task)}
          disabled={disabled}
        />
        <span className={`${styles.title} ${task.completed ? styles.completed : ''}`}>{task.title}</span>
      </label>

      <div className={styles.meta}>
        <span className={styles.badge}>{task.completed ? 'Concluida' : 'Pendente'}</span>
        <time className={styles.time} dateTime={task.createdAt}>
          {dateFormatter.format(new Date(task.createdAt))}
        </time>
        <button className={styles.removeButton} type="button" onClick={() => onRemoveTask(task.id)} disabled={disabled}>
          Remover
        </button>
      </div>
    </li>
  );
}

