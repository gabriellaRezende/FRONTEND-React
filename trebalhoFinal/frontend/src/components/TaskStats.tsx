import type { TaskStatsData } from '../types';

import styles from '../styles/TaskStats.module.css';

type TaskStatsProps = {
  stats: TaskStatsData;
  disabled: boolean;
  onClearCompleted: () => Promise<void>;
};

export function TaskStats({ stats, disabled, onClearCompleted }: TaskStatsProps) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <span className={styles.label}>Total</span>
        <strong className={styles.value}>{stats.total}</strong>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>Concluidas</span>
        <strong className={styles.value}>{stats.completed}</strong>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>Pendentes</span>
        <strong className={styles.value}>{stats.pending}</strong>
      </div>
      <button
        className={styles.clearButton}
        type="button"
        disabled={disabled || stats.completed === 0}
        onClick={onClearCompleted}
      >
        Limpar concluidas
      </button>
    </section>
  );
}

