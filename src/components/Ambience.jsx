import { motion } from "motion/react";

const BUTTERFLIES = [
  { top: "18vh", size: 46, dur: 22, delay: 0, y: [0, -60, 20, -40, 0] },
  { top: "45vh", size: 34, dur: 28, delay: 6, y: [0, 50, -30, 40, 0], back: true },
  { top: "70vh", size: 40, dur: 25, delay: 12, y: [0, -40, 30, -60, 0] },
];
const BIRDS = [
  { top: "9vh", s: 1, dur: 18, delay: 2 }, { top: "14vh", s: 0.7, dur: 20, delay: 3 },
  { top: "30vh", s: 0.85, dur: 24, delay: 14 }, { top: "24vh", s: 0.55, dur: 26, delay: 15 },
];

const Bird = ({ s }) => (
  <motion.svg width={34 * s} height={16 * s} viewBox="0 0 34 16" fill="none" stroke="#f7e3b5" strokeWidth="2" strokeLinecap="round"
    animate={{ scaleY: [1, 0.35, 1] }} transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}>
    <path d="M1 12 Q8 0 17 10 Q26 0 33 12" />
  </motion.svg>
);

export default function Ambience() {
  return (
    <div className="ambience">
      {BIRDS.map((b, i) => (
        <motion.div key={"b" + i} style={{ position: "absolute", top: b.top, left: 0, opacity: 0.85 }}
          initial={{ x: "-15vw" }} animate={{ x: "calc(var(--W) + 15vw)", y: [0, -14, 6, -10, 0] }}
          transition={{ x: { duration: b.dur, delay: b.delay, repeat: Infinity, repeatDelay: 6, ease: "linear" }, y: { duration: 6, repeat: Infinity } }}>
          <Bird s={b.s} />
        </motion.div>
      ))}
      {BUTTERFLIES.map((b, i) => (
        <motion.div key={"f" + i} style={{ position: "absolute", top: b.top, left: 0 }}
          initial={{ x: b.back ? "calc(var(--W) + 10vw)" : "-12vw" }}
          animate={{ x: b.back ? "-12vw" : "calc(var(--W) + 10vw)", y: b.y, rotate: [0, 12, -10, 8, 0] }}
          transition={{ x: { duration: b.dur, delay: b.delay, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 5, repeat: Infinity } }}>
          <motion.img src="/images/b2.webp" alt="" width={b.size} style={{ scaleX: b.back ? -1 : 1 }}
            animate={{ scaleY: [1, 0.55, 1] }} transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.i key={i} className="petal" style={{ left: `${(i * 37) % 100}%`, width: 9 + (i % 4) * 3, height: 9 + (i % 4) * 3 }}
          initial={{ y: "-8vh", opacity: 0 }}
          animate={{ y: "108vh", x: [0, 30, -20, 25], rotate: [0, 160, 320], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 11 + (i % 5) * 2, delay: i * 1.3, repeat: Infinity, ease: "linear" }} />
      ))}
    </div>
  );
}
