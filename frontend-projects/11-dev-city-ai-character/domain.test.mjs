import test from 'node:test';
import assert from 'node:assert/strict';

import {
  MAX_FILE_SIZE,
  createAvatarDataUrl,
  getGeneratedImageSource,
  validateImageMeta,
} from './domain.mjs';

test('aceita PNG, JPG e WEBP dentro do limite', () => {
  for (const type of ['image/png', 'image/jpeg', 'image/webp']) {
    assert.equal(validateImageMeta({ type, size: 1024 }), null);
  }
});

test('rejeita tipo de arquivo não suportado', () => {
  assert.equal(validateImageMeta({ type: 'image/gif', size: 1024 }), 'Use uma imagem PNG, JPG ou WEBP.');
});

test('rejeita imagem acima de 8 MB', () => {
  assert.equal(
    validateImageMeta({ type: 'image/png', size: MAX_FILE_SIZE + 1 }),
    'A imagem deve ter no máximo 8 MB.',
  );
});

test('extrai URL de resposta string ou objeto', () => {
  assert.equal(getGeneratedImageSource('https://example.com/a.png'), 'https://example.com/a.png');
  assert.equal(getGeneratedImageSource({ src: 'data:image/png;base64,abc' }), 'data:image/png;base64,abc');
});

test('rejeita resposta vazia do serviço de IA', () => {
  assert.throws(() => getGeneratedImageSource({ src: '' }), /resposta inesperada/);
});

test('gera avatar local como data URL SVG', () => {
  const value = createAvatarDataUrl({ initials: 'AVA', colors: ['#111111', '#ffffff'] });
  assert.match(value, /^data:image\/svg\+xml;charset=UTF-8,/);
  assert.match(decodeURIComponent(value), /AVA/);
});
