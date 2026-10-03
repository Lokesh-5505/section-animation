# Scroll-Driven Hero Section Animation — ITZFIZZ

A high-performance, scroll-driven automotive hero section animation built with modern web technologies, focusing on motion quality, smoothness, and interactive logic.

---

## 🎯 Assignment Objective

This project evaluates and demonstrates frontend animations, scroll-based interactions, and buttery-smooth UI behavior using React, GSAP, and Tailwind CSS. The motion design is inspired by automotive digital experiences, delivering a state-of-the-art kinetic interaction tied directly to user scroll progress.

---

## ✨ Features & Requirements Implemented

### 1. Hero Section Layout (Above the Fold)
- **Full Viewport Hero**: Occupies the first screen (`100svh`) with clean responsive boundaries.
- **Letter-Spaced Headline**: Prominently displays the letter-spaced typography:
  ```
  W E L C O M E
  I T Z F I Z Z .
  ```
- **Impact Metrics / Statistics**: Four key operational metrics positioned at the bottom of the hero scene:
  - `58%` — More pickup point use
  - `23%` — Fewer customer calls
  - `27%` — More efficient collections
  - `40%` — Less time spent waiting

### 2. Initial Load Animation
- **Staggered Headline Reveal**: The headline characters smoothly reveal with upward mask-clipped translation (`power4.out`) on page load.
- **Sequential Metrics Entrance**: The four impact statistics animate upward with a staggered delay (`delay: 0.55s, stagger: 0.1s`).
- **Sports Car Staging**: The supercar glides smoothly into its staging gate on the track with subtle rotation and opacity easing (`power3.out`).
- **Refined Timing**: Delivers a luxury automotive intro without abrupt transitions.

### 3. Scroll-Based Animation (Core Feature)
- **Pinned Scene via GSAP ScrollTrigger**: Pins the hero scene for a calibrated scroll distance (`+=240%`), allowing the user to scrub the motion.
- **Live Telemetry HUD**: Features a glassmorphism telemetry dial displaying real-time speed (`000 KM/H` -> `248 KM/H`) dynamically mapped to scroll progress.
- **Interpolated Car Motion**: The car traverses the highway track from left to right with:
  - Enlarged supercar presence (`w-[min(54vw,740px)]`) rolling smoothly across the road
  - Realistic banking rotation (`-9deg`) and dynamic perspective scale (`1.06`)
  - Vertical trajectory aligned with track asphalt curvature
- **Parallax Track Surface**: The background track moves with inverse parallax scaling for enhanced depth perception.
- **Speed Trail**: A speed line expands across the asphalt directly behind the vehicle.
- **Progressive Scroll Line**: A bottom progress bar expands across the metrics bar, tracking exact scroll completion.
- **Seamless Storytelling**: Initial headline copy smoothly transitions into Chapter 02 (*"THE FUTURE MOVES."*) without dead space.
- **Manifesto Section**: On unpinning, the user smoothly transitions into the manifesto section (*"PROGRESS HAS NO PARKING."*).

### 4. Interactive Micro-Animations & Controls
- **3D Mouse Parallax Tilt**: The supercar responds with real-time perspective tilt (`rotateX`, `rotateY`) following cursor movement across the stage.
- **Interactive Throttle Rev**: Clicking directly on the supercar triggers a throttle vibration pulse and vibrant underglow surge.
- **Letter Hover Lift**: Individual characters in the headline feature interactive spring lift and electric glow on hover.
- **Milestone Jump Cards**: Clicking any of the four metric cards smoothly scrolls to that exact milestone in the sequence.
- **Click-to-Drive Trigger**: The "Scroll to drive" indicator acts as an interactive smooth scroll trigger.

### 5. Motion & Performance Guidelines
- **Hardware GPU Acceleration**: All motion utilizes transform properties (`translate3d`, `scale`, `rotate`) with `force3D: true`.
- **Zero Layout Reflows**: Avoids `getBoundingClientRect` and heavy layout recalculations during scroll.
- **CSS Optimization**: Elements use `will-change: transform` and GPU compositing.
- **Accessibility**: Built-in support for `prefers-reduced-motion: reduce`.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5 & Vanilla CSS3** | Semantic structure, CSS variables, and GPU acceleration rules |
| **React 19** | Component state and lifecycle management |
| **GSAP 3 & ScrollTrigger** | High-performance timeline scrubbing, easing, and pinning |
| **Tailwind CSS v4** | Modern utility styling and theme configuration |
| **Vite 6** | Lightning-fast bundler and local development environment |
| **TypeScript** | Type safety and reliable code structure |
| **Lucide React** | Lightweight icons |

---

## 📁 Project Structure

```
section-animation/
├── public/
│   └── favicon.svg           # Site favicon
├── src/
│   ├── assets/
│   │   ├── itzfizz-car.png   # High-resolution supercar asset
│   │   └── track-surface.jpg # Asphalt track surface image
│   ├── hooks/
│   │   └── use-mobile.tsx    # Responsive viewport hook
│   ├── lib/
│   │   └── utils.ts          # Classnames utility helper
│   ├── App.tsx               # Main hero section & scroll animation logic
│   ├── main.tsx              # React application entry point
│   └── styles.css            # Tailwind theme, color variables & GPU styles
├── index.html                # HTML entry document
├── package.json              # Clean dependencies & scripts
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration with relative base for GitHub Pages
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher) or [Bun](https://bun.sh)
- npm, pnpm, yarn, or bun

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Lokesh-5505/section-animation.git
cd section-animation

# Using npm
npm install

# OR using bun
bun install
```

### Running Locally
Start the development server:

```bash
# Using npm
npm run dev

# OR using bun
bun run dev
```

Open your browser at `http://localhost:5173/`.

### Building for Production
Create an optimized production bundle:

```bash
# Using npm
npm run build

# OR using bun
bun run build
```

The output will be generated in the `dist/` directory. You can preview it with:

```bash
npm run preview
```

---

## 🌐 Deployment to GitHub Pages

This project is pre-configured with `base: "./"` in `vite.config.ts` for instant static hosting on GitHub Pages:

1. Push your changes to your GitHub repository.
2. In your GitHub repository, navigate to **Settings > Pages**.
3. Under **Build and deployment**, select **GitHub Actions** (or deploy from the `gh-pages` branch).
4. Run the standard Vite deploy action, or use `gh-pages`:
   ```bash
   npx gh-pages -d dist
   ```
5. Your live demo will be published at `https://<your-username>.github.io/<your-repo-name>/`.

---

## 📄 License
MIT License. Built for the Scroll-Driven Hero Section Animation Assignment.
