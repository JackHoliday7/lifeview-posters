import { useState, useEffect } from "react";

const FourHorsemenPoster = () => {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Permanent+Marker&family=UnifrakturMaguntia&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const horsemen = [
    {
      name: "Criticism",
      subtitle: "You do bad things",
      translation: "\"You do bad things.\"",
      color: "#c4553c",
      glow: "rgba(196,85,60,0.5)",
      border: "rgba(200,90,60,0.2)",
      bgFrom: "rgba(180,70,40,0.12)",
      bgTo: "rgba(120,40,20,0.06)",
      bgHoverFrom: "rgba(180,70,40,0.25)",
      bgHoverTo: "rgba(120,40,20,0.15)",
      sounds: '"You always..." "You never..." "What\'s wrong with you?"',
      antidote: "Gentle startup. Address the behavior, not the character. Say what you need, not what they lack.",
      antidoteLabel: "Antidote",
    },
    {
      name: "Contempt",
      subtitle: "You are a bad person",
      translation: "\"You are a bad person.\"",
      color: "#a83c6c",
      glow: "rgba(168,60,108,0.5)",
      border: "rgba(180,60,110,0.25)",
      bgFrom: "rgba(160,50,100,0.14)",
      bgTo: "rgba(100,20,60,0.07)",
      bgHoverFrom: "rgba(160,50,100,0.28)",
      bgHoverTo: "rgba(100,20,60,0.17)",
      sounds: "Eye-rolling. Mockery. Sarcasm meant to wound. Superiority. Disgust.",
      antidote: "Build a culture of appreciation. Express what you respect and admire. Contempt dies where gratitude lives.",
      antidoteLabel: "#1 predictor of divorce",
    },
    {
      name: "Defensiveness",
      subtitle: "You are wrong about me",
      translation: "\"You are wrong about me.\"",
      color: "#b8963c",
      glow: "rgba(184,150,60,0.5)",
      border: "rgba(190,160,60,0.2)",
      bgFrom: "rgba(170,140,40,0.12)",
      bgTo: "rgba(110,90,20,0.06)",
      bgHoverFrom: "rgba(170,140,40,0.25)",
      bgHoverTo: "rgba(110,90,20,0.15)",
      sounds: '"That\'s not my fault." "I only did that because you..." "You\'re the one who..."',
      antidote: "Accept responsibility for even a small part. Say \"You're right, I did that.\" One sentence of ownership stops the spiral.",
      antidoteLabel: "Antidote",
    },
    {
      name: "Stonewalling",
      subtitle: "You don't exist to me",
      translation: "\"You don't exist to me.\"",
      color: "#6880a8",
      glow: "rgba(104,128,168,0.5)",
      border: "rgba(100,130,180,0.2)",
      bgFrom: "rgba(80,110,160,0.12)",
      bgTo: "rgba(40,60,100,0.06)",
      bgHoverFrom: "rgba(80,110,160,0.25)",
      bgHoverTo: "rgba(40,60,100,0.15)",
      sounds: "Silence. Blank stare. Walking away. Shutting down. The cold wall.",
      antidote: "Self-soothe first. Say \"I need 20 minutes, then I'll come back.\" Leave with a promise, not a punishment.",
      antidoteLabel: "Antidote",
    },
  ];

  return (
    <div style={{ width: "100%", height: "100vh", background: "#0a0a0f", fontFamily: "'Georgia', 'Times New Roman', serif", boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #0d0d14 0%, #0a0a0f 50%, #0d0d14 100%)", display: "flex", flexDirection: "column", padding: "2vh 5vw", boxSizing: "border-box", position: "relative" }}>

        {/* Grain */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, pointerEvents: "none", borderRadius: "inherit" }} />

        {/* Header */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "clamp(13px, 1.9vw, 20px)", letterSpacing: "0.35em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "clamp(8px, 1.5vh, 16px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>
            LifeView Toolkit — What Destroys Relationships
          </div>
          <h1 style={{ fontSize: "clamp(48px, 10vw, 100px)", fontWeight: 400, color: "#d4c8b8", margin: 0, lineHeight: 1.1, letterSpacing: "0.03em", fontFamily: "'UnifrakturMaguntia', cursive", textShadow: "0 0 30px rgba(168,60,60,0.15), 0 2px 4px rgba(0,0,0,0.5)" }}>
            The Four Horsemen
          </h1>
          <div style={{ fontSize: "clamp(16px, 2.4vw, 26px)", color: "rgba(255,255,255,0.35)", marginTop: "clamp(6px, 1vh, 14px)", fontStyle: "italic", fontWeight: 300 }}>
            If you see these, the relationship is dying.
          </div>
        </div>

        {/* Four Cards */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "clamp(10px, 2vh, 22px)", position: "relative", zIndex: 1, margin: "clamp(12px, 2.5vh, 30px) 0" }}>
          {horsemen.map((h, i) => (
            <div
              key={h.name}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
              style={{
                flex: 1,
                borderRadius: "6px",
                padding: "clamp(6px, 0.8vh, 12px) clamp(14px, 2.5vw, 30px)",
                background: activeCard === i
                  ? `linear-gradient(135deg, ${h.bgHoverFrom} 0%, ${h.bgHoverTo} 100%)`
                  : `linear-gradient(135deg, ${h.bgFrom} 0%, ${h.bgTo} 100%)`,
                border: `1px solid ${h.border}`,
                cursor: "default",
                // background only — "all" also animates the vh-based padding,
                // which feedback-loops with the site's flow-height measurement
                transition: "background 0.4s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {h.name === "Contempt" && (
                <div style={{ position: "absolute", inset: "-1px", borderRadius: "7px", boxShadow: "0 0 25px rgba(168,60,108,0.08), inset 0 0 25px rgba(168,60,108,0.03)", pointerEvents: "none" }} />
              )}

              <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px, 1.5vw, 16px)", marginBottom: "clamp(4px, 0.7vh, 10px)" }}>
                <div style={{ width: "clamp(10px, 1.5vw, 16px)", height: "clamp(10px, 1.5vw, 16px)", borderRadius: "50%", background: h.color, boxShadow: `0 0 10px ${h.glow}`, flexShrink: 0, marginTop: "0.2vw" }} />
                <h2 style={{ fontSize: "clamp(26px, 4.5vw, 48px)", fontWeight: 400, color: h.color, margin: 0, letterSpacing: "-0.01em" }}>
                  {h.name}
                </h2>
                <span style={{ fontSize: "clamp(12px, 1.8vw, 20px)", color: `${h.color}80`, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, letterSpacing: "0.1em", fontStyle: "italic" }}>
                  {h.subtitle}
                </span>
              </div>

              <div style={{ fontSize: "clamp(16px, 2.4vw, 26px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.55, fontWeight: 300, fontStyle: "italic", marginBottom: "clamp(6px, 0.8vh, 10px)" }}>
                {h.sounds}
              </div>

              <div style={{ paddingTop: "clamp(8px, 1vh, 14px)", borderTop: `1px solid ${h.border}` }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 16px)", letterSpacing: "0.2em", textTransform: "uppercase", color: `${h.color}70`, marginBottom: "clamp(4px, 0.6vh, 8px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400 }}>
                  {h.antidoteLabel}
                </div>
                <div style={{ fontSize: "clamp(16px, 2.2vw, 24px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontWeight: 300 }}>
                  {h.antidote}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "clamp(12px, 1.6vw, 18px)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>
            From John & Julie Gottman — adapted for LifeView
          </div>
          <div style={{ fontSize: "clamp(12px, 1.5vw, 16px)", color: "rgba(255,255,255,0.25)", marginTop: "clamp(4px, 0.6vh, 8px)", letterSpacing: "0.15em", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>
            <a href="https://www.higherpowersedona.org" target="_top" style={{ color: "inherit", textDecoration: "none" }}>higherpowersedona.org</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourHorsemenPoster;
