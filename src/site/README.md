# laneyfong.com — site source

The live site is everything in this folder plus `public/media/`.
(The older React components in `src/` are no longer used by `index.html`; they're kept for reference.)

## Where things are

| What | File |
| --- | --- |
| Index / case studies | `pages/Home.dc.html` |
| About (desk, envelope, music player) | `pages/About.dc.html` |
| Lab | `pages/Lab.dc.html` |
| Resume | `pages/Resume.dc.html` |
| Ask LLManey chat | `pages/AskLLManey.dc.html` |
| Lab experiments | `pages/ReadMore.dc.html`, `pages/Loader.dc.html`, `pages/NavBar.dc.html`, `pages/BlindBox.dc.html`, `pages/Confidence.dc.html` |
| Images and videos | `public/media/` (referenced as `/media/<file>`) |
| Page routes (`/`, `/about`, `/lab`, `/resume`) | `main.js` |
| Template renderer | `dc-runtime.js` |

## Page file format

Each `*.dc.html` file has three parts:

1. `<helmet>` — that page's CSS (and font links).
2. The markup, which can use:
   - `{{ name }}` / `{{ item.title }}` — values returned by `renderVals()` (dotted lookups only, no expressions)
   - `onClick="{{ handler }}"` — event handlers
   - `<sc-if value="{{ flag }}">…</sc-if>` — conditional
   - `<sc-for list="{{ items }}" as="item">…</sc-for>` — loop (`{{ $index }}` available)
   - `<dc-import name="ReadMore" preview="{{ true }}"></dc-import>` — embed another page file as a component
3. `<script type="text/x-dc">` — a class `Component extends DCLogic` (a React class component):
   `renderVals()` returns the values the markup uses; `this.state` / `this.setState`, `componentDidMount`, etc. work as in React.

Plain text and styles can be edited directly in the markup.

## Run

```
npm run dev       # local preview
npm run build     # production build (Vercel runs this)
```
