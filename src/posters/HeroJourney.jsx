import { useEffect } from 'react';

const movements = [
  { num: 1, title: "Hear the Call to Action", desc: "Recognize the omnipresence of psychological warfare within yourself, your relationships, and society at large." },
  { num: 2, title: "Commit to Healing", desc: "Dedicate yourself to the healing of the three conflicts — self, interpersonal, and societal." },
  { num: 3, title: "Discover Your Gifts", desc: "Identify your unique talents and abilities to guide your healing journey and align with your purpose." },
  { num: 4, title: "Make Daily Progress", desc: "Use optimism and discipline to make daily progress toward your healing and personal transformation." },
  { num: 5, title: "Connect with Like-minded Souls", desc: "Attract and collaborate with others who share your frequency, gifts, and vision for healing." },
  { num: 6, title: "Train Daily", desc: "Continually cultivate growth across spiritual, physical, and occupational dimensions of your life." },
  { num: 7, title: "Celebrate Victory", desc: 'Steward each day with purpose, declaring: "I am on mission!"' },
];

const intro = "Now that we are aligned with Source and freed from the control matrix, we are ready to embark on our own Hero's Journey — becoming the hero of our own life story.";

// Locked settings: hue 200, glow depth 8, sky depth 10, card fill 2, text glow 95
const hue = 200;
const accent        = `hsl(${hue}, 75%, 55%)`;
const accentDim     = `hsla(${hue}, 75%, 55%, 0.45)`;
const accentFaint   = `hsla(${hue}, 75%, 55%, 0.13)`;
const accentBorder  = `hsla(${hue}, 75%, 55%, 0.15)`;
const accentFooter  = `hsla(${hue}, 75%, 55%, 0.55)`;
const bgBottom      = `hsl(${hue}, 60%, 8%)`;
const bgMid         = `hsl(${hue}, 40%, 4%)`;
const bgTop         = `hsl(${hue}, 20%, 10%)`;
const bg            = `linear-gradient(to top, ${bgBottom} 0%, ${bgMid} 35%, ${bgTop} 100%)`;
const cardBg        = `hsla(${hue}, 60%, 50%, 0.02)`;
const titleColor    = `hsl(${hue}, 30%, 94%)`;
const bodyTextColor = `hsla(${hue}, 40%, 88%, 0.95)`;
const introColor    = `hsla(${hue}, 50%, 82%, 0.68)`;

export default function SovereignHerosJourney() {
  useEffect(() => {
    const l = document.createElement('link');
    l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap';
    l.rel = 'stylesheet';
    document.head.appendChild(l);
  }, []);

  return (
    <div style={{
      background: bg,
      height: '100vh',
      overflow: 'hidden',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '2.25vh 5vw 2vh',
      boxSizing: 'border-box',
    }}>

      {/* HEADER */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 'clamp(13px, 1.9vw, 20px)',
          letterSpacing: '0.28em',
          color: accent,
          textTransform: 'uppercase',
          marginBottom: 'clamp(6px, 1vh, 12px)',
          fontWeight: 300,
        }}>
          LifeView — Section 4: Become the Hero
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          fontSize: 'clamp(48px, 9.5vw, 100px)',
          fontWeight: 400,
          color: titleColor,
          margin: '2.5vh 0 0',
          lineHeight: 1.05,
        }}>
          The Sovereign
        </h1>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          fontSize: 'clamp(48px, 9.5vw, 100px)',
          fontWeight: 400,
          color: titleColor,
          margin: '0 0 1.5vh',
          lineHeight: 1.05,
        }}>
          Hero's Journey
        </h1>
        <p style={{
          fontStyle: 'italic',
          fontSize: 'clamp(16px, 2.4vw, 28px)',
          color: introColor,
          fontWeight: 300,
          lineHeight: 1.5,
          margin: 0,
        }}>
          {intro}
        </p>
      </div>

      {/* CARDS */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(6px, 1vh, 14px)',
      }}>
        {movements.map((m) => (
          <div key={m.num} style={{
            background: cardBg,
            border: `1px solid ${accentBorder}`,
            borderRadius: 6,
            padding: 'clamp(10px, 1.8vw, 22px) clamp(14px, 2.5vw, 30px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(2px, 0.5vh, 8px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(6px, 1vw, 12px)' }}>
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontSize: 'clamp(14px, 2vw, 22px)',
                color: accentDim,
                fontWeight: 400,
              }}>
                {m.num}.
              </span>
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontSize: 'clamp(22px, 3.5vw, 38px)',
                fontWeight: 400,
                color: titleColor,
                lineHeight: 1.2,
              }}>
                {m.title}
              </span>
            </div>
            <p style={{
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 2.4vw, 26px)',
              fontWeight: 300,
              color: bodyTextColor,
              lineHeight: 1.5,
              margin: 0,
            }}>
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{
        textAlign: 'center',
        paddingTop: 'clamp(8px, 1.5vh, 16px)',
        borderTop: `1px solid ${accentBorder}`,
      }}>
        <div style={{
          fontStyle: 'italic',
          fontSize: 'clamp(16px, 2.4vw, 26px)',
          color: accentFooter,
          marginBottom: 'clamp(4px, 0.5vh, 8px)',
          letterSpacing: '0.02em',
        }}>
          The path was always yours.
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(12px, 1.6vw, 18px)',
          letterSpacing: '0.18em',
          color: `hsla(200, 75%, 55%, 0.65)`,
          textTransform: 'uppercase',
          marginBottom: 'clamp(4px, 0.5vh, 8px)',
          fontWeight: 300,
        }}>
          From Jot Gopal — adapted for LifeView
        </div>
        <div style={{
          fontSize: 'clamp(10px, 1.3vw, 14px)',
          letterSpacing: '0.22em',
          color: accentFaint,
          textTransform: 'uppercase',
        }}>
          higherpowersedona.org
        </div>
      </div>
    </div>
  );
}
