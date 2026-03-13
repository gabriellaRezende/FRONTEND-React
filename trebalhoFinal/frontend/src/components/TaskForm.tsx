import { useEffect, useRef, useState, type FormEvent } from 'react';

import styles from '../styles/TaskForm.module.css';

type TaskFormProps = {
  onAddTask: (title: string) => Promise<boolean>;
  disabled: boolean;
};

export function TaskForm({ onAddTask, disabled }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setError('Escreve uma tarefa antes de submeter.');
      inputRef.current?.focus();
      return;
    }

    setError('');
    const wasCreated = await onAddTask(normalizedTitle);

    if (wasCreated) {
      setTitle('');
      // O useRef permite recuperar o foco logo apos adicionar.
      inputRef.current?.focus();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="task-title">
        Nova tarefa
      </label>
      <div className={styles.row}>
        <input
          id="task-title"
          ref={inputRef}
          className={styles.input}
          type="text"
          value={title}
          placeholder="Ex.: Rever exercicios de useReducer"
          onChange={(event) => setTitle(event.target.value)}
          disabled={disabled}
        />
        <button className={styles.button} type="submit" disabled={disabled}>
          Adicionar
        </button>
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
    </form>
  );
}
