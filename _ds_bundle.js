/* @ds-bundle: {"format":3,"namespace":"LaneyDesignSystem_c5b37b","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"NavPill","sourcePath":"components/core/NavPill.jsx"},{"name":"ProjectCard","sourcePath":"components/core/ProjectCard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"bee7745f09a4","components/core/NavPill.jsx":"3a2a6c250e38","components/core/ProjectCard.jsx":"8509d8ffe8ee"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LaneyDesignSystem_c5b37b = window.LaneyDesignSystem_c5b37b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/**
 * Personal identity card for Laney Fong's portfolio.
 * White rounded card with decorative inset circle, muted role heading,
 * mixed-font tagline (Manrope + Playfair Display Italic for "human-centered"),
 * framed photo, and key info rows.
 */
function Badge({
  name = 'Laney Fong',
  role = 'Product Designer',
  tagline = 'curating intentional human-centered experiences.',
  location = 'San Francisco Bay Area',
  background = 'M.S HCI @ UCSC\nB.A. CogSci/Design @ UCBerkeley',
  description,
  photo,
  showCTA = false,
  onCTAClick
}) {
  const rows = description ? [{
    label: 'Name',
    value: name,
    large: true
  }, {
    label: 'Location',
    value: location
  }, {
    label: 'Description',
    value: description
  }] : [{
    label: 'Name',
    value: name,
    large: true
  }, {
    label: 'Location',
    value: location
  }, {
    label: 'Background',
    value: background
  }];

  // Split tagline so "human-centered" renders in Playfair Display Italic
  const parts = tagline.split(/(human-centered)/i);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 436,
      backgroundColor: 'var(--color-white)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-badge)',
      padding: '28px 47px 48px',
      fontFamily: 'var(--font-sans)',
      position: 'relative',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 28,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 28,
      height: 28,
      borderRadius: '50%',
      backgroundColor: 'var(--color-white)',
      boxShadow: 'var(--shadow-inset-circle)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '56px 0 8px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--font-medium)',
      fontSize: 'var(--text-2xl)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--color-muted)',
      lineHeight: 'var(--leading-none)'
    }
  }, role), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 24px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--font-light)',
      fontSize: 'var(--text-md)',
      color: 'var(--text-primary)',
      lineHeight: 'var(--leading-none)'
    }
  }, parts.map((part, i) => /human-centered/i.test(part) ? /*#__PURE__*/React.createElement("em", {
    key: i,
    style: {
      fontFamily: 'var(--font-serif-italic)',
      fontStyle: 'italic',
      fontWeight: 400
    }
  }, part) : part)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 213,
      height: 252,
      margin: '0 auto',
      backgroundImage: photo ? `url(${photo})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: photo ? 'transparent' : 'var(--surface-card)',
      boxShadow: 'var(--shadow-image-frame)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, rows.map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 48,
      minHeight: row.large ? 41 : 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 90,
      flexShrink: 0,
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--font-light)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-primary)',
      lineHeight: 'var(--leading-none)',
      paddingTop: row.large ? 10 : 0
    }
  }, row.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: row.large ? 'var(--font-medium)' : 'var(--font-light)',
      fontSize: row.large ? 'var(--text-2xl)' : 'var(--text-base)',
      letterSpacing: 'var(--tracking-tight)',
      color: row.large ? 'var(--color-muted)' : 'var(--text-primary)',
      lineHeight: 'var(--leading-none)',
      whiteSpace: 'pre-line'
    }
  }, row.value)))), showCTA && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCTAClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '4px 6px',
      borderRadius: 'var(--radius-full)',
      border: '0.5px solid rgba(40,41,43,0.8)',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--font-light)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-black)',
      lineHeight: 1
    }
  }, "View work", /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      border: '0.5px solid #000',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 8,
    height: 9,
    viewBox: "0 0 8.271 8.974",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8.271 4.838 L 4.135 8.974 L 0 4.838 L 0.396 4.443 L 3.854 7.901 L 3.854 0 L 4.417 0 L 4.417 7.901 L 7.875 4.443 L 8.271 4.838 Z",
    fillRule: "nonzero"
  }))))));
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/NavPill.jsx
try { (() => {
/**
 * Floating frosted-glass navigation pill for the portfolio header.
 * Active item gets a white ring border; others render muted.
 */
function NavPill({
  items = ['Work', 'About', 'Lab', 'Resume'],
  active = 'Work',
  onSelect
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      borderRadius: 'var(--radius-full)',
      backgroundColor: 'var(--color-nav-bg)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      padding: '7px 14px'
    }
  }, items.map(item => {
    const isActive = item === active;
    return /*#__PURE__*/React.createElement("button", {
      key: item,
      onClick: () => onSelect?.(item),
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--font-regular)',
        fontSize: 'var(--text-md)',
        color: isActive ? 'var(--color-nav-active)' : 'var(--color-muted)',
        backgroundColor: 'transparent',
        border: isActive ? '1px solid rgba(255,255,255,1)' : '1px solid transparent',
        borderRadius: 'var(--radius-full)',
        padding: '4px 12px',
        cursor: 'pointer',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        transition: 'color 0.15s ease, border-color 0.15s ease'
      }
    }, item);
  }));
}
Object.assign(__ds_scope, { NavPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/NavPill.jsx", error: String((e && e.message) || e) }); }

// components/core/ProjectCard.jsx
try { (() => {
/**
 * Portfolio work item card.
 * portrait  — tall card with centered phone screenshot.
 * landscape — wide card with right-aligned UI screenshot.
 */
function ProjectCard({
  logo,
  logoAlt = '',
  screenshot,
  caption = '',
  captionItalic = false,
  layout = 'portrait',
  href,
  height
}) {
  const isPortrait = layout === 'portrait';
  const cardHeight = height || (isPortrait ? 717 : 506);
  const inner = /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: 'var(--surface-card)',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      height: cardHeight
    }
  }, logo && /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: logoAlt,
    style: {
      position: 'absolute',
      top: 27,
      left: 23,
      height: 24,
      width: 'auto',
      objectFit: 'contain'
    }
  }), screenshot && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      ...(isPortrait ? {
        left: '50%',
        transform: 'translateX(-50%)',
        top: 84,
        width: 233,
        height: 518,
        borderRadius: 30
      } : {
        right: 27,
        top: 27,
        width: '58%',
        height: 'calc(100% - 54px)',
        borderRadius: 16
      }),
      backgroundImage: `url(${screenshot})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: 'var(--shadow-card)'
    }
  }), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: isPortrait ? 36 : 80,
      left: 23,
      width: 267,
      fontFamily: captionItalic ? 'var(--font-serif-italic)' : 'var(--font-sans)',
      fontStyle: captionItalic ? 'italic' : 'normal',
      fontWeight: 'var(--font-regular)',
      fontSize: 'var(--text-md)',
      color: 'var(--text-primary)',
      lineHeight: 'var(--leading-snug)'
    }
  }, caption));
  if (href) {
    return /*#__PURE__*/React.createElement("a", {
      href: href,
      style: {
        display: 'block',
        textDecoration: 'none',
        width: '100%'
      }
    }, inner);
  }
  return inner;
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProjectCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.NavPill = __ds_scope.NavPill;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

})();
