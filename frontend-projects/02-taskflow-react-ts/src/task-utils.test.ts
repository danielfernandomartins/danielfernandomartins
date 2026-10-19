import { describe, expect, it } from 'vitest';
import { countCompleted, createTask, filterTasks } from './task-utils';
import type { Task } from './types';

const tasks: Task[] = [
  { id: 1, text: 'Estudar React', done: false },
  { id: 2, text: 'Revisar TypeScript', done: true },
];

describe('TaskFlow domain logic', () => {
  it('filters open and completed tasks without mutating the source', () => {
    expect(filterTasks(tasks, 'open')).toEqual([tasks[0]]);
    expect(filterTasks(tasks, 'done')).toEqual([tasks[1]]);
    expect(filterTasks(tasks, 'all')).toBe(tasks);
  });

  it('counts completed tasks', () => {
    expect(countCompleted(tasks)).toBe(1);
  });

  it('normalizes new task text', () => {
    expect(createTask('  Nova tarefa  ', 99)).toEqual({ id: 99, text: 'Nova tarefa', done: false });
  });
});
