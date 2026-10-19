import fs from 'node:fs';

const expected = [
  '01-accessible-saas-landing','02-taskflow-react-ts','03-movie-explorer','04-job-tracker','05-finance-dashboard','06-next-portfolio-blog','07-crm-tailwind','08-github-explorer','09-smart-signup','10-tested-cart'
];
const failures=[];
const exists=p=>fs.existsSync(p);
const read=p=>fs.readFileSync(p,'utf8');
for(const dir of expected){
  const base=`frontend-projects/${dir}`;
  if(!exists(base)) failures.push(`Projeto ausente: ${dir}`);
  if(!exists(`${base}/README.md`)) failures.push(`README ausente: ${dir}`);
}
for(const dir of expected.slice(1)){
  const base=`frontend-projects/${dir}`;
  if(!exists(`${base}/package.json`)) failures.push(`package.json ausente: ${dir}`);
  else if(!JSON.parse(read(`${base}/package.json`)).scripts?.build) failures.push(`build script ausente: ${dir}`);
  if(!exists(`${base}/tsconfig.json`)) failures.push(`tsconfig ausente: ${dir}`);
}
const profile=read('README.md');
for(const dir of expected){if(!profile.includes(`frontend-projects/${dir}/`)) failures.push(`README principal sem link para ${dir}`)}
const brief=read('RECRUITER-BRIEF.md').toLowerCase();
if(!brief.includes('front-end')) failures.push('Recruiter Brief não está alinhado a Front-End');
if(!exists('SECURITY.md')) failures.push('SECURITY.md ausente');
if(!exists('frontend-projects/PROJECT-STANDARDS.md')) failures.push('Padrão de qualidade ausente');
const landing=read('frontend-projects/01-accessible-saas-landing/index.html');
if(!landing.includes('lang="pt-BR"')||!landing.includes('Pular para conteúdo')) failures.push('Landing perdeu requisitos básicos de acessibilidade');
if(failures.length){console.error('AUDITORIA FALHOU\n- '+failures.join('\n- '));process.exit(1)}
console.log(`AUDITORIA OK: ${expected.length} projetos, documentação, links, builds e controles estruturais presentes.`);
