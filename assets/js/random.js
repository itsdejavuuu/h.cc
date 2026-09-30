import { Huina } from './config.js';

export function secureInt(max) {
  if (max < 2) return 0;
  const vault = globalThis.crypto;
  if (!vault || typeof vault.getRandomValues !== 'function') {
    return Math.floor(Math.random() * max);
  }
  const range = 0x100000000;
  const limit = range - (range % max);
  const buf = new Uint32Array(1);
  let x;
  do {
    vault.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

export function secureUnit() {
  const vault = globalThis.crypto;
  if (vault && typeof vault.getRandomValues === 'function') {
    const buf = new Uint32Array(1);
    vault.getRandomValues(buf);
    return buf[0] / 0x100000000;
  }
  return Math.random();
}

export function pickExcept(count, exclude) {
  if (count < 2) return 0;
  const i = secureInt(count - 1);
  return i >= exclude ? i + 1 : i;
}

export function randomGlyph() {
  return Huina.glyphs[secureInt(Huina.glyphs.length)];
}
