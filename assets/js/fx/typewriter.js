import { secureInt, secureUnit, pickExcept } from '../random.js';

export class Typewriter {
  constructor(el, { phrases, typeMs, deleteMs, holdMs, startDelayMs }) {
    this.el = el;
    this.phrases = phrases;
    this.typeMs = typeMs ?? 55;
    this.deleteMs = deleteMs ?? 28;
    this.holdMs = holdMs ?? 1800;
    this.startDelayMs = startDelayMs ?? 600;
    this.timerId = null;
  }

  init() {
    if (!this.el || !this.phrases.length) return;

    this.el.replaceChildren();

    this.textNode = document.createElement('span');
    this.caret = document.createElement('span');
    this.caret.className = 'type-caret';
    this.caret.textContent = '_';
    this.caret.setAttribute('aria-hidden', 'true');

    this.el.append(this.textNode, this.caret);

    this._wait(this.startDelayMs, () => this._typePhrase(secureInt(this.phrases.length)));
  }

  stop() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  _typePhrase(index) {
    const phrase = this.phrases[index];
    let i = 0;

    const tick = () => {
      if (document.hidden) {
        this._wait(1000, tick);
        return;
      }
      i += 1;
      this.textNode.textContent = phrase.slice(0, i);
      if (i < phrase.length) {
        this._wait(this._jitter(this.typeMs), tick);
      } else {
        this._wait(this.holdMs, () => this._deletePhrase(index));
      }
    };

    tick();
  }

  _deletePhrase(index) {
    const phrase = this.phrases[index];
    let i = phrase.length;

    const tick = () => {
      if (document.hidden) {
        this._wait(1000, tick);
        return;
      }
      i -= 1;
      this.textNode.textContent = phrase.slice(0, Math.max(i, 0));
      if (i > 0) {
        this._wait(this._jitter(this.deleteMs), tick);
      } else {
        this._typePhrase(pickExcept(this.phrases.length, index));
      }
    };

    tick();
  }

  _wait(ms, fn) {
    this.stop();
    this.timerId = setTimeout(fn, ms);
  }

  _jitter(base) {
    return base + Math.floor(secureUnit() * base * 0.6);
  }
}
