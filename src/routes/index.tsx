import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import carImage from "../assets/itzfizz-car.png";

const metrics = [
  { number: "58%", label: "Increase in pickup point use", color: "lime" },
  { number: "23%", label: "Fewer customer phone calls", color: "blue" },
  { number: "27%", label: "More efficient collections", color: "orange" },
  { number: "40%", label: "Less time spent waiting", color: "dark" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ITZFIZZ — A Different Kind of Drive" },
      { name: "description", content: "A scroll-driven automotive motion study featuring the ITZFIZZ electric sports car and impact in motion." },
      { property: "og:title", content: "ITZFIZZ — A Different Kind of Drive" },
      { property: "og:description", content: "A scroll-driven automotive motion study featuring the ITZFIZZ electric sports car and impact in motion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const sceneRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !sceneRef.current || !carRef.current || !roadRef.current || !trailRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const scene = sceneRef.current;
      const car = carRef.current;
      const road = roadRef.current;
      const trail = trailRef.current;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(car, { x: () => Math.max(0, (road.clientWidth - car.clientWidth) * 0.5) });
        return;
      }

      const ctx = gsap.context(() => {
        gsap.from(".intro-reveal", {
          opacity: 0,
          y: 26,
          duration: 1.1,
          stagger: 0.11,
          ease: "power3.out",
          clearProps: "opacity,transform",
        });
        gsap.from(".metric", {
          opacity: 0,
          y: 24,
          duration: 0.85,
          stagger: 0.14,
          delay: 0.48,
          ease: "power3.out",
          clearProps: "opacity,transform",
        });

        const progress = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "+=185%",
            pin: true,
            scrub: 1.15,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        progress.to(car, {
          x: () => Math.max(0, road.clientWidth - car.clientWidth - 12),
          ease: "none",
          duration: 1,
        }, 0);
        progress.to(trail, { scaleX: 1, ease: "none", duration: 1 }, 0);
        progress.to(".headline-accent", { color: "var(--primary)", ease: "none", duration: 0.45 }, 0.2);
        progress.to(".road-caption-end", { opacity: 1, y: 0, duration: 0.2 }, 0.78);

        metrics.forEach((_, index) => {
          const start = 0.12 + index * 0.2;
          progress.to(`.metric-${index} .metric-line`, { scaleX: 1, duration: 0.16, ease: "power2.out" }, start);
          progress.to(`.metric-${index}`, { y: -9, duration: 0.13, ease: "power2.out" }, start);
          progress.to(`.metric-${index}`, { y: 0, duration: 0.15, ease: "power2.inOut" }, Math.min(start + 0.16, 0.96));
        });
      }, scene);

      cleanup = () => ctx.revert();
      ScrollTrigger.refresh();
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <main className="overflow-x-clip bg-background text-foreground">
      <section ref={sceneRef} className="scene relative flex min-h-[92svh] flex-col overflow-hidden" aria-label="ITZFIZZ motion experience">
        <div className="scene-inner mx-auto flex w-full max-w-[1800px] flex-1 flex-col px-5 sm:px-8 lg:px-12">
          <header className="flex h-20 shrink-0 items-center justify-between border-b border-border/70 sm:h-24">
            <a href="#top" aria-label="ITZFIZZ home" className="font-display text-[23px] font-extrabold leading-none tracking-normal sm:text-[28px]">ITZFIZZ<span className="text-primary">.</span></a>
            <div className="hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:flex"><span className="h-2 w-2 rounded-full bg-primary" /> Motion study / 001</div>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground sm:hidden">001 / 004</span>
          </header>

          <div id="top" className="hero-heading relative z-10 flex flex-col justify-center pt-7 sm:pt-10 lg:pt-12">
            <div className="intro-reveal mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground sm:mb-5"><span className="h-px w-8 bg-primary" /> Moving what matters</div>
            <h1 className="font-display text-[clamp(3.7rem,8.1vw,9rem)] font-black uppercase leading-[0.88] tracking-normal">
              <span className="intro-reveal block">WELCOME</span>
              <span className="intro-reveal headline-accent block text-foreground">ITZFIZZ<span className="text-primary">.</span></span>
            </h1>
            <div className="intro-reveal mt-5 flex items-end justify-between gap-6 sm:mt-6">
              <p className="max-w-[270px] text-sm leading-relaxed text-muted-foreground sm:max-w-[370px] sm:text-base">The future doesn’t wait around. Neither do we.</p>
              <span className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:block">Scroll to drive the story ↓</span>
            </div>
          </div>

          <div className="road-wrap relative z-0 mt-auto flex min-h-[178px] items-center py-4 sm:min-h-[260px] sm:py-8 lg:min-h-[320px] lg:py-10">
            <div ref={roadRef} className="road relative h-[144px] w-full overflow-hidden bg-road sm:h-[178px] lg:h-[214px]">
              <div className="road-edge absolute inset-x-0 top-4 border-t border-road-mark/35 sm:top-5" />
              <div className="road-edge absolute inset-x-0 bottom-4 border-t border-road-mark/35 sm:bottom-5" />
              <div className="road-dashes absolute inset-x-0 top-1/2 h-px -translate-y-1/2" />
              <div ref={trailRef} className="road-trail absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-primary/85" />
              <div className="absolute left-5 top-5 z-10 font-mono text-[10px] uppercase tracking-[0.18em] text-road-foreground/65 sm:left-7 sm:top-7">START / 00</div>
              <div className="road-caption-end absolute bottom-5 right-5 z-10 translate-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-road-foreground/65 opacity-0 sm:bottom-7 sm:right-7">FORWARD / 100</div>
              <div ref={carRef} className="car-vehicle absolute inset-y-0 left-0 z-20 flex w-[205px] items-center sm:w-[320px] lg:w-[410px]">
                <img src={carImage} width={1536} height={768} alt="Lime electric sports car viewed from above" className="block h-auto w-full drop-shadow-2xl" />
              </div>
            </div>
          </div>

          <div className="metrics-grid grid grid-cols-2 gap-x-5 gap-y-3 pb-4 pt-3 sm:grid-cols-4 sm:gap-5 sm:pb-8 lg:gap-9 lg:pb-10">
            {metrics.map((metric, index) => (
              <div key={metric.number} className={`metric metric-${index} relative min-w-0 border-t border-border pt-4 sm:pt-5`}>
                <div className={`metric-line metric-line-${metric.color} absolute left-0 top-[-1px] h-[3px] w-full origin-left scale-x-0`} />
                <span className="mb-2 block font-mono text-[10px] text-muted-foreground">0{index + 1} / 04</span>
                <strong className="font-display block text-[clamp(2.3rem,4.6vw,5rem)] font-bold leading-none tracking-normal">{metric.number}</strong>
                <p className="mt-2 max-w-[190px] text-xs leading-snug text-muted-foreground sm:mt-3 sm:text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="end-section flex min-h-[62svh] flex-col justify-between bg-foreground px-5 py-8 text-background sm:px-8 sm:py-10 lg:px-12" aria-label="End of the journey">
        <div className="flex items-center justify-between border-b border-background/20 pb-6 text-[11px] font-semibold uppercase tracking-[0.18em]"><span>ITZFIZZ / 001</span><span>Always in motion</span></div>
        <div className="mx-auto w-full max-w-[1800px] py-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">A better way forward</span>
          <h2 className="font-display mt-5 max-w-[1100px] text-[clamp(3.5rem,9vw,9rem)] font-black uppercase leading-[0.9] tracking-normal">THE ROAD<br /><span className="text-primary">IS OURS.</span></h2>
        </div>
        <div className="border-t border-background/20 pt-6 text-xs text-background/60">© ITZFIZZ — An interactive motion study.</div>
      </section>
    </main>
  );
}