import { pickExcept } from '../random.js';

const FRAMES = [':)', ':D', 'xD', ':P', ';)', ':O', ':3', '8===D', '<3'];

export class TabTitle {
  constructor() {
    this.originalTitle = document.title;
    this.timerId = null;
    this.frame = 0;
  }

  init() {
    window.addEventListener('blur', () => this._start());
    window.addEventListener('focus', () => this._stop());
  }

  _start() {
    this._stop();
    this.frame = 0;
    this._tick();
    this.timerId = setInterval(() => this._tick(), 450);
  }

  _stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    document.title = this.originalTitle;
  }

  _tick() {
    this.frame = pickExcept(FRAMES.length, this.frame);
    document.title = FRAMES[this.frame];
  }
}
