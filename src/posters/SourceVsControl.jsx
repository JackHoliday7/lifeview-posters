import { useEffect } from 'react';

const pairs = [
  ["Fear",        "Love",          "Don\u2019t let anyone see you\u2019re scared",       "I\u2019m scared. I\u2019ll do it anyway."],
  ["Division",    "Unity",         "It\u2019s us versus them",                          "We don\u2019t have to agree to stand together."],
  ["Reaction",    "Stillness",     "I\u2019ll make them pay for this",                  "I\u2019ll breathe first. Then I\u2019ll choose."],
  ["Performance", "Authenticity",  "They can\u2019t know the real me",                  "This is who I am. I\u2019m done apologizing for that."],
  ["Isolation",   "Connection",    "Nobody understands. I\u2019m better off alone",     "I\u2019ll ask for help. That\u2019s not weakness."],
  ["Illusion",    "Truth",         "If I just keep pretending, it\u2019ll be fine",     "I\u2019ll face what\u2019s real, even if it hurts."],
  ["Harm",        "Creation",      "Destroy it before it destroys you",                "I\u2019ll build something better instead."],
  ["Separation",  "Wholeness",     "That\u2019s their problem, not mine",               "Their pain matters. So does mine."],
];

function ChaosGeometry() {
  // Rattier, more jagged — shorter broken segments, acute angles, spiky shards
  const lines = [
    [12, 8, 18, 31], [38, 15, 22, 18], [67, 5, 71, 12],
    [5, 28, 14, 19], [81, 12, 73, 24], [29, 31, 8, 38],
    [54, 13, 61, 31], [17, 47, 24, 39], [72, 28, 55, 41],
    [6, 54, 15, 42], [41, 68, 28, 55], [88, 19, 74, 28],
    [23, 81, 29, 63], [61, 71, 52, 58], [14, 65, 27, 54],
    [77, 82, 66, 67], [33, 18, 29, 41], [58, 74, 65, 52],
    [48, 87, 35, 74], [91, 45, 77, 53], [3, 64, 11, 47],
    [69, 38, 62, 51], [26, 73, 33, 58], [84, 61, 71, 48],
    [37, 44, 28, 58], [55, 22, 49, 35], [11, 61, 22, 45],
    [74, 67, 61, 74], [22, 88, 31, 74], [46, 98, 53, 81],
    // extra broken bits
    [19, 24, 13, 31], [44, 61, 38, 54], [66, 44, 74, 51],
    [8, 78, 18, 84], [82, 74, 91, 68], [51, 48, 44, 55],
    [31, 91, 24, 84], [73, 88, 81, 94], [16, 38, 9, 44],
    [62, 28, 68, 18], [28, 54, 21, 61], [87, 38, 94, 31],
  ];
  const shards = [
    "M 8 12 L 14 6 L 18 14 L 11 18 Z",
    "M 61 5 L 69 3 L 72 11 L 65 14 L 59 9 Z",
    "M 31 44 L 38 40 L 42 47 L 36 52 L 28 48 Z",
    "M 78 21 L 86 17 L 89 27 L 81 29 Z",
    "M 15 74 L 22 70 L 19 80 L 11 77 Z",
    "M 52 61 L 59 57 L 63 65 L 55 68 Z",
    "M 84 48 L 92 44 L 94 54 L 87 57 Z",
    "M 44 88 L 51 84 L 48 94 Z",
    "M 7 51 L 13 47 L 16 55 L 9 58 Z",
    "M 71 78 L 78 74 L 81 82 L 74 86 Z",
    // spiky triangles
    "M 25 18 L 29 8 L 33 19 Z",
    "M 55 38 L 61 28 L 65 39 Z",
    "M 79 61 L 85 51 L 89 62 Z",
    "M 18 88 L 22 78 L 26 89 Z",
  ];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.32, pointerEvents: 'none' }}>
      {lines.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
          stroke="rgba(220,20,20,0.9)"
          strokeWidth={i % 5 === 0 ? 0.14 : 0.07}
          strokeLinecap="square"
          strokeDasharray={i % 3 === 0 ? "1 0.8" : "none"}
        />
      ))}
      {shards.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(220,20,20,0.9)" strokeWidth="0.06" strokeLinejoin="miter" />
      ))}
    </svg>
  );
}

function SacredGeometry() {
  const cx = 50, cy = 50, r = 12;
  const s = Math.sin(Math.PI / 3);
  const centers = [
    [cx, cy],
    [cx + r, cy], [cx - r, cy],
    [cx + r/2, cy - r*s], [cx - r/2, cy - r*s],
    [cx + r/2, cy + r*s], [cx - r/2, cy + r*s],
    [cx + 2*r, cy], [cx - 2*r, cy],
    [cx + 1.5*r, cy - r*s*2], [cx - 1.5*r, cy - r*s*2],
    [cx + 1.5*r, cy + r*s*2], [cx - 1.5*r, cy + r*s*2],
    [cx, cy - r*2*s], [cx, cy + r*2*s],
  ];
  const metatronLines = [];
  for (let i = 0; i < centers.length; i++) {
    for (let j = i + 1; j < centers.length; j++) {
      metatronLines.push(
        <line key={`m${i}-${j}`}
          x1={`${centers[i][0]}%`} y1={`${centers[i][1]}%`}
          x2={`${centers[j][0]}%`} y2={`${centers[j][1]}%`}
          stroke="rgba(0,210,200,0.9)" strokeWidth="0.03" />
      );
    }
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.32, pointerEvents: 'none' }}>
      {metatronLines}
      {centers.map(([x, y], i) => (
        <circle key={i} cx={`${x}%`} cy={`${y}%`} r={`${r}%`}
          fill="none" stroke="rgba(0,210,200,0.9)" strokeWidth="0.04" />
      ))}
      <circle cx="50%" cy="50%" r="36%" fill="none" stroke="rgba(0,210,200,0.9)" strokeWidth="0.06" />
      <circle cx="50%" cy="50%" r="24%" fill="none" stroke="rgba(0,210,200,0.9)" strokeWidth="0.04" />
    </svg>
  );
}

function GeometryBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%' }}>
        <ChaosGeometry />
      </div>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%' }}>
        <SacredGeometry />
      </div>
    </div>
  );
}

export default function SourceVsControl() {
  useEffect(() => {
    const l = document.createElement('link');
    l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Bebas+Neue&display=swap';
    l.rel = 'stylesheet';
    document.head.appendChild(l);
  }, []);

  const red      = 'rgba(220,20,20,0.88)';
  const teal     = 'rgba(0,210,200,0.88)';
  const redDim   = 'rgba(220,20,20,0.5)';
  const tealDim  = 'rgba(0,210,200,0.5)';

  return (
    <div style={{
      height: '100vh',
      background: '#0a0a0c',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: "'Playfair Display', Georgia, serif",
    }}>

      {/* HEADER */}
      <div style={{
        textAlign: 'center',
        padding: '3vh 3.3vw 2.5vh',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{
          fontSize: 'clamp(10px, 1.3vw, 14px)', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase', marginBottom: '1.2vh',
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
        }}>
          LifeView — Section 2: Recognize
        </div>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic',
            fontSize: 'clamp(42px, 7.5vw, 72px)', fontWeight: 400, color: '#f0ece4', marginBottom: '0.3vh',
          }}>
            Recognize Source
          </div>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic',
            fontSize: 'clamp(42px, 7.5vw, 72px)', fontWeight: 400, color: '#f0ece4',
          }}>
            vs. Control Matrix
          </div>
        </div>
      </div>

      {/* DEFINITIONS */}
      <div style={{
        display: 'flex', width: '100%', margin: '0 auto',
        padding: '2.5vh 5vw', boxSizing: 'border-box', gap: '3.3vw',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: 'clamp(13px, 1.8vw, 20px)', letterSpacing: '0.22em', color: redDim, marginBottom: '0.8vh',
          }}>
            Control Matrix
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(17px, 2.4vw, 26px)', fontWeight: 300, color: 'rgba(240,236,228,0.95)', lineHeight: 1.7, margin: 0,
          }}>
            The destructive force fueled by fear, violence, and separation. It creates the illusion of division, blocking our connection to Source and presenting humanity with the choice to harm or to love.
          </p>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.06)', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(11px, 1.4vw, 16px)', letterSpacing: '0.28em',
            color: tealDim, textTransform: 'uppercase', fontStyle: 'italic', fontWeight: 300, marginBottom: '0.8vh',
          }}>
            Source
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(17px, 2.4vw, 26px)', fontWeight: 300, color: 'rgba(240,236,228,0.95)', lineHeight: 1.7, margin: 0,
          }}>
            The divine creator energy, higher power, and universal force that represents unconditional love, wisdom, and creation. Source is our ultimate guide and the foundation of all healing and truth.
          </p>
        </div>
      </div>

      {/* COLUMN LABELS */}
      <div style={{
        display: 'flex', width: '100%', margin: '0 auto',
        padding: '2vh 5vw 0', boxSizing: 'border-box',
      }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <span style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 'clamp(11px, 1.4vw, 15px)', letterSpacing: '0.22em', color: redDim }}>
            Control Matrix
          </span>
        </div>
        <div style={{ width: '12%' }} />
        <div style={{ flex: 1, textAlign: 'right' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(10px, 1.3vw, 14px)', letterSpacing: '0.28em', color: tealDim, fontStyle: 'italic', fontWeight: 300, textTransform: 'uppercase' }}>
            Source
          </span>
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ width: '100%', margin: '0.8vh auto 0', padding: '0 5vw', boxSizing: 'border-box' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* WORD PAIRS with geometry */}
      <div style={{
        flex: 1, width: '100%', margin: '0 auto',
        padding: '0 5vw 2vh', boxSizing: 'border-box', position: 'relative',
      }}>
        <GeometryBackground />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-around' }}>
          {pairs.map(([control, source, voice, response], idx) => (
            <div key={idx} style={{
              display: 'flex', alignItems: 'center', flex: 1,
              borderBottom: idx < pairs.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <span style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: 'clamp(24px, 4.2vw, 48px)', fontWeight: 400,
                  color: red, letterSpacing: '0.1em',
                }}>
                  {control.toUpperCase()}
                </span>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
                  fontSize: 'clamp(13px, 1.9vw, 20px)', fontWeight: 300,
                  color: 'rgba(220,20,20,0.65)', lineHeight: 1.3,
                  marginTop: 'clamp(1px, 0.2vh, 3px)',
                }}>
                  &ldquo;{voice}&rdquo;
                </div>
              </div>
              <div style={{ width: '12%' }} />
              <div style={{ flex: 1, textAlign: 'right' }}>
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic',
                  fontSize: 'clamp(22px, 3.8vw, 44px)', fontWeight: 400,
                  color: teal, letterSpacing: '-0.01em',
                }}>
                  {source}
                </span>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
                  fontSize: 'clamp(13px, 1.9vw, 20px)', fontWeight: 300,
                  color: 'rgba(0,210,200,0.65)', lineHeight: 1.3,
                  marginTop: 'clamp(1px, 0.2vh, 3px)',
                }}>
                  &ldquo;{response}&rdquo;
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        textAlign: 'center', padding: '1.5vh 3.3vw 2vh',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(14px, 2vw, 22px)',
          color: 'rgba(255,255,255,0.22)', letterSpacing: '0.04em', fontWeight: 300,
        }}>
          Two operating systems. Pick one.
        </div>
        <div style={{ fontSize: 'clamp(8px, 1vw, 10px)', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.1)', textTransform: 'uppercase', fontFamily: "'Cormorant Garamond', serif", marginTop: '0.8vw' }}>
          <a href="https://www.higherpowersedona.org" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>higherpowersedona.org</a>
        </div>
      </div>
    </div>
  );
}
