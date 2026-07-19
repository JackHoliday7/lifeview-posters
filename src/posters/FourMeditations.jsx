import { useState, useEffect } from "react";

const GratitudeSvg = ({ color }) => (
  <svg viewBox="0 0 70 100" style={{ width: "clamp(50px, 8vw, 80px)", height: "auto" }}>
    <circle cx="35" cy="45" r="10" fill={color} opacity="0.2" />
    <circle cx="35" cy="45" r="5" fill={color} opacity="0.35" />
    {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
      const a = (i/12)*Math.PI*2;
      const x1 = 35 + Math.cos(a)*14, y1 = 45 + Math.sin(a)*14;
      const x2 = 35 + Math.cos(a)*24, y2 = 45 + Math.sin(a)*24;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" opacity="0.2" strokeLinecap="round" />;
    })}
    <path d="M35,30 L35,16" stroke={color} strokeWidth="1" fill="none" opacity="0.2" strokeLinecap="round" />
    <path d="M31,20 L35,14 L39,20" stroke={color} strokeWidth="0.8" fill="none" opacity="0.15" strokeLinecap="round" />
  </svg>
);

const BarrierSvg = ({ color }) => (
  <svg viewBox="0 0 70 100" style={{ width: "clamp(50px, 8vw, 80px)", height: "auto" }}>
    <circle cx="35" cy="45" r="28" stroke={color} strokeWidth="1" fill="none" opacity="0.15" />
    <circle cx="35" cy="45" r="22" stroke={color} strokeWidth="0.6" fill="none" opacity="0.1" />
    <circle cx="35" cy="42" r="8" fill={color} opacity="0.12" />
    <circle cx="35" cy="42" r="4" fill={color} opacity="0.3" />
    <circle cx="35" cy="30" r="4" fill={color} opacity="0.35" />
    <path d="M35,34 L35,50 M35,40 L28,46 M35,40 L42,46 M35,50 L30,62 M35,50 L40,62" stroke={color} strokeWidth="1.2" fill="none" opacity="0.25" strokeLinecap="round" />
    <circle cx="35" cy="45" r="34" stroke={color} strokeWidth="0.4" fill="none" opacity="0.06" strokeDasharray="3,3" />
  </svg>
);

const ExtractionSvg = ({ color }) => (
  <svg viewBox="0 0 70 100" style={{ width: "clamp(50px, 8vw, 80px)", height: "auto" }}>
    <ellipse cx="35" cy="52" rx="14" ry="18" stroke={color} strokeWidth="0.8" fill="none" opacity="0.12" />
    <circle cx="35" cy="48" r="6" fill={color} opacity="0.2" />
    <path d="M35,42 L35,22" stroke={color} strokeWidth="1.5" fill="none" opacity="0.35" strokeLinecap="round" />
    <path d="M30,28 L35,20 L40,28" stroke={color} strokeWidth="1.2" fill="none" opacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30,18 L27,12 M35,18 L35,12 M40,18 L43,12" stroke={color} strokeWidth="0.8" fill="none" opacity="0.15" strokeLinecap="round" />
  </svg>
);

const GroundingSvg = ({ color }) => (
  <svg viewBox="0 0 70 100" style={{ width: "clamp(50px, 8vw, 80px)", height: "auto" }}>
    <circle cx="35" cy="20" r="4" fill={color} opacity="0.35" />
    <path d="M35,24 L35,40" stroke={color} strokeWidth="1.2" fill="none" opacity="0.3" strokeLinecap="round" />
    <path d="M35,32 L28,38 M35,32 L42,38" stroke={color} strokeWidth="1" fill="none" opacity="0.2" strokeLinecap="round" />
    <path d="M35,40 L35,88" stroke={color} strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
    <path d="M12,56 L58,56" stroke={color} strokeWidth="0.6" fill="none" opacity="0.12" />
    <path d="M35,70 C30,74 24,78 18,82 M35,70 C40,74 46,78 52,82 M35,78 C32,82 28,86 24,90 M35,78 C38,82 42,86 46,90" stroke={color} strokeWidth="0.8" fill="none" opacity="0.15" strokeLinecap="round" />
  </svg>
);

export default function FourMeditations() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Tangerine:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const meditations = [
    { label: "Gratitude", color: "#c4885c", whenBold: "Daily practice. First thing. Before lack finds you.", text: "A process of raising your vibration. Not just listing what you're thankful for \u2014 feeling it in your body until your frequency shifts.", Svg: GratitudeSvg },
    { label: "Ball & Barrier of Light", color: "#d4a855", whenBold: "Bad moods sticking, absorbing others' stress, feeling drained.", text: "Charge and cleanse your energy field. Build a sphere of protective light around you. Bill's foundational meditation \u2014 the one he starts every class with.", Svg: BarrierSvg },
    { label: "Emotional Extraction", color: "#c45a3a", whenBold: "Anger, grief, shame lodged in your body.", text: "A powerful way to locate unwanted emotions, pull them out of your body, and release them. You'll feel the difference immediately.", Svg: ExtractionSvg },
    { label: "Grounding Cord", color: "#8ca868", whenBold: "Racing thoughts, can't focus, buzzing, not here.", text: "Connect yourself to the center of the Earth with an energetic cord. Drain negative emotions and energy down and out of your body. Feel gravity hold you again.", Svg: GroundingSvg },
  ];

  return (
    <div style={{ width: "100%", height: "100vh", background: "linear-gradient(180deg, #0f0d0a 0%, #0a0a0f 50%, #0d0b08 100%)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2vh 5vw", boxSizing: "border-box", fontFamily: "'Cormorant Garamond', Georgia, serif", position: "relative" }}>

      {/* Grain */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(13px, 1.9vw, 20px)", letterSpacing: "0.35em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "clamp(8px, 1.5vh, 16px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>LifeView Toolkit &#x2014; Chi Energy Activation &amp; Clearing</div>
        <h1 style={{ fontSize: "clamp(52px, 10vw, 110px)", fontWeight: 700, color: "#c9a84c", margin: 0, lineHeight: 1.0, letterSpacing: "0.04em", fontFamily: "'Tangerine', cursive", textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.18)" }}>The Four Meditations</h1>
        <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)", margin: "clamp(8px, 1.5vh, 16px) auto 0" }} />
        <div style={{ fontSize: "clamp(15px, 2.2vw, 24px)", color: "rgba(201,168,76,0.4)", marginTop: "clamp(6px, 1vh, 14px)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.5 }}>Bill Farr&#x2019;s guided meditations for raising vibration, clearing energy, extracting negative emotion, and grounding to Earth.</div>
      </div>

      {/* Four Meditation entries */}
      <div style={{ flex: 1, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "clamp(12px, 1.6vh, 28px)", margin: "clamp(8px, 1.5vh, 18px) 0" }}>
        {meditations.map((m, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={m.label} style={{ display: "flex", flexDirection: isLeft ? "row" : "row-reverse", alignItems: "center", gap: "clamp(8px, 2vw, 20px)", padding: "clamp(4px, 0.5vh, 8px) 0" }}>
              <div style={{ flexShrink: 0 }}>
                <m.Svg color={m.color} />
              </div>
              <div style={{ flex: 1, textAlign: isLeft ? "left" : "right" }}>
                <div style={{ fontSize: "clamp(18px, 2.8vw, 30px)", letterSpacing: "0.18em", textTransform: "uppercase", color: m.color, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400, opacity: 0.85, marginBottom: "clamp(2px, 0.3vh, 6px)" }}>{m.label}</div>
                <div style={{ fontSize: "clamp(16px, 2.2vw, 24px)", lineHeight: 1.5, marginBottom: "clamp(2px, 0.3vh, 6px)" }}>
                  <span style={{ color: m.color, opacity: 0.8, fontWeight: 400, fontStyle: "italic" }}>{m.whenBold}</span>
                </div>
                <div style={{ fontSize: "clamp(15px, 2vw, 22px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.55, fontWeight: 300 }}>{m.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bill Farr callout */}
      <div style={{ position: "relative", zIndex: 1, padding: "clamp(10px, 1.5vh, 20px) clamp(14px, 2.5vw, 30px)", borderRadius: "6px", background: "rgba(201,168,76,0.03)", border: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 24px)" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: "clamp(15px, 2.2vw, 24px)", color: "rgba(201,168,76,0.5)", lineHeight: 1.5, fontStyle: "italic", fontWeight: 300, marginBottom: "clamp(4px, 0.6vh, 10px)" }}>The most important thirty dollars you could ever spend on yourself.</div>
            <div style={{ fontSize: "clamp(13px, 1.8vw, 20px)", letterSpacing: "0.15em", color: "rgba(201,168,76,0.55)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400, marginBottom: "clamp(2px, 0.3vh, 4px)" }}>HIGHER POWER GUIDED MEDITATIONS</div>
            <div style={{ fontSize: "clamp(13px, 1.8vw, 20px)", color: "rgba(201,168,76,0.4)", fontWeight: 300 }}>Chi Energy Activation &amp; Clearing</div>
            <div style={{ fontSize: "clamp(13px, 1.8vw, 20px)", color: "rgba(201,168,76,0.35)", fontWeight: 300 }}>Bill Farr</div>
            <div style={{ fontSize: "clamp(12px, 1.6vw, 18px)", color: "rgba(255,255,255,0.25)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginTop: "clamp(3px, 0.5vh, 8px)" }}>Four guided sessions &middot; $30 &middot; Use forever</div>
            <div style={{ fontSize: "clamp(11px, 1.5vw, 16px)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginTop: "clamp(2px, 0.3vh, 4px)", letterSpacing: "0.03em" }}>
              <a href="https://www.billfarr.com/product/higherpower-meditations" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(140,168,104,0.75)", textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer" }}>billfarr.com/product/higherpower-meditations</a>
            </div>
          </div>
          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAAFyAQAAAADAX2ykAAAC8klEQVR4nO2czW3cMBBG34QEcqQAF7ClSJ25JncgleICAkjHBbj4ciCplW0kTpC1IgEzNy7f4QMG5PxRa+JvbPr2Vzg477zzX8ovVm3gZrBEYDFjsghTB20/7qPH+QfySHOQJIleGXpJGstG3S2/aQ7SeDT9zv8JXw/nEmGyiD3PQfXoXjLliA876nH+y/h+Bo0pY0OS6F/j/9Xj/D/x8d1a0+VqQMjALTJd8q56nH8sX/z7pkgKddW/RMQSMyQByx56nH88fyvpMRBkz68RG5ZIWQ4Ak5mZdXvpcf5xPNrYDJBqrgyppdN38/z5fPwSa4U7JEkjN7MhXa06+b67lx7nH8ivZS5oTGvpq1ySaEhqJ9nr3xPyxZfFSn9jBki5+LyUS/W69vv5fPzqxm0TSyM012r1tMffE/Kt/k0ZA9BkQQYhM3UhGwDTAGJ5ysfT7/wnVvvKaZtEa0wqRXAJwn25wj3+npW35xmszI8IKvOjXlINx0ukJFkH1e/8L61OiOage5itWTMt+9oMlo6m3/lPrNVCtQyqVRHtki7jBtZ7/Gj6nf+9ReqFHLNYvqstn7KBwXQRRvoRrX/ZQ4/zj+VpVZHKJV3LXILupW9Zev17Rr71n4sboYTe9RFHDcfF/H4+H//+hNZaKN2TrKBt9/Jo+p3/xGr/eTNECq30Be7H2fvPp+Q3zeUafwm1Sbk+vNu0QNy/J+ObG+c3Y4Q1HNfsawbPr07M25Aks8vVpFczSFcrZ3oyM6Zuva6Pqd/5X9rH9xttYFR2y+kOHn/PyW982VLn/HYjvCmMj6bf+c/5NvpliWhc6sjQ7FInwRrL4GEvPc4/ji/OtPrgOWRIP6KmIWQAWT93xbX1pezR9Dv/e3v/vp1+vmGkufhcU1dH+wZhBz3OfzW/1C+RpBnsWVL5CKlE5+Prd/4jXx/ZtQeT7fujq5XQ27+ax99z8hHuydPylK1/6RCLoambVd9kXQRTN++gx/nH8ub/z+C886flfwIND15yuv6C0wAAAABJRU5ErkJggg==" style={{ width: "clamp(60px, 10vw, 100px)", height: "clamp(60px, 10vw, 100px)", opacity: 0.6, borderRadius: 4 }} />
            <div style={{ fontSize: "clamp(10px, 1.3vw, 14px)", color: "rgba(255,255,255,0.2)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginTop: "clamp(2px, 0.3vh, 4px)" }}>Scan to purchase</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, paddingTop: "clamp(8px, 1vh, 14px)" }}>
        <div style={{ fontSize: "clamp(10px, 1.3vw, 14px)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}><a href="https://www.higherpowersedona.org" target="_top" style={{ color: "inherit", textDecoration: "none" }}>higherpowersedona.org</a></div>
      </div>
    </div>
  );
}
