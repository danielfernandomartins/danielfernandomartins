import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const expected = [
  '01-accessible-saas-landing',
  '02-taskflow-react-ts',
  '03-movie-explorer',
  '04-job-tracker',
  '05-finance-dashboard',
  '06-next-portfolio-blog',
  '07-crm-tailwind',
  '08-github-explorer',
  '09-smart-signup',
  '10-tested-cart',
  '11-dev-city-ai-character',
];

const nodeProjects = expected.filter((project) => !['01-accessible-saas-landing', '11-dev-city-ai-character'].includes(project));
const viteProjects = nodeProjects.filter((project) => project !== '06-next-portfolio-blog');
const testedProjects = ['02-taskflow-react-ts', '03-movie-explorer', '05-finance-dashboard', '06-next-portfolio-blog', '08-github-explorer', '10-tested-cart'];
const lintedProjects = ['02-taskflow-react-ts', '03-movie-explorer', '05-finance-dashboard', '06-next-portfolio-blog', '08-github-explorer'];
const failures = [];
const exists = (path) => fs.existsSync(path);
const read = (path) => fs.readFileSync(path, 'utf8');

for (const project of expected) {
  const base = `frontend-projects/${project}`;
  if (!exists(base)) failures.push(`Projeto ausente: ${project}`);
  if (!exists(`${base}/README.md`)) failures.push(`README ausente: ${project}`);
}

for (const project of nodeProjects) {
  const base = `frontend-projects/${project}`;
  const packagePath = `${base}/package.json`;
  const tsconfigPath = `${base}/tsconfig.json`;

  if (!exists(packagePath)) {
    failures.push(`package.json ausente: ${project}`);
    continue;
  }

  const pkg = JSON.parse(read(packagePath));
  if (!pkg.scripts?.build) failures.push(`build script ausente: ${project}`);
  if (!pkg.scripts?.typecheck) failures.push(`typecheck script ausente: ${project}`);

  for (const section of ['dependencies', 'devDependencies']) {
    for (const [name, version] of Object.entries(pkg[section] ?? {})) {
      if (version === 'latest') failures.push(`${project}: ${name} ainda usa latest`);
    }
  }

  if (!exists(tsconfigPath)) failures.push(`tsconfig ausente: ${project}`);
}

for (const project of viteProjects) {
  const htmlPath = `frontend-projects/${project}/index.html`;
  if (!exists(htmlPath)) {
    failures.push(`index.html ausente: ${project}`);
    continue;
  }
  const html = read(htmlPath);
  if (!html.includes('lang="pt-BR"')) failures.push(`${project}: idioma HTML ausente`);
  if (!html.includes('name="viewport"')) failures.push(`${project}: viewport ausente`);
  if (!html.includes('name="description"')) failures.push(`${project}: meta description ausente`);
  if (!/<title>.+<\/title>/.test(html)) failures.push(`${project}: title ausente`);
}

for (const project of testedProjects) {
  const pkg = JSON.parse(read(`frontend-projects/${project}/package.json`));
  if (!pkg.scripts?.test) failures.push(`test script ausente no projeto testado: ${project}`);
}

for (const project of lintedProjects) {
  const base = `frontend-projects/${project}`;
  const pkg = JSON.parse(read(`${base}/package.json`));
  if (!pkg.scripts?.lint) failures.push(`lint script ausente no projeto principal: ${project}`);
  if (!exists(`${base}/eslint.config.mjs`)) failures.push(`eslint.config.mjs ausente: ${project}`);
  if (!pkg.devDependencies?.eslint || !pkg.devDependencies?.['typescript-eslint']) {
    failures.push(`dependências de lint ausentes: ${project}`);
  }
}

const requiredFlagshipFiles = [
  'frontend-projects/02-taskflow-react-ts/src/task-utils.test.ts',
  'frontend-projects/03-movie-explorer/src/api.test.ts',
  'frontend-projects/05-finance-dashboard/src/store.test.ts',
  'frontend-projects/06-next-portfolio-blog/app/content.test.ts',
  'frontend-projects/08-github-explorer/src/api.test.ts',
  'frontend-projects/08-github-explorer/src/Explorer.tsx',
];
for (const file of requiredFlagshipFiles) {
  if (!exists(file)) failures.push(`Evidência flagship ausente: ${file}`);
}

const aiProject = 'frontend-projects/11-dev-city-ai-character';
for (const required of [
  `${aiProject}/index.html`,
  `${aiProject}/styles.css`,
  `${aiProject}/scripts.js`,
  `${aiProject}/domain.mjs`,
  `${aiProject}/domain.test.mjs`,
  `${aiProject}/README.md`,
]) {
  if (!exists(required)) failures.push(`Projeto IA incompleto: ${required}`);
}
if (exists(`${aiProject}/index.html`)) {
  const html = read(`${aiProject}/index.html`);
  if (!html.includes('lang="pt-BR"')) failures.push('Dev City: idioma HTML ausente');
  if (!html.includes('name="description"')) failures.push('Dev City: meta description ausente');
  if (!html.includes('Pular para o conteúdo')) failures.push('Dev City: skip link ausente');
  if (!html.includes('aria-live')) failures.push('Dev City: região dinâmica acessível ausente');
  if (!html.includes('type="module"')) failures.push('Dev City: JavaScript modular ausente');
  if (html.includes('onclick=')) failures.push('Dev City: handler inline voltou ao HTML');
}
if (exists(`${aiProject}/scripts.js`)) {
  const script = read(`${aiProject}/scripts.js`);
  if (!script.includes('validateImageMeta')) failures.push('Dev City: validação de upload ausente');
  if (!script.includes('try {') || !script.includes('catch')) failures.push('Dev City: tratamento de erro assíncrono ausente');
}

if (exists(`${aiProject}/domain.test.mjs`)) {
  const result = spawnSync(process.execPath, ['--test', `${aiProject}/domain.test.mjs`], { encoding: 'utf8' });
  if (result.status !== 0) failures.push(`Dev City: testes falharam\n${result.stdout}${result.stderr}`);
}

const profile = read('README.md');
for (const project of expected) {
  if (!profile.includes(`frontend-projects/${project}/`)) failures.push(`README principal sem link para ${project}`);
}

const brief = read('RECRUITER-BRIEF.md').toLowerCase();
if (!brief.includes('front-end')) failures.push('Recruiter Brief não está alinhado a Front-End');
if (!brief.includes('dev city character lab')) failures.push('Recruiter Brief não cita o projeto de IA');

const landing = read('frontend-projects/01-accessible-saas-landing/index.html');
if (!landing.includes('lang="pt-BR"') || !landing.includes('Pular para conteúdo')) {
  failures.push('Landing perdeu requisitos básicos de acessibilidade');
}

for (const legacyRoot of ['cobol-portfolio', 'mainframe-knowledge', 'data-portfolio', 'qa-portfolio']) {
  if (exists(legacyRoot)) failures.push(`Conteúdo legado voltou à raiz: ${legacyRoot}`);
}

for (const required of [
  'SECURITY.md',
  'CONTRIBUTING.md',
  'frontend-projects/PROJECT-STANDARDS.md',
  'audit/RECRUITER-110-CHECKLIST.md',
  'audit/MASTER-FRONTEND-AUDIT.md',
]) {
  if (!exists(required)) failures.push(`Controle de qualidade ausente: ${required}`);
}

if (failures.length) {
  console.error(`AUDITORIA FALHOU\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(
  `AUDITORIA OK: ${expected.length} projetos, dependências diretas sem latest, metadados, typecheck, testes, lint nos principais, acessibilidade, projeto IA e isolamento do legado validados.`,
);
