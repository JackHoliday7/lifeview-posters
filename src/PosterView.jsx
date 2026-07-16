import { Suspense, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Link, Navigate, useParams } from "react-router-dom";
import { findPoster } from "./posters.js";

// The posters were composed for portrait-mounted (9:16) TVs — natively
// 1080x1920. All their internal sizing is vw/vh-based, which resolves against
// the browser window, so on a wide landscape screen the composition stretches.
// To keep the native proportion we render the poster into an iframe locked at
// the design resolution (vw/vh then resolve against the iframe viewport) and
// scale the whole thing down to fit the screen height, anchored to the left.
const DESIGN_W = 1080;
const DESIGN_H = 1920;

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

function PortraitFrame({ poster, w, h }) {
  const iframeRef = useRef(null);
  // Landscape screens: fit the frame to the viewport height, hugging left.
  // Portrait screens (vertically-mounted TVs/monitors): fill the full width —
  // exactly full-bleed on a true 9:16 display, scrolling slightly on others.
  const scale = w >= h ? h / DESIGN_H : w / DESIGN_W;
  const { Component } = poster;

  useEffect(() => {
    const doc = iframeRef.current.contentDocument;
    doc.open();
    doc.write(
      `<!doctype html><html><head><meta charset="utf-8">` +
        `<link rel="preconnect" href="https://fonts.googleapis.com">` +
        `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` +
        `<link href="${FONTS_HREF}" rel="stylesheet">` +
        `<style>html,body{margin:0;padding:0;background:#0a0a0f;overflow:hidden}` +
        `.load{height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;` +
        `color:rgba(201,168,76,0.7);font:italic 300 44px 'Cormorant Garamond',Georgia,serif}</style>` +
        `</head><body><div id="poster-root"></div></body></html>`
    );
    doc.close();
    const root = createRoot(doc.getElementById("poster-root"));
    root.render(
      <Suspense fallback={<div className="load">{poster.title}&nbsp;&hellip;</div>}>
        <Component />
      </Suspense>
    );
    // unmount must be deferred — React forbids unmounting synchronously
    // from inside an effect cleanup of the parent tree
    return () => setTimeout(() => root.unmount(), 0);
  }, [Component, poster.title]);

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

export default function PosterView() {
  const { slug } = useParams();
  const poster = findPoster(slug);
  const { w, h } = useViewport();

  if (!poster) return <Navigate to="/" replace />;

  // Landscape mouse-driven screens get the portrait frame; phones, tablets,
  // and portrait monitors render the poster directly (the mobile scroll CSS
  // in index.css handles small screens).
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const useFrame = !coarse && w / h > DESIGN_W / DESIGN_H;

  const { Component } = poster;
  return (
    <div className="poster-stage">
      <Link to="/" className="back-btn" aria-label="Back to gallery">
        <span aria-hidden="true">&larr;</span> Gallery
      </Link>
      {useFrame ? (
        <PortraitFrame poster={poster} w={w} h={h} />
      ) : (
        <Suspense fallback={<Loading poster={poster} />}>
          <Component />
        </Suspense>
      )}
    </div>
  );
}
