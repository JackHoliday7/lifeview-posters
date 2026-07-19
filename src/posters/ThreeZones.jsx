import { useState, useEffect } from "react";

const ThreeZonesPoster = () => {
  const [activeZone, setActiveZone] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Permanent+Marker&family=Rock+Salt&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(180deg, #0d0d14 0%, #0a0a0f 50%, #0d0d14 100%)",
        overflow: "hidden",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2.25vh 5vw 2vh",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Subtle grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, marginBottom: "0" }}>
        <div style={{ fontSize: "clamp(13px, 1.9vw, 20px)", letterSpacing: "0.35em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "clamp(6px, 1vh, 12px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>
          LifeView Toolkit &#x2014; Nervous System Regulation
        </div>
        <h1 style={{ fontSize: "clamp(48px, 9.5vw, 100px)", fontWeight: 700, color: "#ffffff", margin: "2.5vh 0 0", lineHeight: 1.1, letterSpacing: "0.01em", fontFamily: "'Permanent Marker', 'Caveat', cursive", transform: "rotate(-0.5deg)" }}>
          The Three Zones
        </h1>
        <div style={{ fontSize: "clamp(18px, 2.8vw, 32px)", color: "rgba(255,255,255,0.4)", marginTop: "clamp(8px, 1.5vh, 16px)", fontStyle: "italic", fontWeight: 300 }}>
          Where are you right now?
        </div>
      </div>

      {/* Three Zone Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 5vh, 60px)", position: "relative", zIndex: 1 }}>
        {/* RED ZONE */}
        <div onMouseEnter={() => setActiveZone("red")} onMouseLeave={() => setActiveZone(null)} style={{ borderRadius: "6px", padding: "clamp(18px, 3vw, 36px)", background: activeZone === "red" ? "linear-gradient(135deg, rgba(180,40,40,0.25) 0%, rgba(120,20,20,0.15) 100%)" : "linear-gradient(135deg, rgba(180,40,40,0.12) 0%, rgba(120,20,20,0.06) 100%)", border: "1px solid rgba(200,60,60,0.2)", cursor: "default", transition: "background 0.4s ease", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px, 1.5vw, 16px)", marginBottom: "clamp(8px, 1.8vh, 20px)" }}>
            <div style={{ width: "clamp(12px, 2vw, 18px)", height: "clamp(12px, 2vw, 18px)", borderRadius: "50%", background: "#c43c3c", boxShadow: "0 0 12px rgba(196,60,60,0.5)", flexShrink: 0 }} />
            <h2 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 400, color: "#e85555", margin: 0, letterSpacing: "-0.01em" }}>Red Zone</h2>
            <span style={{ fontSize: "clamp(13px, 1.9vw, 20px)", color: "rgba(232,85,85,0.5)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase" }}>Hyperarousal</span>
          </div>
          <div style={{ fontSize: "clamp(16px, 2.4vw, 26px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, fontWeight: 300 }}>Fight or flight. Anxious, angry, panicked, can't settle. Heart racing. Mind spinning.</div>
          <div style={{ marginTop: "clamp(10px, 2vh, 24px)", paddingTop: "clamp(10px, 2vh, 24px)", borderTop: "1px solid rgba(200,60,60,0.15)" }}>
            <div style={{ fontSize: "clamp(11px, 1.5vw, 16px)", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,85,85,0.45)", marginBottom: "clamp(4px, 0.5vh, 8px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400 }}>Return to Green</div>
            <div style={{ fontSize: "clamp(15px, 2.2vw, 24px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.55, fontWeight: 300 }}>Lengthen your exhale &#x2014; breathe in 4, out 8. Get heavy &#x2014; feel your weight, press feet into ground. Cool down &#x2014; cold water on wrists, step outside, slow your movement.</div>
          </div>
        </div>

        {/* GREEN ZONE */}
        <div onMouseEnter={() => setActiveZone("green")} onMouseLeave={() => setActiveZone(null)} style={{ borderRadius: "6px", padding: "clamp(18px, 3vw, 36px)", background: activeZone === "green" ? "linear-gradient(135deg, rgba(40,160,70,0.25) 0%, rgba(20,100,40,0.15) 100%)" : "linear-gradient(135deg, rgba(40,160,70,0.12) 0%, rgba(20,100,40,0.06) 100%)", border: "1px solid rgba(60,180,80,0.25)", cursor: "default", transition: "background 0.4s ease", display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ position: "absolute", inset: "-1px", borderRadius: "7px", boxShadow: "0 0 30px rgba(60,180,80,0.08), inset 0 0 30px rgba(60,180,80,0.03)", pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px, 1.5vw, 16px)", marginBottom: "clamp(8px, 1.8vh, 20px)" }}>
            <div style={{ width: "clamp(12px, 2vw, 18px)", height: "clamp(12px, 2vw, 18px)", borderRadius: "50%", background: "#3cb454", boxShadow: "0 0 16px rgba(60,180,84,0.5)", flexShrink: 0 }} />
            <h2 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 400, color: "#4dd468", margin: 0, letterSpacing: "-0.01em" }}>Green Zone</h2>
            <span style={{ fontSize: "clamp(13px, 1.9vw, 20px)", color: "rgba(77,212,104,0.5)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase" }}>Window of Tolerance</span>
          </div>
          <div style={{ fontSize: "clamp(17px, 2.5vw, 28px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, fontWeight: 300 }}>Present. Grounded. Clear-headed. You can think, feel, and respond &#x2014; not just react. This is where healing happens.</div>
          <div style={{ marginTop: "clamp(10px, 2vh, 24px)", paddingTop: "clamp(10px, 2vh, 24px)", borderTop: "1px solid rgba(60,180,80,0.15)" }}>
            <div style={{ fontSize: "clamp(15px, 2.2vw, 24px)", color: "rgba(77,212,104,0.55)", lineHeight: 1.55, fontStyle: "italic", fontWeight: 300 }}>The goal isn't to never leave Green. It's to notice when you've left &#x2014; and know how to return.</div>
          </div>
        </div>

        {/* BLUE ZONE */}
        <div onMouseEnter={() => setActiveZone("blue")} onMouseLeave={() => setActiveZone(null)} style={{ borderRadius: "6px", padding: "clamp(18px, 3vw, 36px)", background: activeZone === "blue" ? "linear-gradient(135deg, rgba(40,80,180,0.25) 0%, rgba(20,40,120,0.15) 100%)" : "linear-gradient(135deg, rgba(40,80,180,0.12) 0%, rgba(20,40,120,0.06) 100%)", border: "1px solid rgba(60,100,200,0.2)", cursor: "default", transition: "background 0.4s ease", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px, 1.5vw, 16px)", marginBottom: "clamp(8px, 1.8vh, 20px)" }}>
            <div style={{ width: "clamp(12px, 2vw, 18px)", height: "clamp(12px, 2vw, 18px)", borderRadius: "50%", background: "#3c6cc4", boxShadow: "0 0 12px rgba(60,108,196,0.5)", flexShrink: 0 }} />
            <h2 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 400, color: "#5588e8", margin: 0, letterSpacing: "-0.01em" }}>Blue Zone</h2>
            <span style={{ fontSize: "clamp(13px, 1.9vw, 20px)", color: "rgba(85,136,232,0.5)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase" }}>Hypoarousal</span>
          </div>
          <div style={{ fontSize: "clamp(16px, 2.4vw, 26px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, fontWeight: 300 }}>Freeze or collapse. Numb, disconnected, shut down. No energy. Can't feel. The world feels far away.</div>
          <div style={{ marginTop: "clamp(10px, 2vh, 24px)", paddingTop: "clamp(10px, 2vh, 24px)", borderTop: "1px solid rgba(60,100,200,0.15)" }}>
            <div style={{ fontSize: "clamp(11px, 1.5vw, 16px)", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(85,136,232,0.45)", marginBottom: "clamp(4px, 0.5vh, 8px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400 }}>Return to Green</div>
            <div style={{ fontSize: "clamp(15px, 2.2vw, 24px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.55, fontWeight: 300 }}>Activate your body &#x2014; jump, shake, dance, push against a wall. Shorten your exhale &#x2014; breathe in 4, out 2. Engage your senses &#x2014; 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", paddingTop: "clamp(8px, 1.5vh, 16px)", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(12px, 1.6vw, 18px)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, marginBottom: "clamp(4px, 0.5vh, 8px)" }}>From van der Kolk & Levine &#x2014; adapted for LifeView</div>
        <div style={{ fontSize: "clamp(10px, 1.3vw, 14px)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}><a href="https://www.higherpowersedona.org" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>higherpowersedona.org</a></div>
      </div>
    </div>
  );

};

export default ThreeZonesPoster;
