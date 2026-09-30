const SVG_NS = 'http://www.w3.org/2000/svg';

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

function externalLink(cls, href) {
  const a = el('a', cls);
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  return a;
}

function svgIcon(icon) {
  if (icon.kind === 'raw') {
    const tpl = document.createElement('template');
    tpl.innerHTML = icon.svg.trim();
    const node = tpl.content.firstElementChild;
    if (icon.cls && node) node.setAttribute('class', icon.cls);
    return node || el('span');
  }
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', icon.viewBox);
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', icon.d);
  svg.appendChild(path);
  return svg;
}

function mount(id) {
  const node = document.getElementById(id);
  if (node) node.replaceChildren();
  return node;
}

export function renderStack(stack) {
  const root = mount('stack');
  if (!root) return;
  const frag = document.createDocumentFragment();
  for (const item of stack) {
    const a = externalLink('tile', item.href);
    a.title = item.title;
    a.appendChild(el('span', null, item.label));
    frag.appendChild(a);
  }
  root.appendChild(frag);
}

export function renderProjects(projects) {
  const root = mount('projects');
  if (!root) return;
  const frag = document.createDocumentFragment();
  for (const p of projects) {
    const a = externalLink('proj', p.href);
    a.append(el('span', 'proj-name', p.name), el('span', 'proj-desc', p.desc));
    a.setAttribute('aria-label', `${p.name} — ${p.desc}`);
    frag.appendChild(a);
  }
  root.appendChild(frag);
}

export function renderContacts(contacts) {
  const root = mount('contacts');
  if (!root) return;
  const frag = document.createDocumentFragment();
  for (const c of contacts) {
    const a = externalLink('contact', c.href);
    if (c.icon) a.appendChild(svgIcon(c.icon));
    a.appendChild(el('span', 'contact-label', c.label));
    a.appendChild(el('span', 'bar', null));
    frag.appendChild(a);
  }
  root.appendChild(frag);
}
