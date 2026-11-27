// Entry point for laneyfong.com.
// Pages live in ./pages/*.dc.html (see dc-runtime.js for the template syntax).
import React from 'react';
import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import { getComponent } from './dc-runtime.js';

const ROUTES = {
  '/': { page: 'Home', title: 'Laney Fong — Product Designer' },
  '/about': { page: 'About', title: 'About — Laney Fong' },
  '/lab': { page: 'Lab', title: 'Lab — Laney Fong' },
  '/resume': { page: 'Resume', title: 'Resume — Laney Fong' },
};

function routeFor(path) {
  const p = path.replace(/\/+$/, '') || '/';
  return ROUTES[p] || ROUTES['/'];
}

function App() {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    // internal links (/about, /lab …) switch pages without a full reload
    const onClick = (ev) => {
      if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      const a = ev.target.closest && ev.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (!((url.pathname.replace(/\/+$/, '') || '/') in ROUTES)) return;
      if (url.pathname === window.location.pathname && url.hash) return; // same-page #anchor
      ev.preventDefault();
      window.history.pushState({}, '', url.pathname + url.hash);
      setPath(url.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const route = routeFor(path);
  React.useEffect(() => { document.title = route.title; }, [route]);
  return React.createElement(getComponent(route.page), { key: route.page });
}

createRoot(document.getElementById('root')).render(React.createElement(App));
try { inject(); } catch { /* analytics is optional */ }
