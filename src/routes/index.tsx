import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight, MoveDown } from "lucide-react";
import carImage from "../assets/itzfizz-car.png";
import trackImage from "../assets/track-surface.jpg";

const metrics = [
  { value: "58%", label: "More pickup point use", index: "01" },
  { value: "23%", label: "Fewer customer calls", index: "02" },
  { value: "27%", label: "More efficient collections", index: "03" },
  { value: "40%", label: "Less time spent waiting", index: "04" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ITZFIZZ — Movement, Reimagined" },
      { name: "description", content: "An original scroll-driven automotive experience. Explore the momentum behind ITZFIZZ." },
      { property: "og:title", content: "ITZFIZZ — Movement, Reimagined" },
      { property: "og:description", content: "An original scroll-driven automotive experience. Explore the momentum behind ITZFIZZ." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const sceneRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !sceneRef.current || !stageRef.current || !carRef.current || !trackRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const scene = sceneRef.current;
      const stage = stageRef.current;
      const car = carRef.current;
      const track = trackRef.current;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const context = gsap.context(() => {
        gsap.from(".intro-line", { yPercent: 110, opacity: 0, duration: 1.15, stagger: 0.12, ease: "power4.out", clearProps: "all" });
        gsap.from(".intro-small", { y: 18, opacity: 0, duration: 0.8, stagger: 0.13, delay: 0.4, ease: "power3.out", clearProps: "all" });
        gsap.from(".hero-metric", { y: 25, opacity: 0, duration: 0.85, stagger: 0.1, delay: 0.65, ease: "power3.out", clearProps: "all" });
        gsap.from(car, { x: -80, opacity: 0, rotate: -7, duration: 1.45, delay: 0.25, ease: "power3.out", clearProps: "all" });

        const drive = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "+=230%",
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        drive.to(car, {
          x: () => Math.max(0, stage.clientWidth - car.clientWidth - stage.clientWidth * 0.08),
          y: () => -stage.clientHeight * 0.12,
          rotate: -13,
          scale: 1.08,
          duration: 1,
        }, 0);
        drive.to(track, { scale: 1.17, xPercent: -3, duration: 1 }, 0);
        drive.to(".drive-line", { scaleX: 1, duration: 1 }, 0);
        drive.to(".drive-progress", { scaleY: 1, duration: 1 }, 0);
        drive.to(".scene-copy--initial", { autoAlpha: 0, y: -34, duration: 0.22 }, 0.3);
        drive.fromTo(".scene-copy--final", { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 0.28 }, 0.61);
        drive.to(".chapter-number--first", { autoAlpha: 0, duration: 0.1 }, 0.5);
        drive.fromTo(".chapter-number--last", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, 0.5);

        gsap.from(".outro-word", {
          yPercent: 95,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifesto", start: "top 78%", toggleActions: "play none none reverse" },
        });
        gsap.from(".outro-detail", {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".manifesto", start: "top 62%", toggleActions: "play none none reverse" },
        });
      }, scene.parentElement ?? scene);
      cleanup = () => context.revert();
      ScrollTrigger.refresh();
    });

    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <main id="top" className="bg-background text-foreground">
      <section ref={sceneRef} className="drive-scene relative isolate flex h-[100svh] min-h-[480px] flex-col overflow-hidden" aria-label="ITZFIZZ driving experience">
        <div ref={stageRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <img ref={trackRef} src={trackImage} width={1536} height={1024} alt="" className="track-image absolute inset-0 h-full w-full object-cover" />
          <div className="track-vignette absolute inset-0" />
          <div className="drive-line absolute bottom-[23%] left-0 z-10 h-px w-full origin-left scale-x-0 bg-primary/80" />
          <span className="track-coordinate absolute left-[3.5%] top-[49%] z-10 font-mono text-[10px] uppercase text-road-foreground/50">51° 30′ 26″ N</span>
          <div ref={carRef} className="drive-car absolute left-[4%] top-[32%] z-20 w-[min(49vw,710px)]">
            <img src={carImage} width={1536} height={768} alt="" className="h-auto w-full drop-shadow-[0_30px_32px_rgba(0,0,0,0.7)]" />
          </div>
        </div>

        <header className="hero-header relative z-30 mx-auto flex h-[76px] w-full max-w-[1920px] shrink-0 items-center justify-between border-b border-road-foreground/20 px-6 lg:h-[88px] lg:px-12">
          <a href="#top" aria-label="ITZFIZZ home" className="font-display text-[25px] font-black leading-none text-road-foreground lg:text-[30px]">ITZFIZZ<span className="text-primary">.</span></a>
          <div className="intro-small hidden items-center gap-3 font-mono text-[10px] uppercase text-road-foreground/70 md:flex"><span className="h-[6px] w-[6px] rounded-full bg-primary" /> Independent motion studio <span className="text-road-foreground/30">/</span> 2026</div>
          <a href="#impact" className="intro-small group flex items-center gap-2 font-mono text-[10px] uppercase text-road-foreground transition-colors hover:text-primary" aria-label="Explore the impact">Explore <ArrowUpRight size={15} strokeWidth={1.7} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
        </header>

        <div className="hero-body relative z-20 mx-auto flex w-full max-w-[1920px] flex-1 flex-col px-6 lg:px-12">
          <div className="hero-top relative flex items-start justify-between pt-8 lg:pt-12">
            <div className="scene-copy--initial max-w-[780px]">
              <div className="intro-small mb-5 flex items-center gap-3 font-mono text-[10px] uppercase text-primary lg:mb-7"><span className="h-px w-8 bg-primary" /> An invitation to move differently</div>
              <h1 className="font-display text-[clamp(3.3rem,7.4vw,8.2rem)] font-black uppercase leading-[0.86] text-road-foreground">
                <span className="block overflow-hidden"><span className="intro-line block">WELCOME</span></span>
                <span className="block overflow-hidden"><span className="intro-line block">TO <em className="not-italic text-primary">ITZFIZZ.</em></span></span>
              </h1>
              <p className="intro-small mt-6 max-w-[310px] text-sm leading-relaxed text-road-foreground/70 lg:mt-8 lg:max-w-[380px] lg:text-base">Not just getting from A to B. Making every move mean more.</p>
            </div>
            <div className="intro-small hidden flex-col items-end gap-3 pt-2 text-right font-mono text-[10px] uppercase text-road-foreground/60 lg:flex"><span>Experience no. 001</span><span>Built for the next move</span></div>
            <div className="scene-copy--final pointer-events-none invisible absolute left-0 top-8 max-w-[940px] opacity-0 lg:top-12" aria-hidden="true">
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase text-primary lg:mb-7"><span className="h-px w-8 bg-primary" /> This is only the beginning</div>
              <p className="font-display text-[clamp(3.3rem,7.4vw,8.2rem)] font-black uppercase leading-[0.86] text-road-foreground">THE FUTURE<br /><span className="text-primary">MOVES.</span></p>
              <p className="mt-6 max-w-[330px] text-sm leading-relaxed text-road-foreground/70 lg:mt-8 lg:text-base">Momentum is a choice. We choose forward.</p>
            </div>
          </div>

          <div className="pointer-events-none mt-auto flex items-end justify-between pb-7 lg:pb-11">
            <div className="intro-small flex items-center gap-3 font-mono text-[10px] uppercase text-road-foreground/65"><MoveDown size={16} strokeWidth={1.5} className="text-primary" /> Scroll to drive</div>
            <div className="intro-small flex items-center gap-5 font-mono text-[10px] uppercase text-road-foreground/65"><span className="relative inline-block w-6"><span className="chapter-number--first">01</span><span className="chapter-number--last invisible absolute left-0 top-0 opacity-0">02</span></span><span className="h-px w-10 bg-road-foreground/40" /> 02</div>
          </div>
        </div>

        <div className="relative z-30 shrink-0 border-t border-road-foreground/25 bg-road/90 backdrop-blur-md">
          <div className="mx-auto grid w-full max-w-[1920px] grid-cols-4 px-6 lg:px-12">
            {metrics.map((metric) => (
              <div key={metric.index} className="hero-metric relative min-w-0 border-r border-road-foreground/20 px-4 py-5 first:pl-0 last:border-r-0 last:pr-0 lg:px-8 lg:py-7">
                <span className="mb-3 block font-mono text-[9px] text-primary/85 lg:text-[10px]">/{metric.index}</span>
                <strong className="font-display block text-[clamp(1.8rem,3.4vw,4rem)] font-black leading-none text-road-foreground">{metric.value}</strong>
                <span className="mt-2 block max-w-[170px] text-[11px] leading-snug text-road-foreground/65 lg:mt-3 lg:text-sm">{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="drive-progress absolute bottom-0 left-0 h-[3px] w-full origin-left scale-y-0 bg-primary" />
        </div>
      </section>

      <section id="impact" className="manifesto relative overflow-hidden bg-surface-light text-surface-light-foreground" aria-label="The impact of moving forward">
        <div className="mx-auto max-w-[1920px] px-6 pb-8 pt-8 lg:px-12 lg:pb-12 lg:pt-11">
          <div className="outro-detail flex items-center justify-between border-b border-surface-light-foreground/20 pb-5 font-mono text-[10px] uppercase text-surface-light-foreground/65"><span>After the drive / 002</span><span>Keep moving <ArrowDownRight size={14} className="ml-2 inline text-surface-light-foreground" /></span></div>
          <div className="grid gap-10 py-20 lg:grid-cols-[1.7fr_0.6fr] lg:items-end lg:gap-16 lg:py-28">
            <h2 className="font-display text-[clamp(3.8rem,8vw,9rem)] font-black uppercase leading-[0.86]">
              <span className="block overflow-hidden"><span className="outro-word block">PROGRESS</span></span>
              <span className="block overflow-hidden"><span className="outro-word block">HAS NO</span></span>
              <span className="block overflow-hidden"><span className="outro-word block text-primary-dark">PARKING.</span></span>
            </h2>
            <div className="outro-detail border-l-2 border-primary-dark pl-6 lg:mb-3"><span className="font-mono text-[10px] uppercase text-surface-light-foreground/55">The ITZFIZZ mindset</span><p className="mt-4 max-w-[280px] text-lg leading-snug lg:text-xl">Every second saved. Every journey made better. That’s the kind of movement we believe in.</p></div>
          </div>
          <div className="outro-detail flex flex-wrap items-center justify-between gap-5 border-t border-surface-light-foreground/20 pt-6 font-mono text-[10px] uppercase text-surface-light-foreground/65"><span>© ITZFIZZ — Motion with meaning</span><a href="#top" className="group flex items-center gap-2 text-surface-light-foreground transition-colors hover:text-primary-dark">Back to start <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a></div>
        </div>
      </section>
    </main>
  );
}
