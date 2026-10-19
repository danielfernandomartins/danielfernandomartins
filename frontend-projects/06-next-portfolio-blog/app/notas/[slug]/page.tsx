import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findNoteBySlug, notes } from '../../content';

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = findNoteBySlug(slug);

  if (!note) {
    return { title: 'Nota não encontrada' };
  }

  return {
    title: `${note.title} | Dev Portfolio`,
    description: note.summary,
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = findNoteBySlug(slug);

  if (!note) notFound();

  return (
    <main className="note-page">
      <Link className="back-link" href="/#artigos">← Voltar para notas</Link>

      <article>
        <span className="note-topic">{note.topic}</span>
        <h1>{note.title}</h1>
        <p className="note-summary">{note.summary}</p>

        <div className="note-body">
          {note.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
