import { type ReactNode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema, type SignupForm } from './schema';
import './style.css';

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

function Field({ id, label, error, children }: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      <small id={errorId} className="field-error" role={error ? 'alert' : undefined}>
        {error ?? ''}
      </small>
    </div>
  );
}

function App() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
  });

  function handleValidSubmit() {
    setSuccess(true);
  }

  return (
    <main>
      <section aria-labelledby="signup-title">
        <p>VALIDAÇÃO TIPADA</p>
        <h1 id="signup-title">Crie sua conta</h1>
        <p className="intro">Validação de formulário com React Hook Form e regras de domínio em Zod.</p>

        <form onSubmit={handleSubmit(handleValidSubmit)} noValidate>
          <Field id="name" label="Nome" error={errors.name?.message}>
            <input
              id="name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby="name-error"
              {...register('name', { onChange: () => setSuccess(false) })}
            />
          </Field>

          <Field id="email" label="E-mail" error={errors.email?.message}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby="email-error"
              {...register('email', { onChange: () => setSuccess(false) })}
            />
          </Field>

          <Field id="password" label="Senha" error={errors.password?.message}>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby="password-error"
              {...register('password', { onChange: () => setSuccess(false) })}
            />
          </Field>

          <Field id="confirm" label="Confirmar senha" error={errors.confirm?.message}>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirm)}
              aria-describedby="confirm-error"
              {...register('confirm', { onChange: () => setSuccess(false) })}
            />
          </Field>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Validando…' : 'Cadastrar'}
          </button>

          {success && (
            <p className="success" role="status" aria-live="polite">
              Dados validados com sucesso.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Elemento #root não encontrado.');

createRoot(rootElement).render(<App />);
