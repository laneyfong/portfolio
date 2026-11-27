// dc-runtime.js — a small renderer for the portfolio's page templates.
//
// Each page and widget lives in src/site/pages/<Name>.dc.html. A file holds:
//   <x-dc> … </x-dc>   the markup, with {{ holes }}, <sc-if>, <sc-for>, <dc-import>
//   <helmet> … </helmet> (inside x-dc) styles and font links for that file
//   <script type="text/x-dc"> class Component extends DCLogic { renderVals() {…} } </script>
//
// This file turns that into React components, so the pages behave exactly as
// they did in the Claude design artifact:
//   {{ a.b }}                 dotted lookup into what renderVals() returns
//   attr="{{ x }}"            raw value (function, number, object)
//   attr="a {{ x }} b"        interpolated string
//   onClick="{{ fn }}"        React event handler
//   <sc-if value="{{ c }}">   render children when c is truthy
//   <sc-for list="{{ xs }}" as="x">  repeat children; {{ $index }} in scope
//   <dc-import name="Card" foo-bar="{{ v }}">  mount pages/Card.dc.html, props.fooBar = v
import React from 'react';

const sources = import.meta.glob('./pages/*.dc.html', { query: '?raw', import: 'default', eager: true });
const SRC = {};
for (const path in sources) SRC[path.replace(/^.*\/(.*)\.dc\.html$/, '$1')] = sources[path];

// ---------- parsing ----------
const HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
const WHOLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;

function literal(key) {
  if (key === 'true') return { v: true };
  if (key === 'false') return { v: false };
  if (key === 'null') return { v: null };
  if (/^-?\d+(\.\d+)?$/.test(key)) return { v: Number(key) };
  if (/^(['"]).*\1$/.test(key)) return { v: key.slice(1, -1) };
  return null;
}
function look(scope, key) {
  const lit = literal(key);
  if (lit) return lit.v;
  let v = scope;
  for (const part of key.split('.')) {
    if (v == null) return undefined;
    v = v[part];
  }
  return v;
}
function interp(str, scope) {
  return str.replace(HOLE, (_, k) => {
    const v = look(scope, k);
    return v == null || typeof v === 'function' ? '' : String(v);
  });
}
function value(str, scope) {
  const m = str.match(WHOLE);
  return m ? look(scope, m[1]) : (str.indexOf('{{') >= 0 ? interp(str, scope) : str);
}

// ---------- attribute mapping (HTML parser lowercases names) ----------
const EVENTS = 'Click DoubleClick MouseDown MouseUp MouseEnter MouseLeave MouseMove MouseOver MouseOut PointerDown PointerUp PointerMove PointerEnter PointerLeave PointerCancel TouchStart TouchEnd TouchMove KeyDown KeyUp KeyPress Focus Blur Change Input Submit Scroll Wheel ContextMenu AnimationEnd AnimationStart AnimationIteration TransitionEnd Load Error Ended Play Pause TimeUpdate LoadedData LoadedMetadata CanPlay DragStart Drag DragEnd DragOver Drop';
const EVENT_MAP = {};
EVENTS.split(' ').forEach((e) => { EVENT_MAP['on' + e.toLowerCase()] = 'on' + e; });
EVENT_MAP.ondblclick = 'onDoubleClick';
const ATTR_MAP = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength',
  minlength: 'minLength', autoplay: 'autoPlay', playsinline: 'playsInline', crossorigin: 'crossOrigin',
  srcset: 'srcSet', colspan: 'colSpan', rowspan: 'rowSpan', contenteditable: 'contentEditable',
  spellcheck: 'spellCheck', autocomplete: 'autoComplete', autofocus: 'autoFocus',
  disablepictureinpicture: 'disablePictureInPicture', enterkeyhint: 'enterKeyHint', inputmode: 'inputMode',
  frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen', novalidate: 'noValidate', datetime: 'dateTime',
  referrerpolicy: 'referrerPolicy', fetchpriority: 'fetchPriority', popovertarget: 'popoverTarget',
  'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace', 'xmlns:xlink': 'xmlnsXlink',
};
const BOOL = new Set(['autoPlay', 'loop', 'muted', 'playsInline', 'controls', 'disabled', 'checked', 'hidden', 'readOnly',
  'required', 'multiple', 'open', 'disablePictureInPicture', 'autoFocus', 'allowFullScreen', 'noValidate', 'selected', 'defer', 'async']);
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function attrName(n) {
  if (EVENT_MAP[n]) return EVENT_MAP[n];
  if (ATTR_MAP[n]) return ATTR_MAP[n];
  if (n.startsWith('data-') || n.startsWith('aria-')) return n;
  if (n.indexOf('-') > 0) return camel(n);
  return n;
}

const styleCache = new Map();
function parseStyle(css) {
  if (styleCache.has(css)) return styleCache.get(css);
  const out = {};
  // split on ; not inside parentheses or quotes
  let depth = 0, q = null, cur = '';
  const parts = [];
  for (const ch of css) {
    if (q) { if (ch === q) q = null; cur += ch; continue; }
    if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ';' && depth === 0) { parts.push(cur); cur = ''; continue; }
    cur += ch;
  }
  parts.push(cur);
  for (const p of parts) {
    const i = p.indexOf(':');
    if (i < 0) continue;
    const k = p.slice(0, i).trim();
    const v = p.slice(i + 1).trim();
    if (!k || v === '') continue;
    const key = k.startsWith('--') ? k : camel(k.startsWith('-webkit-') ? k.slice(1) : k.startsWith('-ms-') ? k.slice(1) : k)
      .replace(/^webkit/, 'Webkit').replace(/^ms/, 'ms');
    out[key] = v;
  }
  if (styleCache.size > 4000) styleCache.clear();
  styleCache.set(css, out);
  return out;
}

// video elements: React does not render the muted attribute, which autoplay needs
function videoRef(el) {
  if (!el || el.__dcv) return;
  el.__dcv = true;
  if (el.hasAttribute('data-dc-muted')) { el.muted = true; el.defaultMuted = true; }
  if (el.autoplay) { const p = el.play(); if (p && p.catch) p.catch(() => {}); }
}

// ---------- template -> React ----------
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

function renderChildren(nodes, scope, keyBase) {
  const out = [];
  for (let i = 0; i < nodes.length; i++) {
    const r = renderNode(nodes[i], scope, keyBase + '.' + i);
    if (r == null || r === '') continue;
    if (Array.isArray(r)) out.push(...r); else out.push(r);
  }
  return out;
}

function renderNode(node, scope, key) {
  if (node.nodeType === 3) {
    const t = node.nodeValue;
    if (t.indexOf('{{') < 0) return t;
    const m = t.match(WHOLE);
    if (m) {
      const v = look(scope, m[1]);
      if (v == null || typeof v === 'function' || typeof v === 'boolean') return null;
      return String(v);
    }
    return interp(t, scope);
  }
  if (node.nodeType !== 1) return null;
  const tag = node.localName;

  if (tag === 'sc-if') {
    const on = value(node.getAttribute('value') || '', scope);
    return on ? React.createElement(React.Fragment, { key }, ...renderChildren(node.childNodes, scope, key)) : null;
  }
  if (tag === 'sc-for') {
    const list = value(node.getAttribute('list') || '', scope) || [];
    const as = node.getAttribute('as') || 'item';
    const arr = Array.isArray(list) ? list : Array.from(list);
    return arr.map((item, idx) => {
      const s = Object.create(scope);
      s[as] = item; s.$index = idx;
      return React.createElement(React.Fragment, { key: key + ':' + idx }, ...renderChildren(node.childNodes, s, key + ':' + idx));
    });
  }
  if (tag === 'dc-import') {
    const props = { key };
    let name = null;
    for (const a of Array.from(node.attributes)) {
      if (a.name === 'name') { name = a.value; continue; }
      if (a.name.startsWith('hint-')) continue;
      props[camel(a.name)] = value(a.value, scope);
    }
    return React.createElement(getComponent(name), props);
  }
  if (tag === 'helmet' || tag === 'script') return null;

  const props = { key };
  let style = null;
  for (const a of Array.from(node.attributes)) {
    if (a.name.startsWith('hint-')) continue;
    const name = attrName(a.name);
    let v = value(a.value, scope);
    if (name === 'style') { style = typeof v === 'string' ? v : ''; continue; }
    if (BOOL.has(name)) {
      if (v === 'false' || v === false || v == null) continue;
      v = true;
    }
    if (name.startsWith('on') && typeof v !== 'function') continue;
    props[name] = v;
  }
  if (style) props.style = parseStyle(style);
  if (tag === 'video') {
    if (props.muted) props['data-dc-muted'] = '';
    const userRef = props.ref;
    props.ref = userRef ? (el) => { videoRef(el); typeof userRef === 'function' ? userRef(el) : (userRef.current = el); } : videoRef;
  }
  if ('value' in props && !props.onChange && !props.onInput && (tag === 'input' || tag === 'textarea' || tag === 'select')) {
    props.defaultValue = props.value; delete props.value;
  }
  if ('checked' in props && !props.onChange && tag === 'input') { props.defaultChecked = props.checked; delete props.checked; }
  if (VOID.has(tag)) return React.createElement(tag, props);
  const kids = renderChildren((tag === 'template' ? node.content : node).childNodes, scope, key);
  return React.createElement(tag, props, ...kids);
}

// ---------- helmet (per-file <style>/<link>) ----------
const helmetUse = {};
function mountHelmet(name, html) {
  helmetUse[name] = (helmetUse[name] || 0) + 1;
  if (helmetUse[name] > 1 || !html.trim()) return;
  const box = document.createElement('div');
  box.innerHTML = html;
  for (const el of Array.from(box.children)) {
    el.setAttribute('data-dc-helmet', name);
    document.head.appendChild(el);
  }
}
function unmountHelmet(name) {
  helmetUse[name]--;
  if (helmetUse[name] > 0) return;
  document.querySelectorAll('[data-dc-helmet="' + name + '"]').forEach((el) => el.remove());
}

// ---------- components ----------
export class DCLogic extends React.Component {}

const cache = {};
export function getComponent(name) {
  if (cache[name]) return cache[name];
  const src = SRC[name];
  if (!src) {
    console.warn('[dc] missing component', name);
    cache[name] = () => null;
    return cache[name];
  }
  const doc = new DOMParser().parseFromString('<!doctype html><html><body>' + src.slice(src.indexOf('<x-dc>'), src.indexOf('</x-dc>') + 7) + '</body></html>', 'text/html');
  const xdc = doc.body.querySelector('x-dc');
  const helmet = xdc.querySelector(':scope > helmet');
  const helmetHtml = helmet ? helmet.innerHTML : '';
  if (helmet) helmet.remove();
  const nodes = Array.from(xdc.childNodes);

  const m = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
  let Logic;
  try {
    Logic = new Function('DCLogic', 'React', (m ? m[1] : 'class Component extends DCLogic { renderVals() { return {}; } }') + '\n;return Component;')(DCLogic, React);
  } catch (err) {
    console.error('[dc] script error in', name, err);
    Logic = class extends DCLogic { renderVals() { return {}; } };
  }

  class Rendered extends Logic {
    render() {
      const vals = (this.renderVals ? this.renderVals() : {}) || {};
      const kids = renderChildren(nodes, vals, name);
      return kids.length === 1 ? kids[0] : React.createElement(React.Fragment, null, ...kids);
    }
  }
  Rendered.displayName = name;
  // helmet styles go in during the first render, before anything paints or measures
  const Wrapped = React.forwardRef(function DC(props, ref) {
    const on = React.useRef(false);
    if (!on.current) { on.current = true; mountHelmet(name, helmetHtml); }
    React.useEffect(() => () => { unmountHelmet(name); on.current = false; }, []);
    return React.createElement(Rendered, { ...props, ref });
  });
  Wrapped.displayName = 'DC(' + name + ')';
  cache[name] = Wrapped;
  return Wrapped;
}
