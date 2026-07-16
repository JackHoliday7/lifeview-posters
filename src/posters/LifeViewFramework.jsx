import { useEffect, useRef, useState, useCallback } from 'react';

const gold       = '#c9a84c';
const goldDim    = 'rgba(201,168,76,0.5)';
const goldFaint  = 'rgba(201,168,76,0.15)';
const goldBorder = 'rgba(201,168,76,0.12)';
const cream      = '#f0ece4';
const dimText    = 'rgba(240,236,228,0.6)';
const faintText  = 'rgba(240,236,228,0.28)';

const S1 = 'rgba(140,200,120,0.85)';  // Section 1: Discover Healing — soft green
const S2 = 'rgba(100,160,220,0.85)';  // Section 2: Choose Your Guide — sky blue
const S3 = 'rgba(180,140,220,0.85)';  // Section 3: Align and Activate — soft violet
const S4 = 'rgba(255,190,80,0.85)';   // Section 4: Become the Hero — warm gold
const connections = [
  // Section 1 — Discover Healing (green)
  { from: 'personal',      to: 'three-zones',     color: S1 },
  { from: 'personal',      to: 'five-parts',       color: S1 },
  { from: 'personal',      to: 'five-rhythms',     color: S1 },
  { from: 'interpersonal', to: 'three-keys',       color: S1 },
  { from: 'interpersonal', to: 'four-horsemen',    color: S1 },
  { from: 'interpersonal', to: 'four-agreements',  color: S1 },
  { from: 'societal',      to: 'four-agreements',  color: S1 },
  { from: 'societal',      to: 'three-keys',       color: S1 },
  // Section 2 — Choose Your Guide (blue)
  { from: 'source',        to: 'four-meditations', color: S2 },
  { from: 'source',        to: 'four-agreements',  color: S2 },
  { from: 'control',       to: 'four-enemies',     color: S2 },
  { from: 'control',       to: 'four-horsemen',    color: S2 },
  // Section 3 — Align and Activate (violet)
  { from: 'align',         to: 'five-rhythms',     color: S3 },
  { from: 'align',         to: 'three-zones',      color: S3 },
  { from: 'inner',         to: 'five-parts',       color: S3 },
  { from: 'inner',         to: 'five-rhythms',     color: S3 },
  { from: 'higher',        to: 'four-meditations', color: S3 },
  { from: 'higher',        to: 'five-rhythms',     color: S3 },
  { from: 'higher',        to: 'four-agreements',  color: S3 },
  { from: 'soul',          to: 'four-enemies',     color: S3 },
  { from: 'soul',          to: 'five-rhythms',     color: S3 },
  { from: 'soul',          to: 'four-meditations', color: S3 },
  // Section 4 — Become the Hero (warm gold)
  { from: 'hear',          to: 'three-zones',      color: S4 },
  { from: 'hear',          to: 'four-enemies',     color: S4 },
  { from: 'commit',        to: 'four-horsemen',    color: S4 },
  { from: 'commit',        to: 'four-agreements',  color: S4 },
  { from: 'commit',        to: 'five-rhythms',     color: S4 },
  { from: 'commit',        to: 'four-meditations', color: S4 },
  { from: 'commit',        to: 'three-keys',       color: S4 },
  { from: 'commit',        to: 'three-zones',      color: S4 },
  { from: 'commit',        to: 'five-parts',       color: S4 },
  { from: 'progress',      to: 'five-rhythms',     color: S4 },
  { from: 'progress',      to: 'four-meditations', color: S4 },
  { from: 'train',         to: 'five-parts',       color: S4 },
  { from: 'train',         to: 'five-rhythms',     color: S4 },
  { from: 'train',         to: 'four-meditations', color: S4 },
  { from: 'gifts',         to: 'four-enemies',     color: S4 },
  { from: 'gifts',         to: 'four-meditations', color: S4 },
  { from: 'souls',         to: 'four-agreements',  color: S4 },
  { from: 'souls',         to: 'three-keys',       color: S4 },
  { from: 'victory',       to: 'four-meditations', color: S4 },
  { from: 'victory',       to: 'four-agreements',  color: S4 },
  { from: 'victory',       to: 'five-parts',       color: S4 },
];

const toolkitItems = [
  { id: 'three-zones',      label: 'The Three Zones',      desc: 'Know what state your nervous system is in' },
  { id: 'three-keys',       label: 'The Three Keys',       desc: 'Boundaries, regulation, and forgiveness' },
  { id: 'four-horsemen',    label: 'The Four Horsemen',    desc: 'Four patterns that destroy relationships' },
  { id: 'four-agreements',  label: 'The Four Agreements',  desc: 'A personal code for living with integrity' },
  { id: 'four-enemies',     label: 'The Four Enemies',     desc: 'What blocks your path to sovereignty' },
  { id: 'five-rhythms',     label: 'The Five Rhythms',     desc: 'Move stuck energy through your body' },
  { id: 'five-parts',       label: 'The Five Parts',       desc: 'Understand and lead your inner system' },
  { id: 'four-meditations', label: 'The Four Meditations', desc: 'Clear, ground, protect, and raise vibration' },
];

// All unique left anchors in order
const ANCHORS = ['personal', 'interpersonal', 'societal', 'source', 'control', 'align', 'inner', 'higher', 'soul', 'hear', 'commit', 'progress', 'train', 'gifts', 'souls', 'victory'];
const ANCHOR_LABELS = {
  personal:      'Heal the Self',
  interpersonal: 'Heal Relationships',
  societal:      'Heal Society',
  source:        'Source',
  control:       'Control Matrix',
  align:         'Quiet the Ego',
  inner:         'Heal the Inner Child',
  higher:        'Awaken the Higher Self',
  soul:          'Connect to Soul',
  hear:          'Hear the Call',
  commit:        'Commit to Healing',
  progress:      'Make Daily Progress',
  train:         'Train Daily',
  gifts:         'Discover Your Gifts',
  souls:         'Like-minded Souls',
  victory:       'Celebrate Victory',
};

const ANCHOR_TEXT = {
  personal:      'Cultivate personal sovereignty \u2014 reclaim ownership of your well-being and stand strong in your boundaries. Exercise agency \u2014 make choices and take actions that shape your life.',
  interpersonal: 'Set clear boundaries that build trust and respect. Practice self-awareness and emotional regulation. Forgive \u2014 let go of grudges, rebuild trust, and free yourself from emotional baggage.',
  societal:      'Build genuine connections through empathy and respect. Stand in solidarity \u2014 support each other toward common goals. Share mutual responsibility \u2014 take care of each other to create a more caring environment.',
  source:        'The divine creator energy representing unconditional love, wisdom, and creation. Source is our ultimate guide and the foundation of all healing and truth.',
  control:       'A destructive force driven by fear, violence, and separation \u2014 creating the illusion of division, blocking our connection to Source and offering the choice to harm or to love.',
  align:         'Detach from external validation \u2014 your worth is not determined by others\u2019 opinions. Observe without attachment \u2014 you are not your fears or past mistakes. Cultivate inner stillness through meditation and intentional pauses.',
  inner:         'Acknowledge the wounds without judgment. Connect with your younger self through meditation. Retrieve the original memories where limiting beliefs were implanted. Rewrite them \u2014 visualize an empowered version of the experience.',
  higher:        'Understand you are an expression of Source \u2014 a divine spark exists within you. Make love your guiding principle \u2014 ask \u2018Am I acting from love or fear?\u2019 Expand consciousness by observing without judgment.',
  soul:          'Know yourself \u2014 observe what energizes you and what drains you. Follow what ignites you \u2014 engage in what makes time disappear. Align and act \u2014 make choices that reflect what matters most.',
  hear:          'Define your top 1\u20133 life priorities for the next decade. Write a simple, short Project Plan for each, focused on action. Do it today.',
  commit:        'Reread the \u2018Discover Healing\u2019 steps weekly. Set your intention to act on them daily. Journal if necessary, to improve your batting average.',
  progress:      'At least once each week, review your Project Plans and identify the Next Best Action for each. Then make it happen.',
  train:         'Nourish yourself with healthy food, movement, meditation, and continuous learning. A well-trained vessel carries purpose with power.',
  gifts:         'Look at your top priorities and identify the key talents needed. What can you do yourself? Where do you need to grow? Focus on developing skills that align with your strengths and passions.',
  souls:         'Identify the people you need \u2014 mentors, collaborators, supporters \u2014 and build relationships that help bring your mission to life.',
  victory:       'Every week, acknowledge how far you\u2019ve come. Honor milestones big and small. Celebrate with joy, rest when needed, and rise again.',
};

// Which poster each framework anchor belongs to — long-pressing an item
// jumps the deck (window.top.__lvNav is provided by the site's PosterView;
// harmless no-op when the poster runs standalone). Toolkit item ids are
// already the poster slugs.
const ANCHOR_POSTER = {
  personal: 'three-healings',
  interpersonal: 'three-healings',
  societal: 'three-healings',
  source: 'source-vs-control',
  control: 'source-vs-control',
  align: 'quiet-the-ego',
  inner: 'heal-the-inner-child',
  higher: 'awaken-the-higher-self',
  soul: 'connect-to-soul',
  hear: 'heros-journey',
  commit: 'heros-journey',
  progress: 'heros-journey',
  train: 'heros-journey',
  gifts: 'heros-journey',
  souls: 'heros-journey',
  victory: 'heros-journey',
};

// Section headers jump to the poster of their first item.
const SECTION_POSTER = {
  'Discover Healing': 'three-healings',
  'Choose Your Guide': 'source-vs-control',
  'Align and Activate': 'quiet-the-ego',
  'Become the Hero': 'heros-journey',
};

function Lines({ leftRefs, rightRefs, containerRef, dividerRef, opacity, thickness, activeAnchor }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // All connections share the single vertical spine = the divider line
      const uniqueColors = [...new Set(connections.map(c => c.color))];
      const spineX = dividerRef.current
        ? dividerRef.current.getBoundingClientRect().left - rect.left
        : rect.width * 0.52;
      const colorLane = {};
      uniqueColors.forEach(c => { colorLane[c] = spineX; });

      // Draw active anchor connections only
      if (activeAnchor) {
        const active = connections.filter(c => c.from === activeAnchor);
        active.forEach(({ from, to, color }) => {
          const lEl = leftRefs.current[from];
          const rEl = rightRefs.current[to];
          if (!lEl || !rEl) return;
          const lR = lEl.getBoundingClientRect();
          const rR = rEl.getBoundingClientRect();
          const pad = 10;
          const x1 = lR.right - rect.left + pad;
          const y1 = lR.top + lR.height / 2 - rect.top;
          const x2 = rR.left - rect.left - pad;
          const y2 = rR.top + rR.height / 2 - rect.top;
          const laneX = colorLane[color];

          const col = color.replace(/[\d.]+\)$/, opacity + ')');
          const colGlow = color.replace(/[\d.]+\)$/, '0.2)');
          const aw = 6; // arrowhead size

          // Glow pass
          ctx.strokeStyle = colGlow;
          ctx.lineWidth = thickness * 4;
          ctx.beginPath();
          ctx.moveTo(x1, y1); ctx.lineTo(laneX, y1);
          ctx.lineTo(laneX, y2); ctx.lineTo(x2, y2);
          ctx.stroke();

          // Crisp line
          ctx.strokeStyle = col;
          ctx.lineWidth = thickness;
          ctx.beginPath();
          ctx.moveTo(x1, y1); ctx.lineTo(laneX, y1);
          ctx.lineTo(laneX, y2); ctx.lineTo(x2, y2);
          ctx.stroke();

          // Arrowhead at toolkit end (pointing right, →)
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.moveTo(x2, y2);
          ctx.lineTo(x2 - aw, y2 - aw * 0.5);
          ctx.lineTo(x2 - aw, y2 + aw * 0.5);
          ctx.closePath();
          ctx.fill();

          // Arrowhead at lifeview end (pointing left, ←)
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 + aw, y1 - aw * 0.5);
          ctx.lineTo(x1 + aw, y1 + aw * 0.5);
          ctx.closePath();
          ctx.fill();
        });
      }
    };

    const t = setTimeout(draw, 50);
    window.addEventListener('resize', draw);
    return () => { clearTimeout(t); window.removeEventListener('resize', draw); };
  }, [leftRefs, rightRefs, containerRef, dividerRef, opacity, thickness, activeAnchor]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
}

const STEP = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 'clamp(14px, 2.2vw, 32px)', fontWeight: 400,
  fontStyle: 'normal', color: dimText,
  lineHeight: 1.3,
};

export default function LifeViewMaster() {
  const containerRef = useRef(null);
  const dividerRef   = useRef(null);
  const leftRefs  = useRef({});
  const rightRefs = useRef({});
  const [opacity]     = useState(0.4);
  const [thickness] = useState(0.4);
  const [speed, setSpeed] = useState(8000);
  const [activeAnchor, setActiveAnchor] = useState(ANCHORS[0]);
  const [activeTargets, setActiveTargets] = useState(connections.filter(c => c.from === ANCHORS[0]).map(c => c.to));
  const [playing, setPlaying]     = useState(true);
  const anchorIdx = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      const next = ANCHORS[(anchorIdx.current + 1) % ANCHORS.length];
      anchorIdx.current = (anchorIdx.current + 1) % ANCHORS.length;
      setActiveAnchor(next);
      setActiveTargets(connections.filter(c => c.from === next).map(c => c.to));
    }, speed);
    return () => clearInterval(interval);
  }, [playing, speed]);

  useEffect(() => {
    const l = document.createElement('link');
    l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@300;400&display=swap';
    l.rel = 'stylesheet';
    document.head.appendChild(l);
  }, []);

  // long-press on an item jumps the deck to its poster (tap keeps the
  // highlight behavior). One shared timer — only one press at a time.
  const lpState = useRef({});
  // manual double-click detection for the anchor Steps: the first click's
  // re-render recreates the Step DOM node (Step is defined per-render), so
  // the browser never fires a native dblclick on it
  const lastClickRef = useRef({ id: null, t: 0 });
  const longPress = (slug) => {
    if (!slug) return {};
    const s = lpState.current;
    const clear = () => clearTimeout(s.t);
    return {
      onPointerDown: (e) => {
        s.x = e.clientX; s.y = e.clientY;
        clear();
        s.t = setTimeout(() => { window.top.__lvNav?.jump?.(slug); }, 550);
      },
      onPointerMove: (e) => {
        if (Math.abs(e.clientX - s.x) > 12 || Math.abs(e.clientY - s.y) > 12) clear();
      },
      onPointerUp: clear,
      onPointerLeave: clear,
      onPointerCancel: clear,
    };
  };

  const Step = ({ id, label, dotColor = gold, right = false }) => {
    const isActive = activeAnchor === id;
    const isClickable = id && ANCHORS.includes(id);
    return (
      <div
        ref={id ? el => leftRefs.current[id] = el : undefined}
        {...longPress(id && ANCHOR_POSTER[id])}
        onClick={isClickable ? () => {
          const now = Date.now();
          if (lastClickRef.current.id === id && now - lastClickRef.current.t < 400 && ANCHOR_POSTER[id]) {
            lastClickRef.current = { id: null, t: 0 };
            window.top.__lvNav?.jump?.(ANCHOR_POSTER[id]);
            return;
          }
          lastClickRef.current = { id, t: now };
          setActiveAnchor(id); setActiveTargets(connections.filter(c => c.from === id).map(c => c.to)); setPlaying(false); anchorIdx.current = ANCHORS.indexOf(id);
        } : undefined}
        style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: '0.15vh',
          flexDirection: 'row-reverse',
          justifyContent: 'flex-start',
          cursor: isClickable ? 'pointer' : 'default',
        }}
      >
        <span style={{
          ...STEP,
          textAlign: 'right',
          color: isActive ? cream : dimText,
          fontWeight: isActive ? 700 : 400,
          transition: 'all 0.3s ease',
        }}>{label}</span>

      </div>
    );
  };

  const SectionHeader = ({ num, title }) => {
    const slug = SECTION_POSTER[title];
    return (
      <div
        {...longPress(slug)}
        onClick={slug ? () => {
          // manual double-click detection — same reason as the Steps: the
          // rotation re-render can recreate this node between the two clicks
          const now = Date.now();
          const key = 'section:' + title;
          if (lastClickRef.current.id === key && now - lastClickRef.current.t < 400) {
            lastClickRef.current = { id: null, t: 0 };
            window.top.__lvNav?.jump?.(slug);
            return;
          }
          lastClickRef.current = { id: key, t: now };
        } : undefined}
        style={{ display: 'flex', alignItems: 'baseline', gap: '1vw', marginBottom: '0.3vh', justifyContent: 'flex-end', cursor: slug ? 'pointer' : 'default' }}
      >
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'normal', fontSize: 'clamp(16px, 2.6vw, 36px)', color: goldDim, fontWeight: 700, lineHeight: 1.2, textAlign: 'right', letterSpacing: '0.04em' }}>{title}</span>
      </div>
    );
  };

  return (
    <div style={{ background: '#0a0a0c', height: '100vh', fontFamily: "'Cormorant Garamond', Georgia, serif", display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* HEADER */}
      <div style={{ textAlign: 'center', padding: '1.5vh 4vw 1vh', borderBottom: `1px solid ${goldBorder}`, position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '55vw', height: '8vh', background: 'radial-gradient(ellipse at center top, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 'clamp(9px, 1.1vw, 15px)', letterSpacing: '0.32em', color: goldDim, textTransform: 'uppercase', marginBottom: '0.5vh', fontFamily: "'Cinzel', serif", fontWeight: 300 }}>Higher Power Sedona</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(36px, 7vw, 80px)', fontWeight: 400, color: cream, margin: '0', lineHeight: 1.0 }}>LifeView</h1>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(9px, 1.1vw, 15px)', letterSpacing: '0.26em', color: goldDim, textTransform: 'uppercase', marginBottom: '0.8vh', marginTop: '0.5vh' }}>A Complete Field Guide</div>
        <div style={{ width: '100%', display: 'flex', gap: 0, padding: '0 2vw', boxSizing: 'border-box', marginTop: '0.3vh' }}>
          <div style={{ flex: '0 0 52%', fontStyle: 'italic', fontSize: 'clamp(11px, 1.5vw, 20px)', fontWeight: 300, color: faintText, lineHeight: 1.6, textAlign: 'right', paddingRight: 'clamp(16px, 3vw, 52px)' }}>
            <span style={{ color: goldDim }}>LifeView</span> is a way of living that brings happiness, connection, and meaning.
          </div>
          <div style={{ width: 1, background: goldBorder, flexShrink: 0 }} />
          <div style={{ flex: 1, fontStyle: 'italic', fontSize: 'clamp(11px, 1.5vw, 20px)', fontWeight: 300, color: faintText, lineHeight: 1.6, paddingLeft: 'clamp(16px, 3vw, 52px)', textAlign: 'left' }}>
            <span style={{ color: goldDim }}>The Toolkit</span> is the how-to — where philosophy becomes practice.
          </div>
        </div>

      </div>

      {/* COLUMNS */}
      <div ref={containerRef} style={{ display: 'flex', width: '100%', padding: '0 4vw', position: 'relative', alignItems: 'stretch', boxSizing: 'border-box', flex: 1, minHeight: 0 }}>
        <Lines leftRefs={leftRefs} rightRefs={rightRefs} containerRef={containerRef} dividerRef={dividerRef} opacity={opacity} thickness={thickness} activeAnchor={activeAnchor} />

        {/* LEFT: FRAMEWORK */}
        <div style={{ flex: '0 0 52%', padding: '2vh 3vw 2vh 0', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(9px, 1vw, 14px)', letterSpacing: '0.28em', color: goldDim, textTransform: 'uppercase', marginBottom: '0.8vh', textAlign: 'right' }}>The LifeView Framework</div>

          {/* S1: 3 items */}
          <div style={{ flex: 4, marginBottom: 0, paddingBottom: '1vh', borderBottom: `1px solid ${goldFaint}` }}>
            <SectionHeader num="1" title="Discover Healing" />
            <div style={{ paddingLeft: '3vw' }}>
              <Step right id="personal"      label="Heal the Self"      dotColor="rgba(140,168,104,0.9)" />
              <Step right id="interpersonal" label="Heal Relationships"  dotColor="rgba(201,168,76,0.9)"  />
              <Step right id="societal"      label="Heal Society"        dotColor="rgba(196,136,92,0.9)"  />
            </div>
          </div>

          {/* S2: 2 items */}
          <div style={{ flex: 3, paddingTop: '1vh', paddingBottom: '1vh', borderBottom: `1px solid ${goldFaint}` }}>
            <SectionHeader num="2" title="Choose Your Guide" />
            <div style={{ paddingLeft: '3vw' }}>
              <Step right id="source" label="Source"                                dotColor="rgba(90,140,196,0.9)" />
              <Step right id="control" label="Control Matrix" dotColor="rgba(180,60,60,0.9)"  />
            </div>
          </div>

          {/* S3: 4 items */}
          <div style={{ flex: 5, paddingTop: '1vh', paddingBottom: '1vh', borderBottom: `1px solid ${goldFaint}` }}>
            <SectionHeader num="3" title="Align and Activate" />
            <div style={{ paddingLeft: '3vw' }}>
              <Step right id="align" label="Quiet the Ego"          dotColor="rgba(160,136,184,0.9)" />
              <Step right id="inner" label="Heal the Inner Child"    dotColor="rgba(160,136,184,0.9)" />
              <Step right id="higher" label="Awaken the Higher Self"  dotColor="rgba(160,136,184,0.9)" />
              <Step right id="soul" label="Connect to Soul"         dotColor="rgba(160,136,184,0.9)" />
            </div>
          </div>

          {/* S4: 7 items */}
          <div style={{ flex: 8, paddingTop: '1vh' }}>
            <SectionHeader num="4" title="Become the Hero" />
            <div style={{ paddingLeft: '3vw' }}>
              <Step right id="hear" label="Hear the Call to Action"       dotColor="rgba(201,168,76,0.9)" />
              <Step right id="commit" label="Commit to Healing"              dotColor="rgba(201,168,76,0.9)" />
              <Step right id="gifts" label="Discover Your Gifts"            dotColor="rgba(201,168,76,0.9)" />
              <Step right id="progress" label="Make Daily Progress"            dotColor="rgba(201,168,76,0.9)" />
              <Step right id="souls" label="Connect with Like-minded Souls" dotColor="rgba(201,168,76,0.9)" />
              <Step right id="train" label="Train Daily"                    dotColor="rgba(201,168,76,0.9)" />
              <Step right id="victory" label="Celebrate Victory"              dotColor="rgba(201,168,76,0.9)" />
            </div>
          </div>
        </div>

        {/* RIGHT: TOOLKIT */}
        <div ref={dividerRef} style={{ flex: 1, padding: '2vh 0 2vh 3vw', borderLeft: `1px solid ${goldBorder}`, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(9px, 1vw, 14px)', letterSpacing: '0.28em', color: goldDim, textTransform: 'uppercase', marginBottom: '0.8vh' }}>The LifeView Toolkit</div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {toolkitItems.map((item, idx) => (
              <div
                key={item.id}
                ref={el => rightRefs.current[item.id] = el}
                {...longPress(item.id)}
                onDoubleClick={() => window.top.__lvNav?.jump?.(item.id)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8vw', padding: '0', flex: 1, alignItems: 'center',
                  borderBottom: idx < toolkitItems.length - 1 ? `1px solid ${goldFaint}` : 'none',
                  transition: 'opacity 0.4s ease',
                }}
              >
                <div>
                  <div style={{ ...STEP, marginBottom: '0.2vh', color: activeTargets.includes(item.id) ? cream : dimText, transition: 'color 0.4s ease', fontWeight: activeTargets.includes(item.id) ? 600 : 400 }}>{item.label}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(11px, 1.6vw, 22px)', fontStyle: 'italic', fontWeight: 300, color: activeTargets.includes(item.id) ? 'rgba(240,236,228,0.6)' : 'rgba(240,236,228,0.45)', lineHeight: 1.3, transition: 'color 0.4s ease' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SCRIPT PANEL */}
      <div style={{ width: '100%', padding: '0 4vw', boxSizing: 'border-box', flexShrink: 0 }}>
        <div style={{ borderTop: `1px solid ${goldBorder}`, borderBottom: `1px solid ${goldBorder}`, padding: '0.8vh 3.7vw', minHeight: '5.5vh', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(12px, 1.6vw, 22px)', fontWeight: 300, color: cream, lineHeight: 1.6, textAlign: 'center', margin: 0 }}>
            {ANCHOR_TEXT[activeAnchor]}
          </p>
        </div>
      </div>

      {/* FOOTER BAR — controls + tagline in one line */}
      <div style={{ width: '100%', padding: '0.4vh 4vw', borderTop: `1px solid ${goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5vw', flexWrap: 'wrap', boxSizing: 'border-box', flexShrink: 0 }}>

        {/* Play/Pause + Speed */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7vw' }}>
          <button onClick={() => setPlaying(p => !p)} style={{ background: 'none', border: `1px solid ${goldBorder}`, color: goldDim, fontFamily: "'Cinzel', serif", fontSize: 'clamp(7px, 0.6vw, 10px)', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.25vh 1.3vw', cursor: 'pointer', borderRadius: 2 }}>
            {playing ? '⏸ Pause' : '▶ Play'}
          </button>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(8px, 0.7vw, 12px)', letterSpacing: '0.22em', color: goldDim, textTransform: 'uppercase', marginLeft: '0.7vw' }}>Speed</span>
          {[
            { label: '●', val: 12000, tip: 'Slow' },
            { label: '●●', val: 8000, tip: 'Medium' },
            { label: '●●●', val: 4000, tip: 'Fast' },
            { label: '●●●●', val: 2000, tip: 'Rapid' },
          ].map(({ label, val, tip }) => {
            const active = Math.abs(speed - val) < 100;
            return (
              <button key={val} title={tip} onClick={() => setSpeed(val)}
                style={{
                  background: active ? 'rgba(201,168,76,0.18)' : 'none',
                  border: `1px solid ${active ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.15)'}`,
                  color: active ? gold : 'rgba(201,168,76,0.35)',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: active ? 'clamp(8px, 0.6vw, 11px)' : 'clamp(7px, 0.55vw, 10px)',
                  letterSpacing: '0.1em',
                  padding: '0.3vh 0.9vw',
                  cursor: 'pointer',
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  minWidth: '3.3vw',
                  textAlign: 'center',
                }}>
                {label}
              </button>
            );
          })}
        </div>

        {/* URL right-aligned */}
        <span style={{ fontSize: 'clamp(8px, 0.7vw, 12px)', letterSpacing: '0.22em', color: 'rgba(201,168,76,0.4)', textTransform: 'uppercase', fontFamily: "'Cinzel', serif" }}>higherpowersedona.org</span>

      </div>
    </div>
  );
}
