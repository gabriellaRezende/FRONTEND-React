export type Theme = 'light' | 'dark';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type FilterStatus = 'all' | 'completed' | 'pending';

export type TaskStatsData = {
  total: number;
  completed: number;
  pending: number;
};

export type Feedback = {
  type: 'success' | 'error';
  message: string;
};

