export const MAX_FILE_SIZE = 8 * 1024 * 1024;
export const ACCEPTED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);

export function validateImageMeta(file) {
  if (!file) return 'Nenhum arquivo foi selecionado.';
  if (!ACCEPTED_TYPES.has(file.type)) return 'Use uma imagem PNG, JPG ou WEBP.';
  if (file.size > MAX_FILE_SIZE) return 'A imagem deve ter no máximo 8 MB.';
  return null;
}

export function getGeneratedImageSource(result) {
  if (typeof result === 'string' && result.trim()) return result;
  if (result && typeof result === 'object' && typeof result.src === 'string' && result.src.trim()) {
    return result.src;
  }
  throw new Error('O serviço de IA retornou uma resposta inesperada.');
}

export function createAvatarSvg({ initials, colors }) {
  if (!initials || !Array.isArray(colors) || colors.length < 2) {
    throw new Error('Configuração de avatar inválida.');
  }

  return `
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
}

export function createAvatarDataUrl(config) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(createAvatarSvg(config))}`;
}
