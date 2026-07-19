import { useState, useEffect } from "react";

const Poster = () => {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const agreements = [
    {
      number: "I",
      name: "Be Impeccable With Your Word",
      color: "#d4a855",
      glow: "rgba(212,168,85,0.5)",
      border: "rgba(212,168,85,0.2)",
      bg: "linear-gradient(135deg, rgba(180,140,50,0.12) 0%, rgba(120,90,30,0.06) 100%)",
      bgHover: "linear-gradient(135deg, rgba(180,140,50,0.25) 0%, rgba(120,90,30,0.15) 100%)",
      meaning: "Speak with integrity. Say only what you mean. Use the power of your word in the direction of truth and love.",
      practice: "Before you speak, ask: Is it true? Is it kind? Is it necessary? Your word creates your world.",
    },
    {
      number: "II",
      name: "Don\u2019t Take Anything Personally",
      color: "#c4885c",
      glow: "rgba(196,136,92,0.5)",
      border: "rgba(196,136,92,0.2)",
      bg: "linear-gradient(135deg, rgba(170,110,60,0.12) 0%, rgba(110,70,35,0.06) 100%)",
      bgHover: "linear-gradient(135deg, rgba(170,110,60,0.25) 0%, rgba(110,70,35,0.15) 100%)",
      meaning: "Nothing others do is because of you. What others say and do is a projection of their own reality, their own dream.",
      practice: "When triggered, pause. Ask: Is this about me, or about them? Their words reveal their world, not your worth.",
    },
    {
      number: "III",
      name: "Don\u2019t Make Assumptions",
      color: "#a8885c",
      glow: "rgba(168,136,92,0.5)",
      border: "rgba(168,136,92,0.2)",
      bg: "linear-gradient(135deg, rgba(150,120,60,0.12) 0%, rgba(100,80,35,0.06) 100%)",
      bgHover: "linear-gradient(135deg, rgba(150,120,60,0.25) 0%, rgba(100,80,35,0.15) 100%)",
      meaning: "Find the courage to ask questions and express what you really want. Communicate clearly to avoid misunderstanding and drama.",
      practice: "Notice the story you\u2019re telling yourself. Then ask. The truth is almost never what you imagined.",
    },
    {
      number: "IV",
      name: "Always Do Your Best",
      color: "#8ca868",
      glow: "rgba(140,168,104,0.5)",
      border: "rgba(140,168,104,0.2)",
      bg: "linear-gradient(135deg, rgba(120,150,80,0.12) 0%, rgba(75,100,45,0.06) 100%)",
      bgHover: "linear-gradient(135deg, rgba(120,150,80,0.25) 0%, rgba(75,100,45,0.15) 100%)",
      meaning: "Your best changes from moment to moment. Under any circumstance, simply do your best and you will avoid self-judgment and regret.",
      practice: "Not perfection. Not yesterday\u2019s best. Today\u2019s best, right now, with what you have. That is always enough.",
    },
  ];

  return (
    <div style={{ width: "100%", height: "100vh", background: "linear-gradient(180deg, #0f0d0a 0%, #0a0a0f 50%, #0f0d0a 100%)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2vh 5vw", boxSizing: "border-box", fontFamily: "'Georgia', 'Times New Roman', serif", position: "relative" }}>

      {/* Subtle warm glow */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 30%, rgba(180,140,60,0.15) 0%, transparent 70%)" }} />
      {/* Grain */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(13px, 1.9vw, 20px)", letterSpacing: "0.35em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "clamp(8px, 1.5vh, 16px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>
          LifeView Toolkit &#x2014; Integrity Framework
        </div>
        <h1 style={{ fontSize: "clamp(52px, 10vw, 110px)", fontWeight: 700, color: "#d4bc8a", margin: 0, lineHeight: 1.0, letterSpacing: "0.08em", fontFamily: "'Amatic SC', cursive", textTransform: "uppercase", textShadow: "0 2px 0 rgba(0,0,0,0.6), 0 0 60px rgba(180,140,50,0.1)" }}>
          The Four<br/>Agreements
        </h1>
        <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,168,85,0.4), transparent)", margin: "clamp(8px, 1.5vh, 16px) auto 0" }} />
        <div style={{ fontSize: "clamp(16px, 2.4vw, 26px)", color: "rgba(212,188,138,0.45)", marginTop: "clamp(6px, 1vh, 14px)", fontStyle: "italic", fontWeight: 300, letterSpacing: "0.05em" }}>
          Toltec wisdom for daily practice
        </div>
      </div>

      {/* Four Cards */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "clamp(10px, 2vh, 22px)", position: "relative", zIndex: 1, margin: "clamp(12px, 2.5vh, 30px) 0" }}>
        {agreements.map((a, i) => (
          <div key={a.name} onMouseEnter={() => setActiveCard(i)} onMouseLeave={() => setActiveCard(null)} style={{
            flex: 1,
            borderRadius: "6px",
            padding: "clamp(6px, 0.8vh, 12px) clamp(14px, 2.5vw, 30px)",
            background: activeCard === i ? a.bgHover : a.bg,
            border: `1px solid ${a.border}`,
            cursor: "default",
            // background only — "all" also animates the vh-based padding,
            // which feedback-loops with the site's flow-height measurement
            transition: "background 0.4s ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}>

            <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px, 1.5vw, 16px)", marginBottom: "clamp(4px, 0.7vh, 10px)" }}>
              <span style={{ fontSize: "clamp(14px, 2vw, 22px)", color: a.color + "60", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, letterSpacing: "0.1em", minWidth: "clamp(20px, 3vw, 32px)" }}>{a.number}</span>
              <h2 style={{ fontSize: "clamp(22px, 3.8vw, 42px)", fontWeight: 400, color: a.color, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{a.name}</h2>
            </div>

            <div style={{ fontSize: "clamp(16px, 2.4vw, 26px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.55, fontWeight: 300, marginBottom: "clamp(4px, 0.6vh, 8px)", paddingLeft: "clamp(28px, 4.5vw, 50px)" }}>
              {a.meaning}
            </div>

            <div style={{ paddingTop: "clamp(4px, 0.6vh, 8px)", borderTop: `1px solid ${a.border}`, paddingLeft: "clamp(28px, 4.5vw, 50px)" }}>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 16px)", letterSpacing: "0.2em", textTransform: "uppercase", color: a.color + "70", marginBottom: "clamp(3px, 0.4vh, 6px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400 }}>Practice</div>
              <div style={{ fontSize: "clamp(15px, 2.2vw, 24px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, fontWeight: 300 }}>{a.practice}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(12px, 1.6vw, 18px)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>From Don Miguel Ruiz &#x2014; adapted for LifeView</div>
        <div style={{ fontSize: "clamp(12px, 1.5vw, 16px)", color: "rgba(255,255,255,0.25)", marginTop: "clamp(4px, 0.6vh, 8px)", letterSpacing: "0.15em", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}><a href="https://www.higherpowersedona.org" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>higherpowersedona.org</a></div>
      </div>
    </div>
  );
};

export default Poster;
