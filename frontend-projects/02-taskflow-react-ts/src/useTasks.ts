import { useEffect, useMemo, useState } from 'react';
import type { Task, TaskFilter } from './types';

const STORAGE_KEY = 'taskflow';

function loadTasks(): Task[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Task[];
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<TaskFilter>('all');

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)), [tasks]);

  const visibleTasks = useMemo(
    () => tasks.filter((task) => filter === 'all' || (filter === 'done' ? task.done : !task.done)),
    [tasks, filter],
  );

  const completed = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);

  return {
    tasks,
    visibleTasks,
    completed,
    filter,
    setFilter,
    addTask: (text: string) => setTasks((current) => [{ id: Date.now(), text, done: false }, ...current]),
    toggleTask: (id: number) => setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task)),
    removeTask: (id: number) => setTasks((current) => current.filter((task) => task.id !== id)),
  };
}
