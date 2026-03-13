import { useTheme } from '../context/ThemeContext';
import styles from '../styles/ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.button} type="button" onClick={toggleTheme}>
      <span className={styles.dot} />
      {theme === 'light' ? 'Modo escuro' : 'Modo claro'}
    </button>
  );
}

