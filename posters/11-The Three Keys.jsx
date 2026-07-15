import { useState, useEffect } from "react";

export default function ThreeKeys() {
  useEffect(() => {
    const link1 = document.createElement("link");
    link1.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);
    const link2 = document.createElement("link");
    link2.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap";
    link2.rel = "stylesheet";
    document.head.appendChild(link2);
    return () => { document.head.removeChild(link1); document.head.removeChild(link2); };
  }, []);

  const keys = [
    {
      label: "Know What You're Feeling",
      color: "#5a9ec4",
      borderColor: "rgba(90,158,196,0.4)",
      bgColor: "rgba(90,158,196,0.04)",
      body: "Stop and ask: what am I actually feeling? Not \"fine.\" Be specific.",
      formula: 'Angry? Disappointed? Betrayed? Exhausted? The more precise, the more power.',
    },
    {
      label: "Be Honest About It",
      color: "#c4a855",
      borderColor: "rgba(196,168,85,0.4)",
      bgColor: "rgba(196,168,85,0.04)",
      body: "Say what you feel. Not as blame. As information.",
      formula: '"I feel [unwanted emotion]. I\'d rather feel [desired emotion]."',
    },
    {
      label: "Make a Clear Request",
      color: "#6abf8a",
      borderColor: "rgba(106,191,138,0.4)",
      bgColor: "rgba(106,191,138,0.04)",
      body: "Your emotions are yours. Ask for what you need.",
      formula: '"Could you [specific action]? That would help me feel [desired emotion]."',
    },
  ];

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      background: "linear-gradient(180deg, #121820 0%, #101518 30%, #0e1316 70%, #101518 100%)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "2.25vh 4vw 2vh",
      boxSizing: "border-box",
      position: "relative",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,10,14,0.5) 100%)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(13px, 1.9vw, 20px)", letterSpacing: "0.35em", color: "rgba(160,190,210,0.4)", textTransform: "uppercase", marginBottom: "clamp(6px, 1vh, 12px)", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>
          LifeView Toolkit &#x2014; Clear Communication
        </div>
        <h1 style={{ fontSize: "clamp(48px, 9.5vw, 100px)", fontWeight: 400, color: "rgba(240,240,235,0.9)", margin: "1.5vh 0 0", lineHeight: 1.1, fontFamily: "'Playfair Display', serif", fontStyle: "italic", letterSpacing: "-0.01em", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
          The Three Keys
        </h1>
        <div style={{ fontSize: "clamp(16px, 2.4vw, 28px)", color: "rgba(160,190,210,0.45)", marginTop: "clamp(6px, 1vh, 12px)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.5 }}>
          To relationship success.
        </div>
      </div>

      {/* Three Keys — side by side */}
      <div style={{ display: "flex", gap: "clamp(8px, 1.5vw, 16px)", position: "relative", zIndex: 1 }}>
        {keys.map((k) => (
          <div key={k.label} style={{
            flex: 1,
            background: k.bgColor,
            borderLeft: `3px solid ${k.borderColor}`,
            borderRadius: "0 6px 6px 0",
            padding: "clamp(14px, 2.5vw, 28px) clamp(12px, 2vw, 24px)",
            boxShadow: `inset 0 0 30px ${k.bgColor}`,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(6px, 1vh, 14px)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1vw, 10px)" }}>
              <span style={{ width: "clamp(8px, 1.2vw, 12px)", height: "clamp(8px, 1.2vw, 12px)", borderRadius: "50%", background: k.color, opacity: 0.7, display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: "clamp(20px, 3.2vw, 34px)", fontWeight: 600, color: "rgba(240,240,235,0.85)", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.15 }}>{k.label}</span>
            </div>
            <div style={{ fontSize: "clamp(15px, 2.2vw, 24px)", color: "rgba(240,240,235,0.6)", fontWeight: 400, lineHeight: 1.5 }}>{k.body}</div>
            <div style={{ fontSize: "clamp(14px, 2vw, 22px)", color: k.color, fontStyle: "italic", fontWeight: 400, lineHeight: 1.5, opacity: 0.55 }}>{k.formula}</div>
          </div>
        ))}
      </div>

      {/* Section divider */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(12px, 1.7vw, 18px)", letterSpacing: "0.22em", color: "rgba(160,190,210,0.4)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400, textTransform: "uppercase" }}>How it sounds in real life</div>
      </div>

      {/* Real scenarios */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "clamp(10px, 2vh, 24px)" }}>
        {[
          {
            title: "Right now, tonight",
            her: "I feel overwhelmed. We have twenty people coming tomorrow and the sink is full. I know you had a long day, but could you wash the dishes so I can get to bed early for meal prep?",
            him: "I feel embarrassed. I just told that story and you corrected me in front of everyone. Could you tell me later when it\u2019s just us?",
          },
          {
            title: "Right now, this weekend",
            her: "I feel panicked. Your mom just invited herself for Friday and I have nothing planned. I\u2019d rather not do this alone. Could you call her and find out what she wants for dinner so I know what to buy?",
            him: "I feel hurt. I just walked in and you didn\u2019t look up. I\u2019d rather feel like you\u2019re glad I\u2019m home. Could you come say hi?",
          },
          {
            title: "Right now, in bed",
            her: "I feel tense. Today was brutal and I just need to be held. Could you just put your arm around me tonight? That\u2019s all I need.",
            him: "I feel rejected. I just reached for you and you moved away. I\u2019d rather feel wanted. Could you tell me what you need so I\u2019m not guessing?",
          },
        ].map(s => (
          <div key={s.title} style={{
            padding: "clamp(14px, 2.5vw, 28px)",
            borderRadius: "6px",
            background: "rgba(160,190,210,0.03)",
            border: "1px solid rgba(160,190,210,0.08)"
          }}>
            <div style={{ fontSize: "clamp(12px, 1.6vw, 18px)", color: "rgba(160,190,210,0.5)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, marginBottom: "clamp(6px, 1vh, 12px)", textAlign: "center", fontStyle: "italic" }}>{s.title}</div>
            <div style={{ fontSize: "clamp(17px, 2.5vw, 28px)", color: "rgba(240,240,235,0.75)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic", lineHeight: 1.55, marginBottom: "clamp(6px, 1vh, 12px)" }}>
              <span style={{ color: "rgba(200,160,180,0.7)", fontSize: "clamp(11px, 1.4vw, 16px)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400 }}>She:&nbsp;&nbsp;</span>
              {s.her}
            </div>
            <div style={{ fontSize: "clamp(17px, 2.5vw, 28px)", color: "rgba(240,240,235,0.75)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic", lineHeight: 1.55 }}>
              <span style={{ color: "rgba(140,170,200,0.7)", fontSize: "clamp(11px, 1.4vw, 16px)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400 }}>He:&nbsp;&nbsp;</span>
              {s.him}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, paddingTop: "clamp(8px, 1.5vh, 16px)", borderTop: "1px solid rgba(160,190,210,0.08)" }}>
        <div style={{ fontSize: "clamp(16px, 2.2vw, 24px)", color: "rgba(160,190,210,0.35)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, lineHeight: 1.5, marginBottom: "clamp(4px, 0.5vh, 8px)" }}>
          Simple doesn't mean easy. But practice this, and watch everything shift.
        </div>
        <div style={{ fontSize: "clamp(11px, 1.4vw, 16px)", color: "rgba(160,190,210,0.25)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300, marginBottom: "clamp(4px, 0.5vh, 8px)" }}>
          From Dr. John Delony &#x2014; adapted for LifeView
        </div>
        <div style={{ fontSize: "clamp(10px, 1.3vw, 14px)", color: "rgba(160,190,210,0.2)", letterSpacing: "0.18em", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>higherpowersedona.org</div>
      </div>
    </div>
  );

}
