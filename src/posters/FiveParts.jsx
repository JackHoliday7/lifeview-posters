import { useState, useEffect } from "react";

export default function FiveParts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const parts = [
    { label: "Exiles", color: "#c4885c", border: "rgba(196,136,92,0.2)", bg: "rgba(196,136,92,0.06)", text: "The wounded, young parts carrying pain, shame, fear. They hold the trauma. They're locked away because their feelings are overwhelming." },
    { label: "Managers", color: "#d4a855", border: "rgba(212,168,85,0.2)", bg: "rgba(212,168,85,0.06)", text: "The parts that control your life to prevent pain. Perfectionists, planners, critics, people-pleasers. They keep you safe by keeping you small." },
    { label: "Firefighters", color: "#c45a3a", border: "rgba(196,90,58,0.2)", bg: "rgba(196,90,58,0.06)", text: "The parts that react when Exiles get triggered. Addictions, rage, dissociation. They douse the pain with anything that works now." },
    { label: "Self", color: "#8ca868", border: "rgba(140,168,104,0.2)", bg: "rgba(140,168,104,0.06)", text: "Your core consciousness. Calm, curious, compassionate, connected, clear, confident, courageous, creative. Who you are when no parts are activated." },
    { label: "Protectors", color: "#a8885c", border: "rgba(168,136,92,0.2)", bg: "rgba(168,136,92,0.06)", text: "Managers and Firefighters together. They're trying to protect the Exiles, but often make things worse." },
  ];

  const practices = [
    "Notice when a part takes over \u2014 \"A part of me is angry\" not \"I am angry\"",
    "Get curious \u2014 \"What are you trying to protect me from?\"",
    "Thank the part \u2014 it's doing its best with limited tools",
    "Access Self \u2014 breathe, ground, return to the 8 C's",
    "Heal the Exile \u2014 once protectors trust you, they'll let you reach the wounded parts",
  ];

  return (
    <div style={{ width: "100%", height: "100vh", background: "linear-gradient(180deg, #0f0d0a 0%, #0a0a0f 50%, #0d0b08 100%)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2vh 5vw", boxSizing: "border-box", fontFamily: "'Cormorant Garamond', Georgia, serif", position: "relative" }}>

      {/* Grain */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(13px, 1.9vw, 20px)", letterSpacing: "0.35em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "clamp(8px, 1.5vh, 16px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>LifeView Toolkit &#x2014; Internal Family Systems</div>
        <h1 style={{ fontSize: "clamp(48px, 9.5vw, 100px)", fontWeight: 300, color: "#c9a84c", margin: 0, lineHeight: 1.05, letterSpacing: "0.03em", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.08)" }}>The Five Parts</h1>
        <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)", margin: "clamp(8px, 1.5vh, 16px) auto 0" }} />
        <div style={{ fontSize: "clamp(16px, 2.4vw, 26px)", color: "rgba(201,168,76,0.4)", marginTop: "clamp(6px, 1vh, 14px)", fontStyle: "italic", fontWeight: 300 }}>You are not one self &#x2014; you are a system of parts. All parts are trying to help you, even the destructive ones.</div>
      </div>

      {/* Five Part Cards */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "clamp(8px, 1.5vh, 18px)", position: "relative", zIndex: 1, margin: "clamp(8px, 1.5vh, 18px) 0" }}>
        {parts.map((p) => (
          <div key={p.label} style={{ flex: 1, borderRadius: "6px", padding: "clamp(6px, 0.8vh, 12px) clamp(14px, 2.5vw, 30px)", background: p.bg, border: `1px solid ${p.border}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: "clamp(13px, 1.9vw, 22px)", letterSpacing: "0.2em", textTransform: "uppercase", color: p.color, marginBottom: "clamp(3px, 0.4vh, 6px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, opacity: 0.8 }}>{p.label}</div>
            <div style={{ fontSize: "clamp(16px, 2.4vw, 26px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.55, fontWeight: 300 }}>{p.text}</div>
          </div>
        ))}
      </div>

      {/* The Practice */}
      <div style={{ position: "relative", zIndex: 1, borderRadius: "6px", padding: "clamp(10px, 1.5vh, 20px) clamp(14px, 2.5vw, 30px)", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ fontSize: "clamp(12px, 1.6vw, 18px)", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginBottom: "clamp(6px, 1vh, 12px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400 }}>The Practice</div>
        {practices.map((p, i) => (
          <div key={i} style={{ fontSize: "clamp(15px, 2.2vw, 24px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.55, fontWeight: 300, marginBottom: i < practices.length - 1 ? "clamp(3px, 0.5vh, 8px)" : 0, paddingLeft: "clamp(16px, 2.5vw, 28px)", position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: "rgba(201,168,76,0.35)" }}>{"\u00B7"}</span>{p}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, paddingTop: "clamp(8px, 1.5vh, 16px)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ fontSize: "clamp(16px, 2.2vw, 24px)", color: "rgba(201,168,76,0.35)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.5, marginBottom: "clamp(4px, 0.5vh, 8px)" }}>Lead your inner system from Self, not from reactive parts.</div>
        <div style={{ fontSize: "clamp(12px, 1.6vw, 18px)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, marginBottom: "clamp(4px, 0.5vh, 8px)" }}>From Richard Schwartz &#x2014; adapted for LifeView</div>
        <div style={{ fontSize: "clamp(10px, 1.3vw, 14px)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}><a href="https://www.higherpowersedona.org" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>higherpowersedona.org</a></div>
      </div>
    </div>
  );
}
