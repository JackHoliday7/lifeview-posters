import { Suspense, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Link, Navigate, useParams } from "react-router-dom";
import { findPoster } from "./posters.js";

// The posters were composed for portrait-mounted (9:16) TVs — natively
// 1080x1920. All their internal sizing is vw/vh-based, which resolves against
// the browser window, so they can't simply be wrapped in a narrower container.
// Instead they render inside an iframe (vw/vh resolve against the iframe
// viewport), which is then scaled to the screen. Three display modes:
//
//  - Landscape screens:  native 1080x1920 frame, fit to height, hugging left.
//  - Exact 9:16 portrait (a fullscreen portrait TV): native frame, full-bleed.
//  - Other portrait screens (a monitor with browser chrome): "flow" frame —
//    phone-scale layout magnified to the full width, natural height, page
//    scrolls; this keeps the type large and readable.
//  - Touch devices render directly; the mobile CSS in index.css handles them.
const DESIGN_W = 1080;
const DESIGN_H = 1920;
const FLOW_W = 420; // layout width of the readable "flow" rendering

// Union of every Google Font family used across the 16 posters. The iframe is
// a separate document, so it needs its own font links (the posters' own
// useEffect font injection targets the parent document).
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Bebas+Neue&family=Caveat:wght@400;500;600;700&family=Cinzel:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&family=Rock+Salt&family=Tangerine:wght@400;700&family=UnifrakturMaguntia&display=swap";

function useViewport() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const fn = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
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

// Writes the iframe document and mounts the poster in it as its own React
// root. extraCss lets the flow mode relax the poster's fixed-viewport sizing.
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
    const cleanup = onMounted ? onMounted(doc) : undefined;
    // unmount must be deferred — React forbids unmounting synchronously
    // from inside an effect cleanup of the parent tree
    return () => {
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
  // never lay out wider than the screen (windows narrower than FLOW_W just
  // get the plain phone rendering, unmagnified)
  const layoutW = Math.min(w, FLOW_W);
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
  const poster = findPoster(slug);
  const { w, h } = useViewport();

  if (!poster) return <Navigate to="/" replace />;

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const ratio = w / h;
  const isPortraitTV = Math.abs(ratio - DESIGN_W / DESIGN_H) < 0.03;
  const mode = coarse
    ? "direct"
    : ratio >= 1 || isPortraitTV
      ? "frame"
      : "flow";

  const { Component } = poster;
  return (
    <div className="poster-stage">
      <Link to="/" className="back-btn" aria-label="Back to gallery">
        <span aria-hidden="true">&larr;</span> Gallery
      </Link>
      {mode === "frame" && <PortraitFrame key={poster.slug} poster={poster} w={w} h={h} />}
      {mode === "flow" && <FlowFrame key={poster.slug} poster={poster} w={w} />}
      {mode === "direct" && (
        <Suspense fallback={<Loading poster={poster} />}>
          <Component />
        </Suspense>
      )}
    </div>
  );
}
