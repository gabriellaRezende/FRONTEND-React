import type { Task } from '../types';

export type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: Task }
  | { type: 'CLEAR_COMPLETED' };

// O reducer concentra as transicoes principais de estado da aplicação
export function taskReducer(state: Task[], action: TaskAction): Task[] {
 //aqui 
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [action.payload, ...state];
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map((task) => (task.id === action.payload.id ? action.payload : task));
    case 'CLEAR_COMPLETED':
      return state.filter((task) => !task.completed);
    default:
      return state;
  }
}

