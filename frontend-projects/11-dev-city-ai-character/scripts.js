import { createAvatarDataUrl, getGeneratedImageSource, validateImageMeta } from './domain.mjs';

const characters = {
  ava: { name: 'Ava', accent: '#ff3cac', initials: 'AVA', colors: ['#ff3cac', '#f8a5ff'] },
  rio: { name: 'Rio', accent: '#00b2c9', initials: 'RIO', colors: ['#00b2c9', '#8ef1ff'] },
  neo: { name: 'Neo', accent: '#7ed37e', initials: 'NEO', colors: ['#7ed37e', '#e2ff91'] },
};

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result)));
    reader.addEventListener('error', () => reject(new Error('Não foi possível ler a imagem selecionada.')));
    reader.readAsDataURL(file);
  });
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
    const validationError = validateImageMeta(file);
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
