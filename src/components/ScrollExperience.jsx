import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Index from "./Index";
import Origin from "./Origin";
import Gift from "./Gift";
import Library from "./Library";
import Sprite from "./Sprite";
import Inspiration from "./Inspiration";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollExperience() {
  const containerRef = useRef(null);

  useEffect(() => {
    const panels = gsap.utils.toArray(".panel");

    gsap.to(panels, {
      yPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + window.innerHeight * panels.length,
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <main ref={containerRef} className="h-screen overflow-hidden">
      <section className="panel h-screen">
        <Index />
      </section>

      <section className="panel h-screen">
        <Origin />
      </section>

      <section className="panel h-screen">
        <Gift />
      </section>

      <section className="panel h-screen">
        <Library />
      </section>

      <section className="panel h-screen">
        <Sprite />
      </section>

      <section className="panel h-screen">
        <Inspiration />
      </section>
    </main>
  );
}
