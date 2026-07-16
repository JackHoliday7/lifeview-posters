import { Suspense, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { findPoster, posters } from "./posters.js";

// The site is a slide deck: `/` opens on the framework map (slide 1), swipe
// left/right (or trackpad-scroll, or arrow keys, or the faint edge arrows)
// to advance/reverse, wrapping around. Long-press any poster to jump back to
// the framework map; on the framework map, long-press an item to jump to
// that poster (wired inside LifeViewFramework.jsx via window.__lvNav).
//
// The posters were composed for portrait-mounted (9:16) TVs — natively
// 1080x1920. All their internal sizing is vw/vh-based, which resolves against
// the browser window, so they can't simply be wrapped in a narrower container.
// Instead they render inside an iframe (vw/vh resolve against the iframe
// viewport), which is then scaled to the screen. Three display modes:
//
//  - Clearly-landscape screens: native 1080x1920 frame, fit to height, left.
//  - Exact 9:16 portrait (a fullscreen portrait TV): native frame, full-bleed.
//  - Other portrait / near-square screens: "flow" frame — phone-scale layout
//    magnified to the full width, natural height, page scrolls (readable).
//  - Touch devices render directly; the mobile CSS in index.css handles them.
const DESIGN_W = 1080;
const DESIGN_H = 1920;
const FLOW_W = 420; // layout width of the readable "flow" rendering
const MAX_FLOW_SCALE = 1.9; // cap magnification so wide-ish windows don't get clown-sized type

// Union of every Google Font family used across the 16 posters. The iframe is
// a separate document, so it needs its own font links (the posters' own
// useEffect font injection targets the parent document).
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Bebas+Neue&family=Caveat:wght@400;500;600;700&family=Cinzel:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&family=Rock+Salt&family=Tangerine:wght@400;700&family=UnifrakturMaguntia&display=swap";

const SWIPE_MIN = 60; // px of horizontal travel to count as a swipe
const LP_MS = 550; // long-press duration
const LP_TOL = 12; // px of movement that cancels a long-press

// first-visit gesture hint: shows after HINT_DELAY of no navigation, then
// stays away for HINT_TTL. Every navigation re-stamps the clock, so anyone
// who actually uses the deck never sees it again.
const HINT_KEY = "lv-hint-seen";
const HINT_TTL = 30 * 24 * 3600 * 1000; // a month
const HINT_DELAY = 15000;

function hintAlreadySeen() {
  try {
    const t = +localStorage.getItem(HINT_KEY);
    return !!t && Date.now() - t < HINT_TTL;
  } catch {
    return true; // storage unavailable — never nag
  }
}

function markHintSeen() {
  try {
    localStorage.setItem(HINT_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

// Attach swipe / long-press / horizontal-wheel / arrow-key navigation to an
// event target (the parent stage, or an iframe's document). Returns a detach
// function. Handlers call through to window.__lvNav so they always see the
// current slide.
function attachGestures(target, { longPressHome }) {
  let active = false;
  let startX = 0;
  let startY = 0;
  let lpTimer = null;
  let lastTouchDown = 0;
  let wheelAcc = 0;
  let wheelLock = 0;

  const nav = () => window.__lvNav || {};
  const clearLp = () => {
    if (lpTimer) {
      clearTimeout(lpTimer);
      lpTimer = null;
    }
  };

  const down = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.pointerType !== "mouse") lastTouchDown = Date.now();
    active = true;
    startX = e.clientX;
    startY = e.clientY;
    clearLp();
    if (longPressHome) {
      lpTimer = setTimeout(() => {
        lpTimer = null;
        if (active) nav().home?.();
      }, LP_MS);
    }
  };
  const move = (e) => {
    if (!active) return;
    if (Math.abs(e.clientX - startX) > LP_TOL || Math.abs(e.clientY - startY) > LP_TOL) {
      clearLp();
    }
  };
  const up = (e) => {
    if (!active) return;
    active = false;
    clearLp();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > 2 * Math.abs(dy)) {
      if (dx < 0) nav().next?.();
      else nav().prev?.();
    }
  };
  const cancel = () => {
    active = false;
    clearLp();
  };
  const wheel = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    const now = Date.now();
    if (now < wheelLock) return;
    wheelAcc += e.deltaX;
    if (Math.abs(wheelAcc) > 120) {
      wheelLock = now + 500;
      const dir = wheelAcc > 0 ? 1 : -1;
      wheelAcc = 0;
      if (dir > 0) nav().next?.();
      else nav().prev?.();
    }
  };
  const key = (e) => {
    if (e.key === "ArrowRight") nav().next?.();
    else if (e.key === "ArrowLeft") nav().prev?.();
  };
  const ctx = (e) => {
    // suppress the touch long-press context menu, but leave mouse
    // right-click alone
    if (Date.now() - lastTouchDown < 1000) e.preventDefault();
  };

  target.addEventListener("pointerdown", down);
  target.addEventListener("pointermove", move);
  target.addEventListener("pointerup", up);
  target.addEventListener("pointercancel", cancel);
  target.addEventListener("wheel", wheel, { passive: true });
  target.addEventListener("keydown", key);
  target.addEventListener("contextmenu", ctx);
  return () => {
    target.removeEventListener("pointerdown", down);
    target.removeEventListener("pointermove", move);
    target.removeEventListener("pointerup", up);
    target.removeEventListener("pointercancel", cancel);
    target.removeEventListener("wheel", wheel);
    target.removeEventListener("keydown", key);
    target.removeEventListener("contextmenu", ctx);
  };
}

function useViewport() {
  // clientWidth/Height exclude scrollbars — sizing to innerWidth causes a
  // sliver of horizontal scroll whenever the vertical scrollbar is visible
  const read = () => ({
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
  });
  const [size, setSize] = useState(read);
  useEffect(() => {
    const fn = () => setSize(read);
    window.addEventListener("resize", fn);
    // a scrollbar appearing/disappearing changes clientWidth without firing
    // a window resize event — watch the root element's box too
    const ro = new ResizeObserver(fn);
    ro.observe(document.documentElement);
    // one delayed re-read in case layout (scrollbar gutter, late styles)
    // settles after the initial render
    const t = setTimeout(fn, 150);
    return () => {
      window.removeEventListener("resize", fn);
      ro.disconnect();
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return size;
}

function Loading({ poster }) {
  return (
    <div className="poster-loading">
      <div className="spinner" />
      <div className="poster-loading-title">{poster.title}</div>
      {poster.heavy && (
        <div className="poster-loading-note">
          Full-resolution artwork — one moment
        </div>
      )}
    </div>
  );
}

// Writes the iframe document, mounts the poster in it as its own React root,
// and wires deck gestures inside the iframe (its events don't reach the
// parent). extraCss lets the flow mode relax the poster's fixed-viewport
// sizing.
function usePosterFrame(iframeRef, poster, extraCss, onMounted) {
  const { Component } = poster;
  useEffect(() => {
    const doc = iframeRef.current.contentDocument;
    doc.open();
    doc.write(
      `<!doctype html><html><head><meta charset="utf-8">` +
        `<link rel="preconnect" href="https://fonts.googleapis.com">` +
        `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` +
        `<link href="${FONTS_HREF}" rel="stylesheet">` +
        `<style>html,body{margin:0;padding:0;background:#0a0a0f}` +
        `body{touch-action:pan-y;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}` +
        `.load{height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;` +
        `color:rgba(201,168,76,0.7);font:italic 300 44px 'Cormorant Garamond',Georgia,serif}` +
        (extraCss || "") +
        `</style></head><body><div id="poster-root"></div></body></html>`
    );
    doc.close();
    const root = createRoot(doc.getElementById("poster-root"));
    root.render(
      <Suspense fallback={<div className="load">{poster.title}&nbsp;&hellip;</div>}>
        <Component />
      </Suspense>
    );
    const detachGestures = attachGestures(doc, {
      // on the framework map, per-item long-press (inside the component)
      // navigates — the generic jump-home long-press stays off
      longPressHome: poster.slug !== posters[0].slug,
    });
    const cleanup = onMounted ? onMounted(doc) : undefined;
    // unmount must be deferred — React forbids unmounting synchronously
    // from inside an effect cleanup of the parent tree
    return () => {
      detachGestures();
      if (cleanup) cleanup();
      setTimeout(() => root.unmount(), 0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Component]);
}

// Native 1080x1920 rendering, scaled to the screen.
function PortraitFrame({ poster, w, h }) {
  const iframeRef = useRef(null);
  // Landscape: fit to viewport height, hug left. Portrait 9:16 TV: fill the
  // width, which is exactly full-bleed.
  const scale = w >= h ? h / DESIGN_H : w / DESIGN_W;
  usePosterFrame(iframeRef, poster, "html,body{overflow:hidden}");

  return (
    <div
      className="poster-frame-box"
      style={{
        width: Math.round(DESIGN_W * scale),
        height: Math.round(DESIGN_H * scale),
        overflow: "hidden",
      }}
    >
      <iframe
        ref={iframeRef}
        title={poster.title}
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          border: 0,
          display: "block",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}

// Readable rendering for portrait monitors: the poster lays out at phone
// width (its fixed 100vh sizing relaxed so it flows to natural height), and
// the whole thing is magnified to fill the screen width. The page scrolls.
function FlowFrame({ poster, w }) {
  const iframeRef = useRef(null);
  const [contentH, setContentH] = useState(600);
  // lay out at phone width and magnify to fill the screen, but cap the
  // magnification — on wider windows the layout column widens instead of the
  // type growing without bound. Never lay out wider than the screen itself
  // (windows narrower than FLOW_W get the plain phone rendering, unmagnified).
  const layoutW = Math.min(w, Math.max(FLOW_W, Math.round(w / MAX_FLOW_SCALE)));
  const scale = w / layoutW;

  usePosterFrame(
    iframeRef,
    poster,
    // relax the poster root's fixed-viewport canvas so content flows
    `#poster-root>*{height:auto !important;overflow:visible !important;}`,
    (doc) => {
      const measure = () => {
        const next = doc.body.scrollHeight;
        // only grow: content with animated/rotating text (e.g. the framework
        // map's script panel) changes height; growing monotonically lets the
        // height settle instead of jiggling the page
        if (next > 0) setContentH((prev) => (next > prev + 1 ? next : prev));
      };
      // must be the iframe window's ResizeObserver — the parent window's
      // does not observe elements in another document
      const RO = doc.defaultView.ResizeObserver;
      const ro = RO ? new RO(measure) : null;
      if (ro) {
        ro.observe(doc.documentElement);
        ro.observe(doc.body);
        // body's own box doesn't always change when the poster grows —
        // watch the mount point too
        ro.observe(doc.getElementById("poster-root"));
      }
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(measure);
      const timers = [300, 1000, 3000].map((t) => setTimeout(measure, t));
      measure();
      return () => {
        if (ro) ro.disconnect();
        timers.forEach(clearTimeout);
      };
    }
  );

  return (
    <div
      className="poster-frame-box"
      style={{
        width: w,
        height: Math.round(contentH * scale),
        overflow: "hidden",
      }}
    >
      <iframe
        ref={iframeRef}
        title={poster.title}
        style={{
          width: layoutW,
          height: contentH,
          border: 0,
          display: "block",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}

export default function PosterView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const poster = slug ? findPoster(slug) : posters[0];
  const { w, h } = useViewport();
  const stageRef = useRef(null);

  const idx = poster ? posters.indexOf(poster) : 0;
  const n = posters.length;
  const go = (i) => navigate("/p/" + posters[((i % n) + n) % n].slug);

  // first-visit gesture hint
  const [showHint, setShowHint] = useState(false);
  useEffect(() => {
    if (hintAlreadySeen()) return undefined;
    const t = setTimeout(() => {
      if (!hintAlreadySeen()) setShowHint(true);
    }, HINT_DELAY);
    return () => clearTimeout(t);
  }, []);
  const dismissHint = () => {
    markHintSeen();
    setShowHint(false);
  };

  // navigation bridge — gesture handlers (parent and inside each iframe) and
  // the framework map's long-press items call through this. Any navigation
  // counts as "knows the gestures" for the hint.
  useEffect(() => {
    window.__lvNav = {
      next: () => {
        dismissHint();
        go(idx + 1);
      },
      prev: () => {
        dismissHint();
        go(idx - 1);
      },
      jump: (s) => {
        dismissHint();
        navigate("/p/" + s);
      },
      home: () => {
        dismissHint();
        navigate("/p/" + posters[0].slug);
      },
    };
    return () => {
      delete window.__lvNav;
    };
  });

  // gestures on the parent page (direct mode, frame gutters); arrow keys on
  // the window so they work without focus
  useEffect(() => {
    if (!poster) return undefined;
    const detachStage = stageRef.current
      ? attachGestures(stageRef.current, {
          longPressHome: poster.slug !== posters[0].slug,
        })
      : () => {};
    const key = (e) => {
      if (e.key === "ArrowRight") window.__lvNav?.next?.();
      else if (e.key === "ArrowLeft") window.__lvNav?.prev?.();
    };
    window.addEventListener("keydown", key);
    return () => {
      detachStage();
      window.removeEventListener("keydown", key);
    };
  }, [poster && poster.slug]);

  // preload the neighboring slides once the current one has had a moment
  useEffect(() => {
    const t = setTimeout(() => {
      posters[(idx + 1) % n].load();
      posters[(idx - 1 + n) % n].load();
    }, 600);
    return () => clearTimeout(t);
  }, [idx, n]);

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const ratio = w / h;
  const isPortraitTV = Math.abs(ratio - DESIGN_W / DESIGN_H) < 0.03;
  // Readable flow mode until the window is CLEARLY landscape, with
  // hysteresis so near-square windows don't snap between modes while
  // resizing (frame above 1.2, back to flow below 1.1).
  const [wide, setWide] = useState(() => ratio > 1.15);
  useEffect(() => {
    if (ratio > 1.2) setWide(true);
    else if (ratio < 1.1) setWide(false);
  }, [ratio]);
  const mode = coarse ? "direct" : isPortraitTV || wide ? "frame" : "flow";

  if (!poster) return <Navigate to="/" replace />;

  const { Component } = poster;
  return (
    <div className="poster-stage" ref={stageRef}>
      <button
        className="deck-arrow deck-prev"
        aria-label="Previous poster"
        onClick={() => window.__lvNav?.prev?.()}
      >
        &lsaquo;
      </button>
      <button
        className="deck-arrow deck-next"
        aria-label="Next poster"
        onClick={() => window.__lvNav?.next?.()}
      >
        &rsaquo;
      </button>
      <div key={poster.slug} className="slide-fade">
        {mode === "frame" && <PortraitFrame poster={poster} w={w} h={h} />}
        {mode === "flow" && <FlowFrame poster={poster} w={w} />}
        {mode === "direct" && (
          <Suspense fallback={<Loading poster={poster} />}>
            <Component />
          </Suspense>
        )}
      </div>
      {showHint && (
        <div className="deck-hint" onClick={dismissHint}>
          <div className="deck-hint-card">
            <div className="deck-hint-title">How to explore</div>
            <div className="deck-hint-row">
              {coarse
                ? "Swipe left or right to move between posters"
                : "Use the ← → keys, the edge arrows, or swipe sideways to move between posters"}
            </div>
            <div className="deck-hint-row">
              Press and hold any poster to return to the framework map
            </div>
            <div className="deck-hint-row">
              {coarse
                ? "On the map, press and hold any item to open its poster"
                : "On the map, double-click (or press and hold) any item to open its poster"}
            </div>
            <button className="deck-hint-btn" onClick={dismissHint}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
