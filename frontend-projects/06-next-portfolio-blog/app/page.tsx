import { notes, projects } from './content';

export default function Page() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <p>FRONT-END DEVELOPER</p>
        <h1 id="hero-title">Interfaces claras.<br />Código que resolve.</h1>
        <p>
          Portfólio em Next.js para demonstrar fundamentos sólidos, conteúdo tipado e decisões de produto no ecossistema React.
        </p>
      </section>

      <section id="projetos" aria-labelledby="projects-title">
        <h2 id="projects-title">Projetos</h2>
        <div className="grid">
          {projects.map((project) => (
            <article key={project.name}>
              <span>Projeto</span>
              <h3>{project.name}</h3>
              <p><strong>{project.stack}</strong></p>
              <p>{project.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="artigos" aria-labelledby="notes-title">
        <h2 id="notes-title">Notas técnicas</h2>
        {notes.map((note) => (
          <article className="post" key={note.title}>
            <span>{note.topic}</span>
            <h3>{note.title}</h3>
            <p>{note.summary}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
