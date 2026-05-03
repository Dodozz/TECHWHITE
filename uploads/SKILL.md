---
name: premium-ui
description: >
  Build premium, production-grade web interfaces with cinematic aesthetics: liquid-glass
  effects, video backgrounds, magnetic interactions, scroll-driven animations, and
  editorial typography. Use this skill whenever the user asks for a landing page,
  portfolio, hero section, e-commerce storefront, SaaS dashboard, or any web UI that
  needs to feel like a top-tier agency delivery — not a template. Trigger on keywords
  like "premium", "cinematic", "glassmorphism", "liquid glass", "landing page", "hero",
  "portfolio", "e-commerce UI", "high-end design", or whenever the user shares a design
  reference and wants it elevated. Also trigger when the user provides a Figma mockup,
  screenshot, or prompt asking for "agency-level" results.
---

# Premium UI Skill

Build interfaces that feel like they were designed by a world-class creative agency.
Every output should be visually memorable, technically sound, and cohesive from pixel
to interaction. This skill consolidates proven patterns from cinematic landing pages,
glassmorphism dashboards, and editorial portfolios.

---

## 0. Before Writing Any Code

Ask yourself (and commit to answers before coding):

1. **Mood board in one sentence**: What's the aesthetic? (e.g. "cyberpunk editorial", "liquid glass fintech", "dark 3D portfolio", "space travel cinematic")
2. **Color system**: 1 dominant base + 1-2 sharp accents. Never more than 4 total.
3. **Typography pair**: 1 display font (dramatic) + 1 body font (technical or refined). See § Typography below.
4. **Motion philosophy**: Entrance-heavy or scroll-driven? Pick one as the primary.
5. **Background treatment**: Solid dark, video, grain texture, gradient mesh, or layered glass?

Lock these in before touching layout.

---

## 1. Technology Stack

### React (default for complex SPAs)
```
react@18.3.1, react-dom@18.3.1
framer-motion@12+ (or motion/react for Tailwind v4 projects)
lucide-react@0.344.0
tailwindcss@3.4+ (or v4 if specified)
typescript (always)
vite
```

### HTML Vanilla (for single-file prototypes)
```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
<script src="https://unpkg.com/framer-motion@11.11.17/dist/framer-motion.js"></script>
<script>window.Motion = window.FramerMotion;</script>
```
All components export via `window.X = X`. Mount on `#root`.

---

## 2. Typography

NEVER use: Inter, Roboto, Arial, system-ui, Space Grotesk.

### Approved display fonts (Google Fonts)
| Font | Weight | Best for |
|------|--------|----------|
| Bebas Neue | 400 | Gaming, dark, condensed impact |
| Instrument Serif (italic) | 400 | Cinematic, luxury, editorial |
| Kanit | 300-900 | 3D portfolio, tech, dark themes |
| Rajdhani | 300-700 | Sci-fi UI, dashboard, technical |
| Space Mono | 400,700 | Specs, code, monospace accents |
| Barlow | 300-600 | Clean body paired with serif display |

### Rules
- Display font → headings only. Body font → everything else.
- Use `clamp()` for fluid type: `clamp(3rem, 12vw, 160px)` for hero headings.
- `tracking-tight` or `tracking-[-4px]` on large headings. `tracking-wider` on caps labels.
- `font-black` + `uppercase` + `leading-none` = hero heading formula.

---

## 3. Color Systems

### Dark themes (gaming, portfolio, cinematic)
```css
--bg:       #070B14  /* near-black with blue tint */
--surface:  #0D1220  /* card backgrounds */
--border:   #1A2340  /* subtle borders */
--accent1:  #FF1F71  /* magenta / electric pink */
--accent2:  #00E5FF  /* cold cyan */
--text:     #FFFFFF
--muted:    #A0AEC0
```

### Glassmorphism (light or dark video BG)
```css
--glass-bg:     rgba(255,255,255,0.01)
--glass-border: rgba(255,255,255,0.45) → rgba(255,255,255,0) gradient
--glass-blur:   blur(4px) subtle / blur(50px) strong
--text:         rgba(30,50,90,0.9) on light BG / #FFFFFF on dark
```

### Fintech / DeFi light
```css
--bg:       #f0f0f0
--text:     #5E6470
--action:   rgba(30,50,90,0.8)
--white:    #FFFFFF
```

---

## 4. Liquid Glass Effect (copy-paste exact CSS)

Two variants. Include both in `<style>` or `index.css`.

```css
/* Subtle — for navbars, chips, secondary cards */
.liquid-glass {
  background: rgba(255,255,255,0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%,
    rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%,
    rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%,
    rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Strong — for primary CTAs, modal backgrounds */
.liquid-glass-strong {
  background: rgba(255,255,255,0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  border: none;
  box-shadow: 4px 4px 4px rgba(0,0,0,0.05),
              inset 0 1px 1px rgba(255,255,255,0.15);
  position: relative;
  overflow: hidden;
}
.liquid-glass-strong::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.5) 0%,
    rgba(255,255,255,0.2) 20%,
    rgba(255,255,255,0) 40%,
    rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.2) 80%,
    rgba(255,255,255,0.5) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

---

## 5. Video Backgrounds

### Looping video with JS crossfade (no CSS transitions)

```tsx
const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds before end to start fade

function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const fadingOutRef = useRef(false);

  const fadeTo = (target: number, _duration: number) => {
    cancelAnimationFrame(rafRef.current);
    const video = videoRef.current;
    if (!video) return;
    const start = performance.now();
    const from = parseFloat(video.style.opacity) || 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / FADE_MS, 1);
      video.style.opacity = String(from + (target - from) * t);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => { video.style.opacity = "0"; video.play(); fadeTo(1, FADE_MS); };
    const onTimeUpdate = () => {
      if (!fadingOutRef.current && video.duration - video.currentTime <= FADE_OUT_LEAD) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };
    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay muted playsInline preload="auto"
      style={{ opacity: 0, willChange: "opacity", ...style }}
      className={className}
    />
  );
}
```

### Video positioning rules
- **Hero focal top**: `class="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"` + `style={{ width: "120%", height: "120%" }}`
- **Full bleed**: `class="absolute inset-0 w-full h-full object-cover z-0"`
- **Fixed BG (simple loop)**: `class="fixed inset-0 w-full h-full object-cover z-0"` with `loop` attribute (no crossfade needed)
- No dark overlays — contrast comes from the glass chrome on top.

---

## 6. Motion & Animation Patterns

### Entrance (Framer Motion)
```tsx
// FadeIn wrapper — use for all above-fold elements
<motion.div
  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
>

// whileInView for below-fold
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "50px", amount: 0 }}
  transition={{ duration: 0.7, delay: i * 0.1 }}
>
```

### Stagger delays (hero)
| Element | delay |
|---------|-------|
| Badge / label | 0.4s |
| Main heading | 0.2s (or BlurText word-by-word) |
| Subheading | 0.8s |
| CTA buttons | 1.1s |
| Stats / cards | 1.3s |
| Partners row | 1.4s |

### Word-by-word BlurText
```tsx
// Splits text by spaces, each word animates with blur
// initial: { filter: 'blur(10px)', opacity: 0, y: 50 }
// keyframes → blur(5px) opacity 0.5 y-5 → blur(0) opacity 1 y 0
// delay per word: (i * 100) / 1000 seconds
// Parent: display flex, flexWrap wrap, justifyContent center, rowGap 0.1em
// Each word: display inline-block, marginRight 0.28em
```

### Scroll-driven marquee
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-33.333%); }
}
.marquee-track { animation: marquee 20s linear infinite; }
```
Triple the content array for seamless loop.

### Scroll parallax rows (image galleries)
```tsx
// Offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
// Row 1: translateX(offset - 200) → moves right
// Row 2: translateX(-(offset - 200)) → moves left
// willChange: 'transform', passive scroll listener
```

### Sticky card stack (projects)
```tsx
// Each card: sticky top-24, height 85vh container
// targetScale = 1 - (totalCards - 1 - index) * 0.03
// useScroll + useTransform for scale per card
// Each card offset: top: `${index * 28}px`
```

### Magnetic hover (portrait / CTA)
```tsx
// Track mouse relative to element center
// Apply translate3d(dx/strength, dy/strength, 0)
// Activate within `padding` px of element edge
// Transition in: "transform 0.3s ease-out"
// Transition out: "transform 0.6s ease-in-out"
// willChange: 'transform'
```

### Gradient text heading
```css
.hero-heading {
  background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Character-by-character scroll reveal (AnimatedText)
```
IntersectionObserver triggers at 10% visibility.
Split text into characters.
Each char: opacity 0.2 → 1 based on scroll progress.
useScroll targeting the element, offset ['start 0.8', 'end 0.2'].
Invisible placeholder + absolute animated span per char.
```

---

## 7. Layout Patterns

### Anti-patterns to avoid
- ❌ Three equal-width columns stacked vertically
- ❌ Centered blob of text with nothing around it
- ❌ Generic card grid with identical aspect ratios
- ❌ Footer with only links

### Approved patterns

**Asymmetric hero**: Full-viewport with absolutely positioned portrait (Magnet wrapped), bottom bar with left-text / right-CTA split.

**Broken grid categories**: 2/3 + 1/3 split for feature cards, not 3×1/3.

**Bottom-right cutout corner**:
```tsx
// bg-[#f0f0f0] rounded-tl-[3.5rem] absolute bottom-0 right-0
// Faux cutout via inverse-radius SVG masks:
// Top mask: <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#f0f0f0"/>
// Left mask: <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#f0f0f0"/>
```

**Services vertical list**: Large ordinal number left (clamp 3rem→140px) + name/description right. 1px rgba border separators. Staggered whileInView.

**Stat cards**: liquid-glass rounded-[1.25rem] p-5, icon top, large number (Instrument Serif italic), label below.

---

## 8. Reusable Components

### ContactButton / CTA pill
```tsx
// Gradient background: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)
// Inner box-shadow: 0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset
// White 2px outline with -3px offset
// rounded-full, text white, uppercase, tracking-widest
// Sizes: px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
```

### Ghost pill button
```tsx
// rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA]
// uppercase tracking-widest font-medium
// hover: bg-[#D7E2EA]/10
```

### Book Demo / action button (dark)
```tsx
// bg-[rgba(30,50,90,0.8)] rounded-full pl-2 pr-6 py-2
// Icon wrapper: bg-white/20 p-1.5 rounded-full (ArrowUpRight inside)
// Text: "Book Demo" text-sm font-normal text-white
// hover: bg-[rgba(30,50,90,1)] transition-colors
```

### HeroBadge
```tsx
// motion.div: initial opacity 0 y 20 → animate opacity 1 y 0, duration 0.6
// rounded-full bg-white/60 backdrop-blur-md border border-white/20 px-4 py-2
// Sparkles icon + text, both text-[rgba(30,50,90,0.9)]
```

### Toast notification
```tsx
// Fixed bottom-right, z-50
// slideInUp → hold 2s → fadeOut CSS animation
// "Producto agregado al carrito ✓" with accent color
```

---

## 9. Navbar Patterns

### Dark editorial navbar
```
justify-between, sticky top-0, backdrop-filter blur on scroll (JS adds class)
Left: logo (styled text or SVG)
Center: 4-5 links, text-sm uppercase tracking-wider, hover opacity-70
Right: CTA button
Mobile: hamburger → drawer from right with overlay
```

### Glassmorphism navbar (over video)
```
fixed top-4 px-8 z-50
Left: 48×48 liquid-glass circle with letter logo
Center: liquid-glass pill with nav links + white CTA pill
Right: 48×48 invisible spacer (balance)
```

---

## 10. Footer Patterns

### Dark e-commerce footer
```
4 columns: Logo+desc+social | Nav links | Info links | Contact
Decorative line accent (magenta/accent) at top
Bottom: copyright + "Hecho en México 🇲🇽"
1 col mobile → 4 col desktop
```

### Liquid glass footer (over video)
```tsx
// motion.footer: initial opacity 0 y 40 → animate, delay 0.4
// liquid-glass rounded-3xl p-6 md:p-10 text-white/70
// 12-col grid: col-span-5 logo+desc | col-span-7 3-col links
// Bottom bar: border-t border-white/10, copyright left, social icons right
// Icons from lucide-react: Music2, Facebook, Twitter, Youtube, Instagram
```

---

## 11. Grain Texture

Add subtle noise to any dark background for depth:
```css
.grain::after {
  content: "";
  position: fixed; inset: 0; z-index: 100;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}
```

---

## 12. Responsive Rules

- Mobile-first. Breakpoints: 480px, 640px (sm), 768px (md), 1024px (lg), 1280px (xl).
- Fluid typography via `clamp()` always — no fixed px for headings.
- Touch targets minimum 44px.
- Sidebars → drawer on mobile with overlay.
- Grids: 1 col mobile → 2 tablet → 3-4 desktop.
- Navbar → hamburger below 768px.
- Video backgrounds: always `object-cover`, test on mobile.

---

## 13. Performance

- `willChange: 'transform'` on animated elements.
- Passive scroll listeners: `{ passive: true }`.
- Images: `loading="lazy"`, always set dimensions.
- Videos: `preload="auto"` for hero, `preload="none"` for below-fold.
- `overflowX: 'clip'` on main wrapper (not `hidden` — avoids sticky bugs).
- `useRef` for DOM manipulation in scroll handlers, never `useState`.

---

## 14. Single-File Delivery Rule

When building HTML prototypes:
- All CSS in `<style>` in `<head>`.
- All JS in `<script type="text/babel">` at end of `<body>`.
- Google Fonts via `@import` in CSS.
- Images: use CSS gradients as placeholders — never depend on external URLs that may fail.
- Must work offline by opening the `.html` file directly.

---

## 15. Quality Checklist (before delivering)

- [ ] Typography: no Inter/Roboto/Arial
- [ ] Color system: defined as CSS variables, ≤4 colors
- [ ] Motion: entrance animations on all above-fold elements
- [ ] Liquid glass: CSS vars working, `::before` pseudo-element present
- [ ] Video: crossfade working (rAF-driven, not CSS transition)
- [ ] Responsive: tested at 375px, 768px, 1280px
- [ ] Grain texture: applied to dark BG sections
- [ ] `overflowX: clip` on main wrapper
- [ ] No generic patterns: broken grid, not 3-equal-columns
- [ ] Toast / feedback interactions wired
