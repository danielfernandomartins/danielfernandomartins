import fs from 'node:fs';

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
];

const viteProjects = expected.filter((project) => !['01-accessible-saas-landing', '06-next-portfolio-blog'].includes(project));
const testedProjects = ['02-taskflow-react-ts', '03-movie-explorer', '05-finance-dashboard', '10-tested-cart'];
const failures = [];
const exists = (path) => fs.existsSync(path);
const read = (path) => fs.readFileSync(path, 'utf8');

for (const project of expected) {
  const base = `frontend-projects/${project}`;
  if (!exists(base)) failures.push(`Projeto ausente: ${project}`);
  if (!exists(`${base}/README.md`)) failures.push(`README ausente: ${project}`);
}

for (const project of expected.slice(1)) {
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

const requiredFlagshipFiles = [
  'frontend-projects/02-taskflow-react-ts/src/task-utils.test.ts',
  'frontend-projects/03-movie-explorer/src/api.test.ts',
  'frontend-projects/05-finance-dashboard/src/store.test.ts',
  'frontend-projects/08-github-explorer/src/api.ts',
  'frontend-projects/08-github-explorer/src/Explorer.tsx',
];
for (const file of requiredFlagshipFiles) {
  if (!exists(file)) failures.push(`Evidência flagship ausente: ${file}`);
}

const profile = read('README.md');
for (const project of expected) {
  if (!profile.includes(`frontend-projects/${project}/`)) failures.push(`README principal sem link para ${project}`);
}

const brief = read('RECRUITER-BRIEF.md').toLowerCase();
if (!brief.includes('front-end')) failures.push('Recruiter Brief não está alinhado a Front-End');

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
  `AUDITORIA OK: ${expected.length} projetos, dependências diretas sem latest, metadados HTML, typecheck, testes flagship, documentação e isolamento do legado validados.`,
);
