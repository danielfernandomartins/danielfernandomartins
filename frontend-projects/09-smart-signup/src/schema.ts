import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().trim().min(3, 'Informe ao menos 3 caracteres'),
    email: z.string().trim().email('E-mail inválido'),
    password: z
      .string()
      .min(8, 'Use ao menos 8 caracteres')
      .regex(/[A-Z]/, 'Inclua uma letra maiúscula')
      .regex(/\d/, 'Inclua um número'),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'As senhas não coincidem',
    path: ['confirm'],
  });

export type SignupForm = z.infer<typeof signupSchema>;
