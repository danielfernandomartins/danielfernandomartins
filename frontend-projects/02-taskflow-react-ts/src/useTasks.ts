import { useEffect, useMemo, useState } from 'react';
import type { Task, TaskFilter } from './types';
import { countCompleted, createTask, filterTasks } from './task-utils';

const STORAGE_KEY = 'taskflow';

function loadTasks(): Task[] {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as unknown;
    if (!Array.isArray(stored)) return [];
    return stored.filter(
      (task): task is Task =>
        typeof task === 'object' &&
        task !== null &&
        typeof (task as Task).id === 'number' &&
        typeof (task as Task).text === 'string' &&
        typeof (task as Task).done === 'boolean',
    );
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<TaskFilter>('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // The app remains usable even when storage is unavailable or full.
    }
  }, [tasks]);

  const visibleTasks = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);
  const completed = useMemo(() => countCompleted(tasks), [tasks]);

  return {
    tasks,
    visibleTasks,
    completed,
    filter,
    setFilter,
    addTask: (text: string) => setTasks((current) => [createTask(text), ...current]),
    toggleTask: (id: number) =>
      setTasks((current) => current.map((task) => (task.id === id ? { ...task, done: !task.done } : task))),
    removeTask: (id: number) => setTasks((current) => current.filter((task) => task.id !== id)),
  };
}
