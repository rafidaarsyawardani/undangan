import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { data } from "../config";
import { useCountdown, Float } from "./ui";

const E = [0.22, 1, 0.36, 1];
export default function Hero({ on }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yCastle = useTransform(p, [0, 1], [0, 120]);
  const yCouple = useTransform(p, [0, 1], [0, -60]);
  const yText = useTransform(p, [0, 1], [0, 140]);
  const t = useCountdown(data.weddingDate);
  // urutan muncul: kastil -> bingkai bunga -> lampu -> teks -> pengantin -> countdown
  const at = (d, dur = 1.6, y = 30) => ({ initial: { opacity: 0, y }, animate: on ? { opacity: 1, y: 0 } : {}, transition: { delay: d, duration: dur, ease: E } });
  return (
    <section ref={ref} className="hero">
      <motion.img className="h-castle" src="/images/b1.webp" alt="" style={{ y: yCastle }}
        initial={{ scale: 1.25, opacity: 0 }} animate={on ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 4.5, delay: 0.8, ease: E }} />
      <motion.div className="hero-frame" initial={{ opacity: 0, scale: 1.08 }} animate={on ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 3.5, delay: 2.2, ease: E }} />
      {["l", "r"].map((s, i) => (
        <motion.div key={s} className={`lamp ${s}`} {...at(4 + i * 0.7, 2, -40)}><Float src="/images/b5.webp" amp={4} rot={4} dur={4 + i * 0.6} /></motion.div>
      ))}
      <motion.div className="h-text" style={{ y: yText }}>
        <motion.span className="small" {...at(4.8)}>The Wedding Of</motion.span>
        <motion.h1 className="script big" {...at(5.6, 2)}>{data.groom.nick}<em>&amp;</em>{data.bride.nick}</motion.h1>
        <motion.span className="date" {...at(6.6)}>{data.dateText}</motion.span>
      </motion.div>
      <motion.img className="h-couple" src="/images/couple.webp" alt="" style={{ y: yCouple }}
        initial={{ opacity: 0, scale: 0.92 }} animate={on ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 2.6, delay: 7.4, ease: E }} />
      <motion.div className="count" {...at(9, 1.6, 20)}>
        {Object.entries(t).map(([k, v]) => <div key={k}><b>{String(v).padStart(2, "0")}</b><small>{k}</small></div>)}
      </motion.div>
    </section>
  );
}
