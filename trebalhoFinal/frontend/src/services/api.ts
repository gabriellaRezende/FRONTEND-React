import type { Task } from '../types';

// Centraliza a comunicação com a API

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  const hasBody = response.status !== 204;
  const data = hasBody ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.message ?? 'Nao foi possivel comunicar com a API.');
  }

  return data as T;
}

export function fetchTasks() {
  return request<Task[]>('/tasks');
}

export function createTask(title: string) {
  return request<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

export function updateTask(id: string, completed: boolean) {
  return request<Task>(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed }),
  });
}

export function deleteTask(id: string) {
  return request<void>(`/tasks/${id}`, {
    method: 'DELETE',
  });
}

export function clearCompletedTasks() {
  return request<{ removed: number; tasks: Task[] }>('/tasks/completed', {
    method: 'DELETE',
  });
}

