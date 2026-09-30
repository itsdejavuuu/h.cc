const pad = (n) => String(n).padStart(2, '0');

export class Clock {
  constructor(el) {
    this.el = el;
    this.timerId = null;
  }

  init() {
    if (!this.el) return;
    const now = new Date();
    this._paint(now);
    this.timerId = setTimeout(() => {
      this._tick();
      this.timerId = setInterval(() => this._tick(), 1000);
    }, 1000 - now.getMilliseconds());
  }

  stop() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  _tick() {
    this._paint(new Date());
  }

  _paint(now) {
    this.el.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
}
