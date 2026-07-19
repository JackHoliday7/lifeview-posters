import { useState, useEffect } from "react";

export default function FourEnemies() {
  useEffect(() => {
    const link1 = document.createElement("link");
    link1.href = "https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);
    const link2 = document.createElement("link");
    link2.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap";
    link2.rel = "stylesheet";
    document.head.appendChild(link2);
    return () => { document.head.removeChild(link1); document.head.removeChild(link2); };
  }, []);

  const enemies = [
    {
      label: "Fear",
      subtitle: "The one that stops you before you start",
      color: "#c45a3a",
      borderColor: "rgba(196,90,58,0.4)",
      bgColor: "rgba(196,90,58,0.04)",
      voice: '"You can\'t do this." "You\'ll fail." "Stay safe." "Who are you to even try?"',
      sectionLabel: "HOW TO DEFEAT IT",
      body: "You don't eliminate fear. You act despite it. Be fully afraid and take the next step anyway. Name the fear, acknowledge it's real, then move.",
    },
    {
      label: "Clarity",
      subtitle: "The most seductive enemy",
      color: "#d4a855",
      borderColor: "rgba(212,168,85,0.4)",
      bgColor: "rgba(212,168,85,0.04)",
      voice: '"I get it now!" "I\'ve figured it out!" "I\'m healed!" "I know how this works!"',
      sectionLabel: "HOW TO DEFEAT IT",
      body: "Stay humble. Keep practicing. Understanding is not mastery. When you feel like you've arrived, ask: what am I missing? Do the basics even when they feel beneath you.",
    },
    {
      label: "Power",
      subtitle: "The one that corrupts what you built",
      color: "#a068a8",
      borderColor: "rgba(160,104,168,0.4)",
      bgColor: "rgba(160,104,168,0.04)",
      voice: '"You\'ve made it." "You\'re special." "The rules don\'t apply to you."',
      sectionLabel: "HOW TO DEFEAT IT",
      body: "Ask: who does this serve? Stay connected to people who will call you out. Practice generosity, especially when you don't have to. Your gifts are meant to serve, not elevate you.",
    },
    {
      label: "Weariness",
      subtitle: "The one that makes you quit when you're closest",
      color: "#7a8a5a",
      borderColor: "rgba(122,138,90,0.4)",
      bgColor: "rgba(122,138,90,0.04)",
      voice: '"I\'m tired." "I\'ve done enough." "Let someone else carry this now."',
      sectionLabel: "HOW TO DEFEAT IT",
      body: "Remember why you started. Find new expressions of the same work. Mentor others \u2014 their fire can reignite yours. You only earn true rest when you refuse to quit.",
    },
  ];

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      background: "linear-gradient(180deg, #18101c 0%, #151018 30%, #120e16 70%, #151018 100%)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "2vh 5vw",
      boxSizing: "border-box",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      position: "relative",
    }}>
      {/* Vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,5,12,0.5) 100%)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(13px, 1.9vw, 20px)", letterSpacing: "0.35em", color: "rgba(200,160,140,0.4)", textTransform: "uppercase", marginBottom: "clamp(8px, 1.5vh, 16px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>
          LifeView Toolkit &#x2014; What Will Try to Stop You
        </div>
        <h1 style={{ fontSize: "clamp(48px, 10vw, 100px)", fontWeight: 400, color: "rgba(240,230,220,0.9)", margin: 0, lineHeight: 1.1, fontFamily: "'UnifrakturMaguntia', cursive", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
          The Four Enemies
        </h1>
        <div style={{ fontSize: "clamp(16px, 2.4vw, 26px)", color: "rgba(200,140,120,0.5)", marginTop: "clamp(6px, 1vh, 14px)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.5 }}>
          If you can&#x2019;t name the enemy, it&#x2019;s already winning.
        </div>
      </div>

      {/* Enemy Cards */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "clamp(10px, 2vh, 22px)", position: "relative", zIndex: 1, margin: "clamp(10px, 2vh, 24px) 0" }}>
        {enemies.map((e) => (
          <div key={e.label} style={{
            flex: 1,
            background: e.bgColor,
            borderLeft: `3px solid ${e.borderColor}`,
            borderRadius: "0 6px 6px 0",
            padding: "clamp(6px, 0.8vh, 12px) clamp(14px, 2.5vw, 30px)",
            position: "relative",
            boxShadow: `inset 0 0 30px ${e.bgColor}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            {/* Name + subtitle */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px, 1.5vw, 16px)", marginBottom: "clamp(4px, 0.6vh, 10px)", flexWrap: "wrap" }}>
              <span style={{ width: "clamp(8px, 1.2vw, 12px)", height: "clamp(8px, 1.2vw, 12px)", borderRadius: "50%", background: e.color, opacity: 0.7, display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: "clamp(26px, 4.5vw, 48px)", fontWeight: 600, color: "rgba(240,230,220,0.85)", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>{e.label}</span>
              <span style={{ fontSize: "clamp(13px, 2vw, 22px)", color: e.color, fontStyle: "italic", fontWeight: 300, opacity: 0.7 }}>{e.subtitle}</span>
            </div>

            {/* Voice */}
            <div style={{ fontSize: "clamp(16px, 2.4vw, 26px)", color: "rgba(240,220,200,0.55)", fontStyle: "italic", fontWeight: 400, lineHeight: 1.55, marginBottom: "clamp(4px, 0.6vh, 10px)" }}>{e.voice}</div>

            {/* Section label + body */}
            <div style={{ paddingTop: "clamp(4px, 0.5vh, 8px)", borderTop: `1px solid ${e.borderColor}` }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 16px)", letterSpacing: "0.2em", color: e.color, textTransform: "uppercase", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400, marginBottom: "clamp(3px, 0.4vh, 6px)", opacity: 0.7 }}>{e.sectionLabel}</div>
              <div style={{ fontSize: "clamp(16px, 2.2vw, 24px)", color: "rgba(240,230,220,0.7)", fontWeight: 400, lineHeight: 1.6 }}>{e.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Self-diagnostic */}
      <div style={{ position: "relative", zIndex: 1, padding: "clamp(10px, 1.5vh, 20px) clamp(14px, 2.5vw, 30px)", borderRadius: "6px", background: "rgba(200,100,80,0.03)", border: "1px solid rgba(200,100,80,0.08)" }}>
        <div style={{ fontSize: "clamp(11px, 1.5vw, 16px)", letterSpacing: "0.22em", color: "rgba(200,140,120,0.5)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400, marginBottom: "clamp(6px, 1vh, 12px)", textAlign: "center", textTransform: "uppercase" }}>Which enemy are you facing?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(3px, 0.5vh, 8px)" }}>
          {[
            { q: "Haven\u2019t started", a: "Fear", color: "#c45a3a" },
            { q: "Stopped practicing", a: "Clarity", color: "#d4a855" },
            { q: "Success making you hard", a: "Power", color: "#a068a8" },
            { q: "Exhausted, want to quit", a: "Weariness", color: "#7a8a5a" },
          ].map(item => (
            <div key={item.a} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px, 1.5vw, 16px)" }}>
              <span style={{ fontSize: "clamp(15px, 2.2vw, 24px)", color: "rgba(240,220,200,0.35)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, minWidth: "clamp(140px, 22vw, 240px)", textAlign: "right" }}>{item.q}</span>
              <span style={{ fontSize: "clamp(12px, 1.6vw, 18px)", color: "rgba(200,140,120,0.3)" }}>{"\u2192"}</span>
              <span style={{ fontSize: "clamp(15px, 2.2vw, 24px)", color: item.color, opacity: 0.75, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400, letterSpacing: "0.12em", minWidth: "clamp(80px, 12vw, 120px)" }}>{item.a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, paddingTop: "clamp(8px, 1.5vh, 16px)", borderTop: "1px solid rgba(200,100,80,0.08)" }}>
        <div style={{ fontSize: "clamp(16px, 2.2vw, 24px)", color: "rgba(200,140,120,0.4)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.5, marginBottom: "clamp(4px, 0.5vh, 8px)" }}>
          The battle never ends. But you get better at fighting.
        </div>
        <div style={{ fontSize: "clamp(12px, 1.6vw, 18px)", color: "rgba(200,140,120,0.25)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, marginBottom: "clamp(4px, 0.5vh, 8px)" }}>
          From Don Juan via Carlos Castaneda &#x2014; adapted for LifeView
        </div>
        <div style={{ fontSize: "clamp(10px, 1.3vw, 14px)", color: "rgba(200,140,120,0.2)", letterSpacing: "0.18em", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}><a href="https://www.higherpowersedona.org" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>higherpowersedona.org</a></div>
      </div>
    </div>
  );
}
