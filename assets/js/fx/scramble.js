import { Huina } from '../config.js';
import { randomGlyph } from '../random.js';

export class ScrambleFx {
  constructor(el, { text, splitAt, frames }) {
    this.el = el;
    this.text = text;
    this.splitAt = splitAt;
    this.totalFrames = frames ?? Huina.scramble.frames;
    this.rafId = null;
    this.head = null;
    this.tail = null;
  }

  init() {
    if (!this.el) return;
    this.el.addEventListener('mouseenter', () => this.play());
    this.el.addEventListener('click', () => this.play());
  }

  play() {
    this.stop();
    let frame = 0;

    const tick = () => {
      frame += 1;
      this._paint(frame < this.totalFrames ? this._renderFrame(frame) : this.text);
      if (frame < this.totalFrames) {
        this.rafId = requestAnimationFrame(tick);
      } else {
        this.rafId = null;
      }
    };

    this.rafId = requestAnimationFrame(tick);
  }

  stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  _renderFrame(frame) {
    let out = '';
    for (let i = 0; i < this.text.length; i++) {
      const char = this.text[i];
      out += char === '.' || char === ' ' || i < frame ? char : randomGlyph();
    }
    return out;
  }

  _paint(value) {
    if (!this.head) {
      this.el.replaceChildren();
      this.head = document.createElement('span');
      this.tail = document.createElement('i');
      this.el.append(this.head, this.tail);
    }
    this.head.textContent = value.slice(0, this.splitAt);
    this.tail.textContent = value.slice(this.splitAt);
  }
}
