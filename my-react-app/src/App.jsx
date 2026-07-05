import { useState, useEffect, useRef } from "react";
import "./styles.css";

/* ── Intersection observer hook ── */
function useInView(threshold) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: threshold || 0.12 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ── FadeUp ── */
function FadeUp({ children, delay, style }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={"fade-up" + (vis ? " in" : "")}
      style={{
        transitionDelay: (delay || 0) + "ms",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Gold HR ── */
const GoldHR = () => <hr className="gold-hr" />;

/* ──────────── SVGs ──────────── */
function DiamondSVG({ size }) {
  const s = size || 80;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="50%" stopColor="#F0DFA0" />
          <stop offset="100%" stopColor="#9A7B30" />
        </linearGradient>
        <linearGradient id="dg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0DFA0" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
      </defs>
      <polygon
        points="50,5 85,35 50,95 15,35"
        fill="none"
        stroke="url(#dg)"
        strokeWidth="1.5"
      />
      <polygon
        points="50,5 85,35 50,55 15,35"
        fill="url(#dg2)"
        opacity="0.28"
      />
      <polygon
        points="50,55 85,35 50,95"
        fill="none"
        stroke="url(#dg)"
        strokeWidth="1"
        opacity="0.6"
      />
      <polygon
        points="50,55 15,35 50,95"
        fill="none"
        stroke="url(#dg)"
        strokeWidth="1"
        opacity="0.4"
      />
      <line
        x1="15"
        y1="35"
        x2="85"
        y2="35"
        stroke="url(#dg)"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

function RingSVG({ size }) {
  const s = size || 200;
  return (
    <svg width={s} height={s} viewBox="0 0 160 160" fill="none">
      <defs>
        <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7B30" />
          <stop offset="30%" stopColor="#C9A84C" />
          <stop offset="60%" stopColor="#F0DFA0" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
        <linearGradient id="dr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0DFA0" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
        <linearGradient id="dr2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C97A" />
          <stop offset="100%" stopColor="#9A7B30" />
        </linearGradient>
      </defs>
      <ellipse
        cx="80"
        cy="80"
        rx="68"
        ry="68"
        stroke="url(#rg)"
        strokeWidth="12"
        opacity="0.9"
      />
      <ellipse
        cx="80"
        cy="80"
        rx="68"
        ry="30"
        stroke="url(#rg)"
        strokeWidth="2"
        opacity="0.35"
      />
      <ellipse
        cx="80"
        cy="80"
        rx="56"
        ry="56"
        stroke="url(#rg)"
        strokeWidth="1"
        opacity="0.25"
      />
      <polygon
        points="80,16 93,30 80,44 67,30"
        fill="url(#dr)"
        opacity="0.95"
      />
      <polygon
        points="80,16 93,30 80,36 67,30"
        fill="url(#dr2)"
        opacity="0.55"
      />
      <circle
        cx="142"
        cy="38"
        r="2"
        fill="#F0DFA0"
        className="spark"
        style={{ animationDelay: "0s" }}
      />
      <circle
        cx="18"
        cy="120"
        r="1.5"
        fill="#F0DFA0"
        className="spark"
        style={{ animationDelay: "0.7s" }}
      />
      <circle
        cx="132"
        cy="122"
        r="1"
        fill="#E8C97A"
        className="spark"
        style={{ animationDelay: "1.4s" }}
      />
    </svg>
  );
}

/* ──────────── NAVBAR ──────────── */
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function go(p) {
    setPage(p);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const links = [
    { label: "Collections", p: "home" },
    { label: "About", p: "about" },
    { label: "Contact", p: "contact" },
  ];

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <button className="nav-brand" onClick={() => go("home")}>
        <DiamondSVG size={26} />
        <span className="nav-brand-text shimmer">AURUM</span>
      </button>
      <div className="nav-links">
        {links.map((l) => (
          <button
            key={l.p}
            className={"nav-link" + (page === l.p ? " active" : "")}
            onClick={() => go(l.p)}
          >
            {l.label}
          </button>
        ))}
        <button className="btn-gold nav-enquire" onClick={() => go("contact")}>
          Enquire
        </button>
      </div>
      <button className="hamburger" onClick={() => setOpen(!open)}>
        <span className={"ham-bar" + (open ? " open-1" : "")} />
        <span className={"ham-bar" + (open ? " open-2" : "")} />
        <span className={"ham-bar" + (open ? " open-3" : "")} />
      </button>
      {open && (
        <div className="mobile-menu menu-in">
          {links.map((l) => (
            <button key={l.p} className="mobile-link" onClick={() => go(l.p)}>
              {l.label}
            </button>
          ))}
          <button className="btn-gold" onClick={() => go("contact")}>
            Enquire Now
          </button>
        </div>
      )}
    </nav>
  );
}

/* ──────────── HERO ──────────── */
function Hero({ setPage }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const orbits = [0, 72, 144, 216, 288].map((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    return (
      <div
        key={i}
        className="orbit-dot glow-dot"
        style={{
          top: 50 + 46 * Math.sin(rad) + "%",
          left: 50 + 46 * Math.cos(rad) + "%",
          animationDelay: i * 0.6 + "s",
        }}
      />
    );
  });

  return (
    <section className="hero">
      <div className="hero-inner">
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateX(-30px)",
            transition: "opacity .9s ease, transform .9s ease",
          }}
        >
          <p className="hero-eyebrow">EST. MMVIII — MAISON DE JOAILLERIE</p>
          <h1 className="hero-h1 f-display">
            <span style={{ display: "block", color: "var(--ivory)" }}>
              Where
            </span>
            <span style={{ display: "block" }} className="shimmer">
              Eternity
            </span>
            <span style={{ display: "block", color: "var(--ivory)" }}>
              is Crafted
            </span>
          </h1>
          <p className="hero-sub">
            Each piece born from centuries of mastery. Rare gemstones,
            hand-selected. Precious metals, meticulously formed. Jewellery that
            transcends generations.
          </p>
          <div className="hero-btns">
            <button
              className="btn-gold"
              onClick={() =>
                document
                  .getElementById("collections")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Collections
            </button>
            <button
              className="btn-outline"
              onClick={() => {
                setPage("about");
                window.scrollTo({ top: 0 });
              }}
            >
              Our Atelier
            </button>
          </div>
          <div className="hero-stats">
            {[
              ["1.2K+", "Bespoke Pieces"],
              ["94", "Years Legacy"],
              ["18K", "Pure Gold"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="f-cinzel hero-stat-n shimmer">{n}</div>
                <div className="hero-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateX(30px)",
            transition: "opacity 1s ease .3s, transform 1s ease .3s",
          }}
        >
          <div className="hero-img-wrap">
            <div className="hero-img-container float">
              <img
                src="/images/hero.png"
                alt="AURUM Fine Jewellery"
                className="hero-image"
              />
              <div className="hero-ring-overlay">
                <RingSVG size={180} />
              </div>
            </div>
            <div className="hero-glow" />
            {orbits}
          </div>
        </div>
      </div>
      <div className="scroll-cue scroll-bounce">
        <span className="scroll-label">SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

/* ──────────── COLLECTIONS ──────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Lumière Solitaire",
    cat: "RINGS",
    price: "£8,500",
    desc: "2.1ct VS1 Diamond, Platinum Band",
    accent: "#E8C97A",
    bg: "linear-gradient(135deg,#1A1A24,#2E2E3D)",
    shape: "ring",
  },
  {
    id: 2,
    name: "Étoile Pendant",
    cat: "NECKLACES",
    price: "£4,200",
    desc: "Pear-cut Sapphire, 18K White Gold",
    accent: "#A8C4E8",
    bg: "linear-gradient(135deg,#1A1A24,#24242D)",
    shape: "pendant",
  },
  {
    id: 3,
    name: "Aurora Bangles",
    cat: "BRACELETS",
    price: "£6,800",
    desc: "Pavé Diamonds, 18K Rose Gold",
    accent: "#E8A878",
    bg: "linear-gradient(135deg,#1A1A24,#2A2020)",
    shape: "bangle",
  },
  {
    id: 4,
    name: "Nuit Drops",
    cat: "EARRINGS",
    price: "£3,100",
    desc: "Tahitian Pearl, 22K Gold",
    accent: "#C8D8C8",
    bg: "linear-gradient(135deg,#1A1A24,#1A2020)",
    shape: "drops",
  },
  {
    id: 5,
    name: "Soleil Tiara",
    cat: "RARE",
    price: "£22,000",
    desc: "Multi-stone, Emerald & Diamonds",
    accent: "#A8D4A0",
    bg: "linear-gradient(135deg,#1E1A10,#2A2010)",
    shape: "tiara",
  },
  {
    id: 6,
    name: "Minuit Cuff",
    cat: "BRACELETS",
    price: "£9,400",
    desc: "Black Diamond Pavé, Blackened Gold",
    accent: "#C0C0D8",
    bg: "linear-gradient(135deg,#0F0F18,#1A1A2A)",
    shape: "cuff",
  },
];

function shapeFor(p) {
  const a = p.accent;
  if (p.shape === "ring")
    return (
      <svg viewBox="0 0 100 100" width={90} height={90} fill="none">
        <ellipse
          cx={50}
          cy={50}
          rx={42}
          ry={42}
          stroke={a}
          strokeWidth={8}
          opacity={0.85}
        />
        <ellipse
          cx={50}
          cy={50}
          rx={42}
          ry={18}
          stroke={a}
          strokeWidth={1.5}
          opacity={0.38}
        />
        <polygon points="50,10 58,20 50,30 42,20" fill={a} opacity={0.9} />
      </svg>
    );
  if (p.shape === "pendant")
    return (
      <svg viewBox="0 0 100 120" width={75} height={90} fill="none">
        <line x1={50} y1={0} x2={50} y2={22} stroke={a} strokeWidth={1.5} />
        <circle cx={50} cy={26} r={4} fill={a} opacity={0.5} />
        <polygon
          points="50,35 72,57 60,82 40,82 28,57"
          fill="none"
          stroke={a}
          strokeWidth={1.5}
        />
        <polygon points="50,35 72,57 50,64 28,57" fill={a} opacity={0.2} />
      </svg>
    );
  if (p.shape === "bangle")
    return (
      <svg viewBox="0 0 120 60" width={110} height={55} fill="none">
        <ellipse
          cx={60}
          cy={30}
          rx={54}
          ry={22}
          stroke={a}
          strokeWidth={6.5}
          opacity={0.85}
        />
        <ellipse
          cx={60}
          cy={30}
          rx={44}
          ry={14}
          stroke={a}
          strokeWidth={1}
          opacity={0.3}
        />
      </svg>
    );
  if (p.shape === "drops")
    return (
      <svg viewBox="0 0 100 120" width={80} height={96} fill="none">
        <circle
          cx={30}
          cy={20}
          r={12}
          stroke={a}
          strokeWidth={1.5}
          opacity={0.65}
        />
        <circle
          cx={70}
          cy={20}
          r={12}
          stroke={a}
          strokeWidth={1.5}
          opacity={0.65}
        />
        <ellipse
          cx={30}
          cy={76}
          rx={10}
          ry={22}
          fill="none"
          stroke={a}
          strokeWidth={1.5}
          opacity={0.85}
        />
        <ellipse
          cx={70}
          cy={76}
          rx={10}
          ry={22}
          fill="none"
          stroke={a}
          strokeWidth={1.5}
          opacity={0.85}
        />
      </svg>
    );
  if (p.shape === "tiara")
    return (
      <svg viewBox="0 0 140 80" width={120} height={70} fill="none">
        <path
          d="M10,70 Q35,10 70,5 Q105,10 130,70"
          stroke={a}
          strokeWidth={2}
          fill="none"
          opacity={0.72}
        />
        <polygon points="70,5 77,25 70,36 63,25" fill={a} opacity={0.85} />
        <polygon points="35,28 41,43 35,52 29,43" fill={a} opacity={0.6} />
        <polygon points="105,28 111,43 105,52 99,43" fill={a} opacity={0.6} />
      </svg>
    );
  /* cuff */
  return (
    <svg viewBox="0 0 120 80" width={110} height={75} fill="none">
      <rect
        x={5}
        y={20}
        width={110}
        height={40}
        rx={20}
        stroke={a}
        strokeWidth={7}
        fill="none"
        opacity={0.85}
      />
      <rect
        x={15}
        y={28}
        width={90}
        height={24}
        rx={12}
        stroke={a}
        strokeWidth={1}
        fill="none"
        opacity={0.3}
      />
    </svg>
  );
}

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  
  const imageMapping = {
    ring: "ring.png",
    pendant: "necklace.png",
    bangle: "bangle.png",
    drops: "earrings.png",
    tiara: "tiara.png",
    cuff: "cuff.png"
  };
  
  const imagePath = `/images/products/${imageMapping[product.shape]}`;

  return (
    <div className="product-card" style={{ background: product.bg }}>
      <div className="product-art" style={{ background: product.bg }}>
        {!imageError ? (
          <img
            src={imagePath}
            alt={product.name}
            className="product-image"
            onError={() => setImageError(true)}
          />
        ) : (
          shapeFor(product)
        )}
        <div className="product-badge f-cinzel">{product.cat}</div>
      </div>
      <div className="product-info">
        <div className="product-row">
          <div>
            <div className="product-name">{product.name}</div>
            <div className="product-desc" style={{ marginTop: ".3rem" }}>
              {product.desc}
            </div>
          </div>
          <span className="f-cinzel shimmer" style={{ fontSize: ".82rem" }}>
            {product.price}
          </span>
        </div>
        <button
          className="btn-outline product-cta"
          style={{ fontSize: ".62rem", letterSpacing: ".2em" }}
        >
          View Piece
        </button>
      </div>
    </div>
  );
}

function Collections() {
  const CATS = ["ALL", "RINGS", "NECKLACES", "BRACELETS", "EARRINGS", "RARE"];
  const [filter, setFilter] = useState("ALL");
  const shown =
    filter === "ALL" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  return (
    <section id="collections" className="section collections-bg">
      <div className="section-inner">
        <FadeUp>
          <p className="eyebrow">THE COLLECTION</p>
          <h2 className="section-h2">
            Curated <em className="shimmer">Excellence</em>
          </h2>
          <p className="section-sub">— Each piece, a singular masterwork —</p>
        </FadeUp>
        <GoldHR />
        <FadeUp delay={180}>
          <div className="filter-bar">
            {CATS.map((c) => (
              <button
                key={c}
                className={"filter-btn" + (filter === c ? " active" : "")}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </FadeUp>
        <div className="products-grid">
          {shown.map((p, i) => (
            <FadeUp key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────── WHY AURUM ──────────── */
function WhyAurum() {
  const pillars = [
    {
      icon: "✦",
      title: "Master Craftsmen",
      text: "Fourth-generation artisans. Every setting, every facet placed by hands that have spent lifetimes in the craft.",
    },
    {
      icon: "◈",
      title: "Ethically Sourced",
      text: "Every stone traced to its origin. Conflict-free, responsibly mined, certified by the world's foremost gemological institutes.",
    },
    {
      icon: "❖",
      title: "Bespoke Creation",
      text: "Your vision, our mastery. Commission a piece as singular as the occasion it commemorates — designed with you.",
    },
    {
      icon: "◇",
      title: "Lifetime Guarantee",
      text: "Jewellery passes through generations. Our service pledge ensures every Aurum piece endures — pristine, forever.",
    },
  ];
  return (
    <section className="section why-bg">
      <div className="section-inner">
        <FadeUp>
          <p className="eyebrow">THE AURUM PROMISE</p>
          <h2 className="section-h2">
            Why Discerning <em className="shimmer">Clients</em> Choose Us
          </h2>
        </FadeUp>
        <div className="pillars-grid">
          {pillars.map((p, i) => (
            <FadeUp key={p.title} delay={i * 110}>
              <div className="pillar">
                <div className="pillar-icon">
                  <span className="shimmer">{p.icon}</span>
                </div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-text">{p.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────── TESTIMONIALS ──────────── */
const TESTIS = [
  {
    name: "Isabella Fontaine-Morris",
    role: "Art Collector, Paris",
    text: "The engagement ring Aurum created surpassed every expectation. Their mastery of light within the stone is something I have never witnessed elsewhere. It moves with the wearer.",
  },
  {
    name: "Lord Edmund Ashworth",
    role: "Heritage Trustee, London",
    text: "I commissioned three anniversary pieces over a decade. Each transcends the last. Aurum's craftsmanship belongs in the same conversation as the great Maisons of the last century.",
  },
  {
    name: "Priya Mehta-Oduya",
    role: "Fashion Director, Milan",
    text: "From the very first consultation, I understood this was different. They listened to a memory — a jasmine garden at dusk — and translated it into the most extraordinary necklace.",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setActive((a) => (a + 1) % TESTIS.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section" style={{ background: "var(--obsidian)" }}>
      <div className="section-inner">
        <FadeUp>
          <p className="eyebrow">CLIENT VOICES</p>
          <h2 className="section-h2">
            Worn with <em className="shimmer">Pride</em>
          </h2>
        </FadeUp>
        <div className="testi-grid">
          {TESTIS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 130}>
              <div
                className={"testi-card" + (i === active ? " active-t" : "")}
                onClick={() => setActive(i)}
              >
                <div className="stars">★★★★★</div>
                <p className="testi-quote">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-initial shimmer">{t.name[0]}</div>
                  <div>
                    <p className="testi-name">{t.name}</p>
                    <p className="testi-role">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        <div className="testi-dots">
          {TESTIS.map((_, i) => (
            <button
              key={i}
              className="testi-dot"
              onClick={() => setActive(i)}
              style={{
                width: i === active ? "40px" : "16px",
                background: i === active ? "var(--gold)" : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────── CTA ──────────── */
function CTA({ setPage }) {
  return (
    <section className="cta-section">
      <div className="cta-glow">
        <div className="cta-glow-orb" />
      </div>
      <div className="cta-inner">
        <FadeUp>
          <DiamondSVG size={48} />
          <h2 className="cta-h2">
            Begin Your <em className="shimmer">Story</em>
          </h2>
          <p className="cta-sub">
            Commission a bespoke piece, or speak with our consultants about
            finding something extraordinary from our private collection. Every
            inquiry is treated with absolute discretion.
          </p>
          <div className="cta-btns">
            <button
              className="btn-gold"
              onClick={() => {
                setPage("contact");
                window.scrollTo({ top: 0 });
              }}
            >
              Book a Consultation
            </button>
            <button
              className="btn-outline"
              onClick={() => {
                setPage("about");
                window.scrollTo({ top: 0 });
              }}
            >
              Our Heritage
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ──────────── HOME PAGE ──────────── */
function HomePage({ setPage }) {
  return (
    <div className="page-in">
      <Hero setPage={setPage} />
      <Collections />
      <WhyAurum />
      <Testimonials />
      <CTA setPage={setPage} />
    </div>
  );
}

/* ── Team Member Card with image fallback ── */
function TeamMemberCard({ member, delay }) {
  const [imageError, setImageError] = useState(false);
  const teamImageMapping = {
    "Sophie Aurum": "/images/team/sophie.png",
    "Marcel Dupont": "/images/team/marcel.png",
    "Kenji Tanaka": "/images/team/kenji.png"
  };

  return (
    <FadeUp delay={delay}>
      <div className="team-card">
        <div className="team-avatar">
          {!imageError ? (
            <img
              src={teamImageMapping[member.name]}
              alt={member.name}
              className="team-avatar-img"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="shimmer">{member.initial}</span>
          )}
        </div>
        <p className="team-name">{member.name}</p>
        <p className="team-role">{member.role}</p>
        <p className="team-gen">{member.gen}</p>
      </div>
    </FadeUp>
  );
}

/* ──────────── ABOUT PAGE ──────────── */
function AboutPage({ setPage }) {
  const milestones = [
    {
      year: "1930",
      title: "The Founding",
      desc: "Henri Aurum opens his first atelier on Rue du Faubourg, Paris, with a singular mission: to elevate jewellery beyond ornamentation to art.",
    },
    {
      year: "1962",
      title: "Royal Commission",
      desc: "Commissioned by the House of Windsor to create the Lumière Tiara. The piece remains among the most photographed jewels of the 20th century.",
    },
    {
      year: "1989",
      title: "Global Expansion",
      desc: "Maisons opened in Geneva, New York, and Tokyo. A new generation of collectors discovers the Aurum signature.",
    },
    {
      year: "2008",
      title: "Modern Era",
      desc: "The fourth generation of the Aurum family leads the house into digital discovery, introducing global bespoke commissions.",
    },
    {
      year: "Now",
      title: "The Living Legacy",
      desc: "Over 1,200 unique pieces created. Every new commission honours a century of unbroken craft tradition.",
    },
  ];
  const team = [
    {
      initial: "S",
      name: "Sophie Aurum",
      role: "Creative Director",
      gen: "4th Generation",
    },
    {
      initial: "M",
      name: "Marcel Dupont",
      role: "Master Gemologist",
      gen: "40 Years Experience",
    },
    {
      initial: "K",
      name: "Kenji Tanaka",
      role: "Lead Goldsmith",
      gen: "Guild Laureate",
    },
  ];

  return (
    <div className="page-in">
      <div className="about-hero">
        <div className="about-glow" />
        <FadeUp>
          <p className="eyebrow">THE MAISON</p>
          <h1 className="about-h1 f-display">
            A Century of <em className="shimmer">Devotion</em>
          </h1>
          <p className="about-intro">
            Aurum was not built to be fashionable. It was built to endure. Since
            1930, four generations of one family have practised the same
            uncompromising philosophy: that true luxury lies not in what you
            see, but in what you feel.
          </p>
        </FadeUp>
      </div>
      <div style={{ background: "var(--obsidian)" }}>
        <div className="philosophy-grid">
          <FadeUp>
            <div>
              <p className="phil-eyebrow">OUR PHILOSOPHY</p>
              <h2 className="phil-h2 f-display">
                The Art of the <em className="shimmer">Imperceptible Detail</em>
              </h2>
              <p className="phil-text">
                In a world of mass production, we remain committed to the
                radical act of slowness. A single ring may take six weeks to
                complete. Not because we must, but because it deserves nothing
                less.
              </p>
              <p className="phil-text">
                Our gemologists travel to the original sources: the sapphire
                mines of Kashmir, the diamond fields of Botswana, the pearl
                atolls of French Polynesia. Only stones that pass our
                proprietary grading — stricter than GIA standards — find their
                way into an Aurum piece.
              </p>
              <p className="phil-text">
                We do not follow trends. We set the standard against which
                trends are measured.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={200}>
            <div className="about-img-wrap">
              <div className="about-img-container float">
                <img
                  src="/images/atelier.png"
                  alt="Maison Aurum Atelier"
                  className="about-image"
                />
              </div>
              <div className="about-img-glow" />
            </div>
          </FadeUp>
        </div>
      </div>
      <div className="timeline-wrap">
        <div className="section-inner">
          <FadeUp>
            <p className="eyebrow">OUR JOURNEY</p>
            <h2 className="section-h2" style={{ marginBottom: "3rem" }}>
              A <em className="shimmer">Living</em> History
            </h2>
          </FadeUp>
        </div>
        <div className="timeline-inner">
          <div className="tl-line" />
          {milestones.map((m, i) => (
            <FadeUp key={m.year} delay={i * 100}>
              <div className={"tl-item" + (i % 2 !== 0 ? " right" : "")}>
                <div
                  className="tl-text"
                  style={{ textAlign: i % 2 === 0 ? "right" : "left" }}
                >
                  <p className="tl-year">{m.year}</p>
                  <h3 className="tl-title f-display">{m.title}</h3>
                  <p className="tl-desc">{m.desc}</p>
                </div>
                <div className="tl-dot-wrap">
                  <div className="tl-dot glow-dot" />
                </div>
                <div style={{ flex: 1 }} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      <section className="section" style={{ background: "var(--obsidian)" }}>
        <div className="section-inner">
          <FadeUp>
            <p className="eyebrow">THE ARTISANS</p>
            <h2 className="section-h2">
              Hands Behind the <em className="shimmer">Magic</em>
            </h2>
          </FadeUp>
          <div className="team-grid">
            {team.map((t, i) => (
              <TeamMemberCard member={t} delay={i * 140} key={t.name} />
            ))}
          </div>
        </div>
      </section>
      <CTA setPage={setPage} />
    </div>
  );
}

/* ──────────── CONTACT PAGE ──────────── */
function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const INTERESTS = [
    "Engagement Rings",
    "Bespoke Commission",
    "Necklaces & Pendants",
    "Bracelets & Bangles",
    "Earrings",
    "Investment Pieces",
    "Private Viewing",
  ];
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (sent)
    return (
      <div className="success-wrap page-in">
        <div className="success-inner">
          <div className="float">
            <DiamondSVG size={60} />
          </div>
          <h2 className="success-h2 f-display">
            Thank You, <em className="shimmer">Truly</em>
          </h2>
          <p className="success-p">
            Your inquiry has reached our private client team. A dedicated
            consultant will be in touch within 24 hours to begin your journey
            with Aurum.
          </p>
          <GoldHR />
          <p className="eyebrow">AURUM — MAISON DE JOAILLERIE</p>
        </div>
      </div>
    );

  return (
    <div className="page-in">
      <div className="contact-hero">
        <div className="about-glow" />
        <FadeUp>
          <p className="eyebrow">PRIVATE CLIENT SERVICES</p>
          <h1 className="contact-h1 f-display">
            Begin a <em className="shimmer">Conversation</em>
          </h1>
          <p className="contact-sub">
            Every extraordinary piece begins with a single conversation. Share
            your vision — however formed or formless — and our private client
            team will guide the rest.
          </p>
        </FadeUp>
      </div>
      <div
        style={{
          background: "linear-gradient(180deg,var(--obsidian),var(--charcoal))",
        }}
      >
        <div className="contact-grid">
          <FadeUp>
            <div>
              <p className="contact-info-label">THE ATELIER</p>
              <p className="contact-info-title f-display">Maison Aurum</p>
              <p className="contact-info-text">
                14 Rue du Faubourg Saint-Honoré
                <br />
                75008 Paris, France
              </p>
              <GoldHR />
              <p className="contact-info-label">PRIVATE CLIENT LINE</p>
              <p className="contact-info-text">+33 1 42 65 XX XX</p>
              <p className="contact-info-text" style={{ marginTop: ".3rem" }}>
                Monday – Saturday, 10h – 19h CET
              </p>
              <p className="contact-info-label" style={{ marginTop: "1.5rem" }}>
                CORRESPONDENCE
              </p>
              <p className="contact-info-text">clients@aurum-joaillerie.com</p>
              <GoldHR />
              <p className="contact-info-label">OUR SERVICES</p>
              {[
                "Bespoke Commission",
                "Private Viewing",
                "Heritage Valuation",
                "Restoration & Repair",
                "Gift Advisory",
              ].map((s) => (
                <div key={s} className="contact-service">
                  <div className="contact-dot" />
                  <span className="contact-svc-text">{s}</span>
                </div>
              ))}
              <p className="contact-info-label" style={{ marginTop: "1.5rem" }}>
                MAISON LOCATIONS
              </p>
              {[
                "Paris — Flagship",
                "Geneva — Private Salon",
                "New York — Fifth Avenue",
                "Tokyo — Ginza",
              ].map((l) => (
                <p
                  key={l}
                  className="contact-info-text"
                  style={{ marginBottom: ".4rem" }}
                >
                  {l}
                </p>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={200}>
            <div className="form-stack">
              <div className="form-grid-2">
                <div>
                  <label className="field-label">FULL NAME *</label>
                  <input
                    className="field-input"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={set("name")}
                  />
                </div>
                <div>
                  <label className="field-label">EMAIL ADDRESS *</label>
                  <input
                    className="field-input"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                </div>
              </div>
              <div>
                <label className="field-label">TELEPHONE</label>
                <input
                  className="field-input"
                  placeholder="+1 (000) 000 0000"
                  value={form.phone}
                  onChange={set("phone")}
                />
              </div>
              <div>
                <label className="field-label">I AM INTERESTED IN</label>
                <div className="interest-grid">
                  {INTERESTS.map((int) => (
                    <button
                      key={int}
                      type="button"
                      className={
                        "interest-btn" + (form.interest === int ? " sel" : "")
                      }
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          interest: f.interest === int ? "" : int,
                        }))
                      }
                    >
                      {int}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="field-label">YOUR VISION</label>
                <textarea
                  className="field-input"
                  rows={5}
                  placeholder="Tell us about the occasion, the person, the feeling you wish to capture…"
                  value={form.message}
                  onChange={set("message")}
                />
              </div>
              <p className="privacy-note">
                All inquiries are handled with complete confidentiality. We do
                not share client information with any third parties.
              </p>
              <button
                className="btn-gold"
                style={{ padding: "1rem 2.5rem" }}
                onClick={() => {
                  if (form.name && form.email) setSent(true);
                }}
              >
                Submit Inquiry
              </button>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

/* ──────────── FOOTER ──────────── */
function Footer({ setPage }) {
  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div
              style={{ display: "flex", alignItems: "center", gap: ".7rem" }}
            >
              <DiamondSVG size={22} />
              <span
                className="f-cinzel shimmer"
                style={{ fontSize: ".9rem", letterSpacing: ".35em" }}
              >
                AURUM
              </span>
            </div>
            <p className="footer-brand-text">
              Maison de Joaillerie. Established 1930. Four generations of
              unbroken craft, devoted entirely to the extraordinary.
            </p>
            <div className="social-row">
              {["IG", "FB", "IN", "YT"].map((s) => (
                <button key={s} className="social-btn f-cinzel">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-col-label">NAVIGATE</p>
            <button className="footer-link" onClick={() => go("home")}>
              Home
            </button>
            <button className="footer-link" onClick={() => go("about")}>
              About
            </button>
            <button className="footer-link" onClick={() => go("contact")}>
              Contact
            </button>
          </div>
          <div>
            <p className="footer-col-label">CONTACT</p>
            <p className="footer-link">Paris Flagship</p>
            <p className="footer-link">14 Rue du Faubourg, 75008</p>
            <p className="footer-link" style={{ marginTop: ".5rem" }}>
              +33 1 42 65 XX XX
            </p>
            <p className="footer-link">clients@aurum-joaillerie.com</p>
          </div>
        </div>
        <hr className="gold-hr" />
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2024 AURUM MAISON DE JOAILLERIE. ALL RIGHTS RESERVED.
          </p>
          <div className="footer-legal">
            <button className="footer-legal-link">Privacy</button>
            <button className="footer-legal-link">Terms</button>
            <button className="footer-legal-link">Authenticity Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────── ROOT ──────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const pages = { home: HomePage, about: AboutPage, contact: ContactPage };
  const Page = pages[page] || HomePage;
  return (
    <>
      <Navbar page={page} setPage={setPage} />
      <main key={page}>
        <Page setPage={setPage} />
      </main>
      <Footer setPage={setPage} />
    </>
  );
}
