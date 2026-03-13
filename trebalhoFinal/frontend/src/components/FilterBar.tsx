import type { FilterStatus } from '../types';

import styles from '../styles/FilterBar.module.css';

type FilterBarProps = {
  filter: FilterStatus;
  searchTerm: string;
  onChangeFilter: (filter: FilterStatus) => void;
  onChangeSearch: (search: string) => void;
  disabled: boolean;
};

const filterOptions: Array<{ label: string; value: FilterStatus }> = [
  { label: 'Todas', value: 'all' },
  { label: 'Concluidas', value: 'completed' },
  { label: 'Pendentes', value: 'pending' },
];

export function FilterBar({
  filter,
  searchTerm,
  onChangeFilter,
  onChangeSearch,
  disabled,
}: FilterBarProps) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.filters}>
        {filterOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`${styles.filterButton} ${filter === option.value ? styles.active : ''}`}
            onClick={() => onChangeFilter(option.value)}
            disabled={disabled}
          >
            {option.label}
          </button>
        ))}
      </div>

      <input
        className={styles.search}
        type="search"
        value={searchTerm}
        placeholder="Pesquisar por texto..."
        onChange={(event) => onChangeSearch(event.target.value)}
        disabled={disabled}
      />
    </section>
  );
}

