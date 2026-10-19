# 08 — Task API totalmente resolvida

Este capítulo fecha a primeira etapa com uma API pequena, mas completa o suficiente para estudar fluxo HTTP, validação, service, erros e testes.

> O código é didático. Refaça sem copiar depois de entender.

## Estrutura

```text
src/
  app.ts
  server.ts
  tasks/
    task.types.ts
    task.repository.ts
    task.service.ts
    task.controller.ts
    task.routes.ts
    task.schema.ts
  errors/
    app-error.ts
    error-handler.ts
```

---

## `task.types.ts`

```ts
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export type CreateTaskInput = {
  title: string;
};

export type UpdateTaskInput = {
  title?: string;
  completed?: boolean;
};
```

---

## `app-error.ts`

```ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
  }
}
```

---

## `task.repository.ts`

```ts
import { randomUUID } from 'node:crypto';
import type { CreateTaskInput, Task, UpdateTaskInput } from './task.types.js';

const tasks: Task[] = [];

export const taskRepository = {
  create(input: CreateTaskInput): Task {
    const task: Task = {
      id: randomUUID(),
      title: input.title,
      completed: false,
      createdAt: new Date()
    };

    tasks.push(task);
    return task;
  },

  findAll(): Task[] {
    return tasks;
  },

  findById(id: string): Task | undefined {
    return tasks.find(task => task.id === id);
  },

  update(id: string, input: UpdateTaskInput): Task | undefined {
    const task = tasks.find(item => item.id === id);
    if (!task) return undefined;

    if (input.title !== undefined) task.title = input.title;
    if (input.completed !== undefined) task.completed = input.completed;

    return task;
  },

  delete(id: string): boolean {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  clear() {
    tasks.splice(0, tasks.length);
  }
};
```

---

## `task.schema.ts`

```ts
import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().trim().min(2).max(120)
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(2).max(120).optional(),
  completed: z.boolean().optional()
}).refine(
  data => data.title !== undefined || data.completed !== undefined,
  { message: 'At least one field is required' }
);
```

---

## `task.service.ts`

```ts
import { AppError } from '../errors/app-error.js';
import { taskRepository } from './task.repository.js';
import type { CreateTaskInput, UpdateTaskInput } from './task.types.js';

export const taskService = {
  create(input: CreateTaskInput) {
    return taskRepository.create(input);
  },

  list() {
    return taskRepository.findAll();
  },

  getById(id: string) {
    const task = taskRepository.findById(id);
    if (!task) throw new AppError('Task not found', 404);
    return task;
  },

  update(id: string, input: UpdateTaskInput) {
    const task = taskRepository.update(id, input);
    if (!task) throw new AppError('Task not found', 404);
    return task;
  },

  remove(id: string) {
    const removed = taskRepository.delete(id);
    if (!removed) throw new AppError('Task not found', 404);
  }
};
```

---

## `task.controller.ts`

```ts
import type { Request, Response } from 'express';
import { createTaskSchema, updateTaskSchema } from './task.schema.js';
import { taskService } from './task.service.js';

export function createTask(req: Request, res: Response) {
  const input = createTaskSchema.parse(req.body);
  const task = taskService.create(input);
  return res.status(201).json(task);
}

export function listTasks(_req: Request, res: Response) {
  return res.json(taskService.list());
}

export function getTask(req: Request, res: Response) {
  return res.json(taskService.getById(req.params.id));
}

export function updateTask(req: Request, res: Response) {
  const input = updateTaskSchema.parse(req.body);
  return res.json(taskService.update(req.params.id, input));
}

export function deleteTask(req: Request, res: Response) {
  taskService.remove(req.params.id);
  return res.status(204).send();
}
```

---

## `task.routes.ts`

```ts
import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask
} from './task.controller.js';

export const taskRoutes = Router();

taskRoutes.post('/tasks', createTask);
taskRoutes.get('/tasks', listTasks);
taskRoutes.get('/tasks/:id', getTask);
taskRoutes.patch('/tasks/:id', updateTask);
taskRoutes.delete('/tasks/:id', deleteTask);
```

---

## `error-handler.ts`

```ts
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from './app-error.js';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Invalid request',
      issues: error.issues
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: 'Internal server error' });
}
```

---

## `app.ts`

```ts
import express from 'express';
import { errorHandler } from './errors/error-handler.js';
import { taskRoutes } from './tasks/task.routes.js';

export const app = express();

app.use(express.json());
app.use(taskRoutes);
app.use(errorHandler);
```

---

## `server.ts`

```ts
import { app } from './app.js';

const port = Number(process.env.PORT ?? 3333);

app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`);
});
```

---

# Testes resolvidos

Exemplo com Vitest + Supertest:

```ts
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { app } from '../src/app.js';
import { taskRepository } from '../src/tasks/task.repository.js';

beforeEach(() => {
  taskRepository.clear();
});

describe('Task API', () => {
  it('creates a task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: 'Estudar HTTP' });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Estudar HTTP');
    expect(response.body.completed).toBe(false);
  });

  it('rejects invalid title', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: '' });

    expect(response.status).toBe(400);
  });

  it('returns 404 for missing task', async () => {
    const response = await request(app)
      .get('/tasks/does-not-exist');

    expect(response.status).toBe(404);
  });

  it('updates a task', async () => {
    const created = await request(app)
      .post('/tasks')
      .send({ title: 'Estudar Node' });

    const response = await request(app)
      .patch(`/tasks/${created.body.id}`)
      .send({ completed: true });

    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  it('deletes a task', async () => {
    const created = await request(app)
      .post('/tasks')
      .send({ title: 'Estudar SQL' });

    const response = await request(app)
      .delete(`/tasks/${created.body.id}`);

    expect(response.status).toBe(204);
  });
});
```

---

# Como explicar esse projeto em entrevista

> Eu fiz uma API de tarefas para praticar fundamentos de Back-End. Separei rota, controller, service e repository em memória. O controller lida com HTTP, o service com regra de negócio e o repository com persistência. Valido body com Zod, uso erros de aplicação para 404 e middleware global para padronizar falhas. Testei a API com Supertest cobrindo criação, validação, atualização, exclusão e recurso inexistente. O próximo passo natural seria trocar o repository em memória por PostgreSQL sem alterar a camada HTTP.

---

# Perguntas sobre o próprio código

### Por que `201` no POST?

Porque a requisição criou um novo recurso.

### Por que `204` no DELETE?

Porque a remoção foi concluída e não é necessário retornar body.

### Por que o service não recebe `req` e `res`?

Para a regra de negócio não depender do framework HTTP.

### Por que repository em memória?

Para aprender o fluxo antes de adicionar banco. Depois, a implementação pode ser substituída por PostgreSQL.

### Por que o middleware de erro fica por último?

Porque ele precisa receber erros encaminhados pelas etapas anteriores.

### O que melhoraria para produção?

- persistência real;
- logging estruturado;
- configuração/validação de env;
- autenticação, se o domínio exigir;
- paginação em coleções grandes;
- observabilidade;
- deploy e health checks.
