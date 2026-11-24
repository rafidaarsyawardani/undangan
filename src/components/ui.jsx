import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export const Reveal = ({ children, delay = 0, y = 40, x = 0, scale = 1, className = "", style }) => (
  <motion.div className={className} style={style}
    initial={{ opacity: 0, y, x, scale }} whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
);

// Parallax: bergerak vertikal mengikuti scroll di dalam section induk
export const Par = ({ src, from = -40, to = 40, className = "", style, alt = "", delay = 0, children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {src ? <motion.img src={src} alt={alt} draggable="false" initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 2.2, delay, ease: [0.22, 1, 0.36, 1] }} /> : children}
    </motion.div>
  );
};

// Melayang pelan terus-menerus
export const Float = ({ src, className = "", style, amp = 10, dur = 5, rot = 2, delay = 0, flip }) => (
  <motion.img src={src} alt="" draggable="false" className={className}
    style={{ ...style, scaleX: flip ? -1 : 1 }}
    animate={{ y: [0, -amp, 0], rotate: [-rot, rot, -rot] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }} />
);

export const Title = ({ small, big }) => (
  <Reveal className="title"><span className="small">{small}</span><h2 className="script">{big}</h2><img className="divider" src="/images/b6.webp" alt="" /></Reveal>
);

export function useCountdown(date) {
  const [t, setT] = useState({});
  useEffect(() => {
    const f = () => {
      const d = Math.max(0, new Date(date) - Date.now());
      setT({ Hari: Math.floor(d / 864e5), Jam: Math.floor(d / 36e5) % 24, Menit: Math.floor(d / 6e4) % 60, Detik: Math.floor(d / 1e3) % 60 });
    };
    f(); const i = setInterval(f, 1000); return () => clearInterval(i);
  }, [date]);
  return t;
}

const bloom = (d, extra = {}) => ({ initial: { opacity: 0, scale: 0.5 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { duration: 2, delay: d, ease: [0.22, 1, 0.36, 1] }, ...extra });
// Bingkai foto bergaya cermin: emas + kilau + bunga yang mekar satu per satu
export const PhotoFrame = ({ src, alt = "", arch, sm, onClick, delay = 0 }) => (
  <Reveal delay={delay} className={`pf ${arch ? "arch" : ""} ${sm ? "sm" : ""}`}>
    <div className="pf-in" onClick={onClick}><img src={src} alt={alt} /><i className="glare" /></div>
    <motion.img className="pf-f a" src="/images/b0.webp" alt="" {...bloom(delay + 0.7)} />
    <motion.img className="pf-f b" src="/images/b0.webp" alt="" style={{ scaleX: -1 }} {...bloom(delay + 1.2)} />
    {!sm && <motion.img className="pf-f c" src="/images/b12.webp" alt="" {...bloom(delay + 1.7)} />}
  </Reveal>
);
