import { useState, useEffect, useRef } from "react";

const FlowingSvg = ({ color }) => (
  <svg viewBox="0 0 80 120" width="80" height="120" style={{ width: "clamp(50px, 8vw, 80px)", height: "auto" }}>
    <path d={`M40,14 a8,8 0 1,0 0.1,0 Z`} fill={color} opacity="0.5" />
    <path d={`M40,22 C40,28 38,38 36,48 C34,56 30,62 32,72 C33,78 35,88 30,100 M36,48 C32,52 24,50 18,46 M36,42 C40,46 48,52 56,48 M32,72 C36,76 38,84 44,100`} stroke={color} strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round" />
    <path d="M10,60 Q20,55 30,60 Q40,65 50,60 Q60,55 70,60" stroke={color} strokeWidth="0.8" fill="none" opacity="0.15" />
  </svg>
);

const StaccatoSvg = ({ color }) => (
  <svg viewBox="0 0 80 120" width="80" height="120" style={{ width: "clamp(50px, 8vw, 80px)", height: "auto" }}>
    <path d={`M42,14 a8,8 0 1,0 0.1,0 Z`} fill={color} opacity="0.5" />
    <path d={`M42,22 L42,32 L40,48 L38,58 L32,72 L26,100 M38,58 L48,72 L52,100 M42,34 L28,28 L16,22 M42,36 L58,30 L68,24`} stroke={color} strokeWidth="2.5" fill="none" opacity="0.45" strokeLinecap="square" />
  </svg>
);

const ChaosSvg = ({ color }) => (
  <svg viewBox="0 0 80 120" width="80" height="120" style={{ width: "clamp(50px, 8vw, 80px)", height: "auto" }}>
    <path d={`M36,18 a7,7 0 1,0 0.1,0 Z`} fill={color} opacity="0.5" />
    <path d={`M36,25 C38,30 42,36 44,44 C46,52 42,60 38,68 C36,74 40,84 46,100 M38,68 C32,76 24,82 20,100 M44,36 C50,30 60,26 68,30 M42,40 C36,34 24,28 16,32`} stroke={color} strokeWidth="2" fill="none" opacity="0.45" strokeLinecap="round" />
    <circle cx="64" cy="44" r="1.5" fill={color} opacity="0.15" />
    <circle cx="12" cy="36" r="1" fill={color} opacity="0.12" />
  </svg>
);

const LyricalSvg = ({ color }) => (
  <svg viewBox="0 0 80 120" width="80" height="120" style={{ width: "clamp(50px, 8vw, 80px)", height: "auto" }}>
    <path d={`M38,12 a7,7 0 1,0 0.1,0 Z`} fill={color} opacity="0.5" />
    <path d={`M38,19 C40,24 42,30 40,38 C38,44 36,48 38,54 M38,54 C34,62 28,72 22,84 M38,54 C44,60 52,66 58,78 M40,30 C46,24 56,18 66,16 M40,32 C34,26 22,20 14,18`} stroke={color} strokeWidth="1.8" fill="none" opacity="0.45" strokeLinecap="round" />
  </svg>
);

const StillnessSvg = ({ color }) => (
  <svg viewBox="0 0 80 120" width="80" height="120" style={{ width: "clamp(50px, 8vw, 80px)", height: "auto" }}>
    <path d={`M40,16 a8,8 0 1,0 0.1,0 Z`} fill={color} opacity="0.5" />
    <path d={`M40,24 C40,30 40,38 40,46 C40,52 40,56 40,60 M40,46 C34,50 26,54 20,56 C18,57 18,58 20,58 C24,58 30,56 36,54 M40,46 C46,50 54,54 60,56 C62,57 62,58 60,58 C56,58 50,56 44,54 M36,60 C32,66 28,74 24,78 C22,80 24,80 28,78 C32,76 36,72 38,68 M44,60 C48,66 52,74 56,78 C58,80 56,80 52,78 C48,76 44,72 42,68`} stroke={color} strokeWidth="1.8" fill="none" opacity="0.45" strokeLinecap="round" />
    <circle cx="40" cy="40" r="32" stroke={color} strokeWidth="0.5" fill="none" opacity="0.1" />
  </svg>
);

export default function FiveRhythms() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@300;400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const rhythms = [
    { label: "Flowing", element: "Earth", color: "#8ca868", text: "Feminine, fluid, circular, continuous. Feet lead. Move like water, hips swaying, no sharp edges.", whenBold: "When you're unmoored.", whenRest: "When your mind is spinning and your body has checked out.", Svg: FlowingSvg },
    { label: "Staccato", element: "Fire", color: "#c45a3a", text: "Percussive, angular, defined. Hands lead. Sharp movements, beat-driven. Take up space. Draw your edges.", whenBold: "When you've gone quiet.", whenRest: "When you're holding back what needs to be said or done.", Svg: StaccatoSvg },
    { label: "Chaos", element: "Water", color: "#5a8cc4", text: "Wild, formless, surrendered. Head leads. Shake, spin, lose control on purpose. No right way to do this.", whenBold: "When you're about to explode.", whenRest: "When rage or grief is locked inside and needs to move.", Svg: ChaosSvg },
    { label: "Lyrical", element: "Air", color: "#d4a855", text: "Light, playful, integrated. Whole body leads. Float, leap, let the body do what it wants. Joy lives here.", whenBold: "When the storm passes.", whenRest: "When you need to remember that lightness still exists.", Svg: LyricalSvg },
    { label: "Stillness", element: "Space", color: "#a088b8", text: "Minimal, present, complete. Spirit leads. Gentle movement or none at all. Breath in motion. Witness.", whenBold: "When it's done.", whenRest: "When the body says stop and you finally listen.", Svg: StillnessSvg },
  ];

  return (
    <div style={{ width: "100%", height: "100vh", background: "linear-gradient(180deg, #0f0d0a 0%, #0a0a0f 50%, #0d0b08 100%)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2vh 5vw", boxSizing: "border-box", fontFamily: "'Cormorant Garamond', Georgia, serif", position: "relative" }}>

      {/* Grain */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(13px, 1.9vw, 20px)", letterSpacing: "0.35em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "clamp(6px, 1vh, 12px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>LifeView Toolkit &#x2014; Movement as Spiritual Practice</div>
        <h1 style={{ fontSize: "clamp(42px, 8.5vw, 90px)", fontWeight: 300, color: "#c9a84c", margin: 0, marginTop: "clamp(12px, 3.5vh, 40px)", lineHeight: 1.05, letterSpacing: "0.14em", fontFamily: "'Cinzel', serif", textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.12)" }}>The Five Rhythms</h1>
        <div style={{ fontSize: "clamp(16px, 2.4vw, 26px)", color: "rgba(201,168,76,0.4)", marginTop: "clamp(6px, 1vh, 12px)", fontStyle: "italic", fontWeight: 300 }}>Put the body in motion to still the mind.</div>
        <div style={{ fontSize: "clamp(12px, 1.6vw, 18px)", color: "rgba(201,168,76,0.25)", marginTop: "clamp(3px, 0.5vh, 8px)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, letterSpacing: "0.1em" }}>Dance all five in sequence to complete The Wave.</div>
      </div>

      {/* Five Rhythm entries */}
      <div style={{ flex: 1, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly", margin: "clamp(8px, 1.5vh, 18px) 0" }}>
        {rhythms.map((r, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={r.label} style={{ display: "flex", flexDirection: isLeft ? "row" : "row-reverse", alignItems: "center", gap: "clamp(8px, 2vw, 20px)", padding: "clamp(4px, 0.5vh, 8px) 0" }}>
              <div style={{ flexShrink: 0 }}>
                <r.Svg color={r.color} />
              </div>
              <div style={{ flex: 1, textAlign: isLeft ? "left" : "right" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(6px, 1vw, 12px)", marginBottom: "clamp(2px, 0.3vh, 6px)", justifyContent: isLeft ? "flex-start" : "flex-end" }}>
                  <div style={{ fontSize: "clamp(18px, 2.8vw, 30px)", letterSpacing: "0.18em", textTransform: "uppercase", color: r.color, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400, opacity: 0.85 }}>{r.label}</div>
                  <div style={{ fontSize: "clamp(12px, 1.6vw, 18px)", color: r.color, opacity: 0.35, fontFamily: "'Helvetica Neue', sans-serif" }}>{r.element}</div>
                </div>
                <div style={{ fontSize: "clamp(16px, 2.2vw, 24px)", lineHeight: 1.5, fontFamily: "'Cormorant Garamond', serif", marginBottom: "clamp(2px, 0.3vh, 6px)" }}>
                  <span style={{ color: r.color, opacity: 0.75, fontWeight: 400 }}>{r.whenBold}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 300, fontStyle: "italic" }}> {r.whenRest}</span>
                </div>
                <div style={{ fontSize: "clamp(15px, 2vw, 22px)", color: "rgba(255,255,255,0.35)", lineHeight: 1.55, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{r.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, paddingTop: "clamp(8px, 1.5vh, 16px)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ fontSize: "clamp(16px, 2.2vw, 24px)", color: "rgba(201,168,76,0.35)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.5, marginBottom: "clamp(4px, 0.5vh, 8px)" }}>Let your body move through stuck emotions and return to aliveness.</div>
        <div style={{ fontSize: "clamp(12px, 1.6vw, 18px)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, marginBottom: "clamp(4px, 0.5vh, 8px)" }}>From Gabrielle Roth &#x2014; adapted for LifeView</div>
        <div style={{ fontSize: "clamp(10px, 1.3vw, 14px)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}><a href="https://www.higherpowersedona.org" target="_top" style={{ color: "inherit", textDecoration: "none" }}>higherpowersedona.org</a></div>
      </div>
    </div>
  );
}
