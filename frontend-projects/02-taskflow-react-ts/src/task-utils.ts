import type { Task, TaskFilter } from './types';

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === 'all') return tasks;
  return tasks.filter((task) => (filter === 'done' ? task.done : !task.done));
}

export function countCompleted(tasks: Task[]): number {
  return tasks.filter((task) => task.done).length;
}

export function createTask(text: string, id = Date.now()): Task {
  return { id, text: text.trim(), done: false };
}
