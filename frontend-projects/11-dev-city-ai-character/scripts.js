const characters = {
  ava: { name: 'Ava', accent: '#ff3cac', initials: 'AVA', colors: ['#ff3cac', '#f8a5ff'] },
  rio: { name: 'Rio', accent: '#00b2c9', initials: 'RIO', colors: ['#00b2c9', '#8ef1ff'] },
  neo: { name: 'Neo', accent: '#7ed37e', initials: 'NEO', colors: ['#7ed37e', '#e2ff91'] },
};

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);

function createAvatarDataUrl({ initials, colors }) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 760" role="img">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${colors[0]}"/>
          <stop offset="1" stop-color="${colors[1]}"/>
        </linearGradient>
      </defs>
      <circle cx="300" cy="235" r="128" fill="url(#bg)"/>
      <path d="M92 742c18-184 96-285 208-285s190 101 208 285" fill="url(#bg)"/>
      <circle cx="255" cy="222" r="12" fill="#071018"/>
      <circle cx="345" cy="222" r="12" fill="#071018"/>
      <path d="M250 294c28 20 72 20 100 0" fill="none" stroke="#071018" stroke-width="12" stroke-linecap="round"/>
      <text x="300" y="665" text-anchor="middle" fill="#071018" font-family="Arial, sans-serif" font-size="74" font-weight="800">${initials}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result)));
    reader.addEventListener('error', () => reject(new Error('Não foi possível ler a imagem selecionada.')));
    reader.readAsDataURL(file);
  });
}

function getGeneratedImageSource(result) {
  if (typeof result === 'string') return result;
  if (result && typeof result === 'object' && 'src' in result && typeof result.src === 'string') return result.src;
  throw new Error('O serviço de IA retornou uma resposta inesperada.');
}

function validateImage(file) {
  if (!file) return 'Nenhum arquivo foi selecionado.';
  if (!ACCEPTED_TYPES.has(file.type)) return 'Use uma imagem PNG, JPG ou WEBP.';
  if (file.size > MAX_FILE_SIZE) return 'A imagem deve ter no máximo 8 MB.';
  return null;
}

function init() {
  const nameElement = document.querySelector('[data-character-name]');
  const artElement = document.querySelector('[data-character-art]');
  const buttons = [...document.querySelectorAll('[data-character]')];
  const input = document.querySelector('#photo-input');
  const status = document.querySelector('[data-status]');
  const uploadLabel = document.querySelector('[data-upload-label]');
  const uploadButton = document.querySelector('.upload-button');

  if (!nameElement || !artElement || !input || !status || !uploadLabel || !uploadButton) return;

  function setStatus(message, kind = 'info') {
    status.textContent = message;
    status.dataset.kind = kind;
  }

  function setBusy(isBusy) {
    input.disabled = isBusy;
    uploadButton.dataset.busy = String(isBusy);
    uploadLabel.textContent = isBusy ? 'Gerando personagem…' : 'Escolher foto';
  }

  function selectCharacter(key) {
    const selected = characters[key];
    if (!selected) return;

    document.documentElement.style.setProperty('--accent', selected.accent);
    nameElement.textContent = selected.name;
    artElement.src = createAvatarDataUrl(selected);
    artElement.alt = `Personagem ${selected.name}, selecionada`;

    for (const button of buttons) {
      const active = button.dataset.character === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    }

    setStatus(`${selected.name} selecionada.`);
  }

  async function transformPhoto(file) {
    const validationError = validateImage(file);
    if (validationError) {
      setStatus(validationError, 'error');
      return;
    }

    if (!globalThis.puter?.ai?.txt2img) {
      setStatus('O serviço de IA não está disponível neste navegador agora. Os personagens locais continuam funcionando.', 'error');
      return;
    }

    setBusy(true);
    setStatus('Preparando sua foto para transformação…');

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setStatus('Gerando uma versão estilizada com IA…');

      const generated = await globalThis.puter.ai.txt2img(
        'Transforme esta pessoa em um personagem original de videogame com ilustração editorial, contorno expressivo, cores vibrantes, enquadramento de meio corpo e fundo transparente. Preserve características faciais reconhecíveis sem copiar personagens, franquias ou estilos protegidos específicos.',
        {
          provider: 'openai',
          model: 'gpt-image-2.5-flare',
          quality: 'medium',
          input_image: dataUrl,
          input_image_mime_type: file.type,
        },
      );

      const source = getGeneratedImageSource(generated);
      document.documentElement.style.setProperty('--accent', '#ffd319');
      nameElement.textContent = 'Você';
      artElement.src = source;
      artElement.alt = 'Versão estilizada da foto enviada pelo usuário';

      for (const button of buttons) {
        button.classList.remove('is-active');
        button.setAttribute('aria-pressed', 'false');
      }

      setStatus('Personagem gerado com sucesso.', 'success');
    } catch (error) {
      console.error(error);
      setStatus('Não foi possível gerar a imagem. Tente novamente ou continue usando os personagens locais.', 'error');
    } finally {
      setBusy(false);
      input.value = '';
    }
  }

  for (const button of buttons) {
    button.addEventListener('click', () => selectCharacter(button.dataset.character));
  }

  input.addEventListener('change', () => transformPhoto(input.files?.[0]));
  selectCharacter('ava');
}

document.addEventListener('DOMContentLoaded', init);
