import { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight, MoveDown, Gauge } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carImage from "./assets/itzfizz-car.png";
import trackImage from "./assets/track-surface.jpg";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "58%", label: "More pickup point use", index: "01" },
  { value: "23%", label: "Fewer customer calls", index: "02" },
  { value: "27%", label: "More efficient collections", index: "03" },
  { value: "40%", label: "Less time spent waiting", index: "04" },
];

const headlineWord1 = ["W", "E", "L", "C", "O", "M", "E"];
const headlineWord2 = ["I", "T", "Z", "F", "I", "Z", "Z", "."];

export default function App() {
  const sceneRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLImageElement>(null);
  const speedDisplayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    const car = carRef.current;
    const track = trackRef.current;

    if (!scene || !stage || !car || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      // 1. Initial Load Animations (Smooth staggered reveal)
      gsap.from(".intro-line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power4.out",
        clearProps: "all",
      });

      gsap.from(".intro-small", {
        y: 14,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        delay: 0.3,
        ease: "power3.out",
        clearProps: "all",
      });

      gsap.from(".hero-metric", {
        y: 22,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.5,
        ease: "power3.out",
        clearProps: "all",
      });

      gsap.from(car, {
        x: -160,
        opacity: 0,
        rotate: -5,
        duration: 1.35,
        delay: 0.18,
        ease: "power3.out",
        clearProps: "all",
      });

      // 2. Butter-Smooth Scroll-Driven Car Animation
      const drive = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scene,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 1.0, // Silk-smooth interpolation with slight inertia
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Butter-smooth car driving motion across the viewport
      drive.to(
        car,
        {
          x: () => Math.max(0, stage.clientWidth - car.clientWidth - stage.clientWidth * 0.04),
          y: () => -stage.clientHeight * 0.05,
          rotate: -9,
          scale: 1.06,
          duration: 1,
          ease: "power1.inOut",
          force3D: true,
        },
        0
      );

      // Parallax track motion
      drive.to(
        track,
        {
          scale: 1.15,
          xPercent: -3,
          duration: 1,
          ease: "power1.inOut",
        },
        0
      );

      // Speed line trail
      drive.to(".drive-line", { scaleX: 1, duration: 1, ease: "none" }, 0);

      // Bottom progress line
      drive.to(".drive-progress", { scaleX: 1, duration: 1, ease: "none" }, 0);

      // Live Telemetry Speed Dial: 000 KM/H -> 248 KM/H
      const speedTracker = { val: 0 };
      drive.to(
        speedTracker,
        {
          val: 248,
          duration: 1,
          ease: "power1.inOut",
          onUpdate: () => {
            if (speedDisplayRef.current) {
              speedDisplayRef.current.textContent = String(Math.round(speedTracker.val)).padStart(3, "0");
            }
          },
        },
        0
      );

      // Seamless text transition between chapters
      drive.to(
        ".scene-copy--initial",
        {
          autoAlpha: 0,
          y: -20,
          duration: 0.22,
          ease: "power2.inOut",
        },
        0.34
      );

      drive.fromTo(
        ".scene-copy--final",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.22,
          ease: "power2.out",
        },
        0.46
      );

      // Chapter indicator
      drive.to(".chapter-number--first", { autoAlpha: 0, duration: 0.1 }, 0.46);
      drive.fromTo(".chapter-number--last", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0.46);

      // 3. Manifesto Outro Section Animations
      gsap.from(".outro-word", {
        yPercent: 95,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".outro-detail", {
        y: 26,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 62%",
          toggleActions: "play none none reverse",
        },
      });
    }, scene);

    return () => context.revert();
  }, []);

  // Interactive 3D mouse parallax tilt on the supercar
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!carRef.current || !sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(carRef.current, {
      rotateX: yRel * -7,
      rotateY: xRel * 9,
      duration: 0.55,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!carRef.current) return;
    gsap.to(carRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.75,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Interactive throttle rev when clicking on the car
  const handleCarClick = () => {
    if (!carRef.current) return;
    gsap.timeline()
      .to(carRef.current, { scale: 1.09, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out" })
      .to(".car-underglow", { opacity: 0.9, scale: 1.25, duration: 0.12, yoyo: true, repeat: 1 }, 0);
  };

  return (
    <main id="top" className="bg-background text-foreground">
      {/* HERO SECTION */}
      <section
        ref={sceneRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="drive-scene relative isolate flex h-[100svh] min-h-[480px] flex-col overflow-hidden select-none"
        aria-label="ITZFIZZ driving experience"
      >
        {/* Background Stage with Track, Speed Line, Car & Kinetic Telemetry */}
        <div ref={stageRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <img
            ref={trackRef}
            src={trackImage}
            width={1536}
            height={1024}
            alt=""
            className="track-image absolute inset-0 h-full w-full object-cover"
          />
          <div className="track-vignette absolute inset-0" />
          <div className="drive-line absolute bottom-[24%] left-0 z-10 h-px w-full origin-left scale-x-0 bg-primary/80" />
          
          <span className="track-coordinate absolute left-[3.5%] top-[54%] z-10 font-mono text-[10px] uppercase text-road-foreground/50">
            51° 30′ 26″ N
          </span>

          {/* Interactive Live Telemetry HUD: Counts speed dynamically as you scroll */}
          <div className="telemetry-hud absolute right-[3.5%] top-[14%] z-20 hidden sm:flex flex-col items-end rounded-lg border border-road-foreground/15 bg-road/70 px-4 py-2.5 font-mono shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              <Gauge size={12} className="text-primary inline" /> Telemetry HUD
            </div>
            <div className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-black text-road-foreground tabular-nums leading-tight">
              <span ref={speedDisplayRef}>000</span>{" "}
              <span className="text-[11px] font-mono font-bold text-primary">KM/H</span>
            </div>
            <div className="text-[9px] uppercase tracking-widest text-road-foreground/50">
              Kinetic Throttle
            </div>
          </div>

          {/* Prominent, Larger Supercar with Interactive 3D Perspective & Underglow */}
          <div
            ref={carRef}
            onClick={handleCarClick}
            className="drive-car absolute left-[2%] top-[42%] sm:top-[40%] lg:top-[38%] z-10 w-[min(54vw,740px)] max-h-[260px] cursor-pointer"
            style={{ perspective: "1000px" }}
            title="Click to rev throttle!"
          >
            {/* Luminous Neon Underglow */}
            <div className="car-underglow absolute -bottom-2 left-[20%] right-[20%] h-8 rounded-full bg-primary/25 blur-xl transition-all duration-200 pointer-events-none" />
            <img
              src={carImage}
              width={1536}
              height={768}
              alt="ITZFIZZ Sports Car"
              className="h-auto max-h-[240px] w-full object-contain drop-shadow-[0_28px_32px_rgba(0,0,0,0.85)] pointer-events-none"
            />
          </div>
        </div>

        {/* Minimal, Sleek Header Navigation */}
        <header className="hero-header relative z-30 mx-auto flex h-[60px] w-full max-w-[1920px] shrink-0 items-center justify-between border-b border-road-foreground/15 px-6 lg:h-[70px] lg:px-12 backdrop-blur-sm">
          <a
            href="#top"
            aria-label="ITZFIZZ home"
            className="font-display text-[22px] font-black leading-none text-road-foreground lg:text-[26px] transition-transform hover:scale-[1.02]"
          >
            ITZFIZZ<span className="text-primary">.</span>
          </a>
          <a
            href="#impact"
            className="intro-small group flex items-center gap-2 font-mono text-[10px] uppercase text-road-foreground transition-colors hover:text-primary"
            aria-label="Explore the impact"
          >
            Explore{" "}
            <ArrowUpRight
              size={15}
              strokeWidth={1.7}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-primary"
            />
          </a>
        </header>

        {/* Hero Content Body: Refined, sleek typography with generous clearance */}
        <div className="hero-body relative z-20 mx-auto flex w-full max-w-[1920px] flex-1 flex-col px-6 lg:px-12 pointer-events-none">
          <div className="hero-top relative flex items-start justify-between pt-2 sm:pt-4 lg:pt-5">
            {/* Initial Headline: Refined Letter-Spaced WELCOME ITZFIZZ */}
            <div className="scene-copy--initial max-w-[850px] pointer-events-auto">
              <div className="intro-small mb-1.5 sm:mb-2 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                <span className="h-px w-6 bg-primary" /> An invitation to move differently
              </div>
              <h1 className="font-display font-black uppercase tracking-[0.22em] sm:tracking-[0.26em] leading-[0.88] text-road-foreground select-none">
                <span className="block overflow-hidden py-0.5">
                  <span className="intro-line block text-[clamp(1.6rem,3.2vw,3.2rem)]">
                    {headlineWord1.map((char, i) => (
                      <span key={`w1-${i}`} className="letter-interactive inline-block">
                        {char}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span className="intro-line block text-[clamp(1.6rem,3.2vw,3.2rem)] text-primary">
                    {headlineWord2.map((char, i) => (
                      <span key={`w2-${i}`} className="letter-interactive inline-block">
                        {char}
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <p className="intro-small hero-subcopy mt-1.5 sm:mt-2 max-w-[340px] text-xs sm:text-sm leading-relaxed text-road-foreground/80 font-normal lg:mt-3 lg:max-w-[400px]">
                Not just getting from A to B. Making every move mean more.
              </p>
            </div>

            {/* Revealed Copy during scroll: Chapter 02 */}
            <div
              className="scene-copy--final pointer-events-none invisible absolute left-0 top-2 max-w-[850px] opacity-0 sm:top-4 lg:top-5"
              aria-hidden="true"
            >
              <div className="intro-small mb-1.5 sm:mb-2 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                <span className="h-px w-6 bg-primary" /> This is only the beginning
              </div>
              <p className="font-display text-[clamp(1.6rem,3.2vw,3.2rem)] font-black uppercase leading-[0.9] text-road-foreground tracking-[0.06em]">
                THE FUTURE<br />
                <span className="text-primary">MOVES.</span>
              </p>
              <p className="intro-small mt-1.5 sm:mt-2 max-w-[340px] text-xs sm:text-sm leading-relaxed text-road-foreground/80 lg:mt-3">
                Momentum is a choice. We choose forward.
              </p>
            </div>
          </div>

          {/* Bottom Hero Hint with Interactive Smooth Scroll Button */}
          <div className="hero-footer-hint pointer-events-auto mt-auto flex items-end justify-between pb-3 sm:pb-4 lg:pb-5">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight * 1.2,
                  behavior: "smooth",
                });
              }}
              className="intro-small group flex items-center gap-2 font-mono text-[10px] uppercase text-road-foreground/75 hover:text-primary transition-colors cursor-pointer"
            >
              <MoveDown size={14} strokeWidth={1.8} className="text-primary animate-bounce group-hover:translate-y-0.5 transition-transform" />
              Scroll to drive
            </button>
            <div className="intro-small flex items-center gap-3.5 font-mono text-[10px] uppercase text-road-foreground/70">
              <span className="relative inline-block w-6">
                <span className="chapter-number--first">01</span>
                <span className="chapter-number--last invisible absolute left-0 top-0 opacity-0">02</span>
              </span>
              <span className="h-px w-8 bg-road-foreground/35" /> 02
            </div>
          </div>
        </div>

        {/* Impact Metrics Bar with Interactive Milestone Jump Targets */}
        <div className="relative z-30 shrink-0 border-t border-road-foreground/20 bg-road/95 backdrop-blur-md">
          <div className="mx-auto grid w-full max-w-[1920px] grid-cols-4 px-4 sm:px-6 lg:px-12">
            {metrics.map((metric, idx) => (
              <div
                key={metric.index}
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight * (0.8 + idx * 0.4),
                    behavior: "smooth",
                  });
                }}
                className="hero-metric group relative min-w-0 border-r border-road-foreground/15 px-3 py-2.5 sm:px-4 sm:py-3.5 lg:px-8 lg:py-5 first:pl-0 last:border-r-0 last:pr-0 cursor-pointer transition-all duration-300 hover:bg-primary/5"
                title={`Jump to milestone ${metric.index}`}
              >
                <span className="mb-0.5 block font-mono text-[9px] text-primary/85 lg:text-[10px] transition-transform group-hover:translate-x-0.5">
                  /{metric.index}
                </span>
                <strong className={`metric-num-${idx} font-display block text-[clamp(1.4rem,2.8vw,3.2rem)] font-black leading-none text-road-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-y-[-2px]`}>
                  {metric.value}
                </strong>
                <span className="mt-1 block max-w-[170px] text-[10px] sm:text-[11px] leading-snug text-road-foreground/70 lg:mt-1.5 lg:text-sm group-hover:text-road-foreground transition-colors">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
          <div className="drive-progress absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-primary shadow-[0_0_8px_rgba(219,255,0,0.8)]" />
        </div>
      </section>

      {/* MANIFESTO SECTION */}
      <section
        id="impact"
        className="manifesto relative overflow-hidden bg-surface-light text-surface-light-foreground"
        aria-label="The impact of moving forward"
      >
        <div className="mx-auto max-w-[1920px] px-6 pb-8 pt-8 lg:px-12 lg:pb-12 lg:pt-11">
          <div className="outro-detail flex items-center justify-between border-b border-surface-light-foreground/20 pb-5 font-mono text-[10px] uppercase text-surface-light-foreground/65">
            <span>After the drive / 002</span>
            <span>
              Keep moving <ArrowDownRight size={14} className="ml-2 inline text-surface-light-foreground" />
            </span>
          </div>
          <div className="grid gap-10 py-16 lg:grid-cols-[1.7fr_0.6fr] lg:items-end lg:gap-16 lg:py-24">
            <h2 className="font-display text-[clamp(3.6rem,7.5vw,8.5rem)] font-black uppercase leading-[0.86]">
              <span className="block overflow-hidden">
                <span className="outro-word block">PROGRESS</span>
              </span>
              <span className="block overflow-hidden">
                <span className="outro-word block">HAS NO</span>
              </span>
              <span className="block overflow-hidden">
                <span className="outro-word block text-primary-dark">PARKING.</span>
              </span>
            </h2>
            <div className="outro-detail border-l-2 border-primary-dark pl-6 lg:mb-3">
              <span className="font-mono text-[10px] uppercase text-surface-light-foreground/55">
                The ITZFIZZ mindset
              </span>
              <p className="mt-4 max-w-[280px] text-lg leading-snug lg:text-xl">
                Every second saved. Every journey made better. That’s the kind of movement we believe in.
              </p>
            </div>
          </div>
          <div className="outro-detail flex flex-wrap items-center justify-between gap-5 border-t border-surface-light-foreground/20 pt-6 font-mono text-[10px] uppercase text-surface-light-foreground/65">
            <span>© ITZFIZZ — Motion with meaning</span>
            <a
              href="#top"
              className="group flex items-center gap-2 text-surface-light-foreground transition-colors hover:text-primary-dark"
            >
              Back to start{" "}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
