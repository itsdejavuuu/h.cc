import { Huina } from './config.js';
import { stack, projects, contacts } from './data.js';
import { renderStack, renderProjects, renderContacts } from './render.js';
import { ScrambleFx } from './fx/scramble.js';
import { Typewriter } from './fx/typewriter.js';
import { TabTitle } from './fx/tab-title.js';
import { Clock } from './fx/clock.js';

function init() {
  renderStack(stack);
  renderProjects(projects);
  renderContacts(contacts);

  new ScrambleFx(document.getElementById('logo'), {
    text: 'deja vu',
    splitAt: 4,
    frames: Huina.scramble.frames,
  }).init();

  new Typewriter(document.getElementById('tagline'), Huina.typewriter).init();
  new TabTitle().init();
  new Clock(document.getElementById('clock')).init();
}

document.addEventListener('DOMContentLoaded', init);
