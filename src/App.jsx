import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { data } from "./config";
import Cover from "./components/Cover";
import Hero from "./components/Hero";
import Ambience from "./components/Ambience";
import { Couple, Events, Story, Gallery, GiftWishes, Closing } from "./components/Sections";

const SPEED = 45; // px/detik, makin besar makin cepat
export default function App() {
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [auto, setAuto] = useState(false);
  const audio = useRef(null);
  const raf = useRef(0);

  useEffect(() => { document.body.style.overflow = opening ? "" : "hidden"; }, [opening]);

  const stopAuto = useCallback(() => { cancelAnimationFrame(raf.current); setAuto(false); }, []);
  const startAuto = useCallback(() => {
    setAuto(true); let last = performance.now(), acc = 0;
    const tick = (n) => {
      acc += ((n - last) / 1000) * SPEED; last = n;
      if (acc >= 1) { window.scrollBy(0, Math.floor(acc)); acc -= Math.floor(acc); }
      if (window.innerHeight + scrollY >= document.body.scrollHeight - 4) return setAuto(false);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);
  useEffect(() => {
    if (!auto) return;
    const ev = ["touchstart", "wheel", "keydown", "mousedown"];
    ev.forEach((e) => addEventListener(e, stopAuto, { passive: true }));
    return () => ev.forEach((e) => removeEventListener(e, stopAuto));
  }, [auto, stopAuto]);

  const open = () => {
    setOpening(true);
    audio.current?.play().then(() => setPlaying(true)).catch(() => {});
    setTimeout(() => setDone(true), 2800);
    setTimeout(startAuto, 10500);
  };
  const toggleMusic = () => { const a = audio.current; if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); } };

  return (
    <div className="app">
      <audio ref={audio} src={data.music} loop preload="auto" />
      {!done && <Cover opening={opening} onOpen={open} />}
      {opening && <Ambience />}
      <Hero on={opening} />
      <Couple /><Events /><Story /><Gallery /><GiftWishes /><Closing />
      {opening && (
        <div className="fabs">
          <motion.button className="fab" whileTap={{ scale: 0.9 }} onClick={() => (auto ? stopAuto() : startAuto())}>{auto ? "❚❚" : "▼"}</motion.button>
          <motion.button className="fab" whileTap={{ scale: 0.9 }} animate={{ rotate: playing ? 360 : 0 }} transition={playing ? { duration: 6, repeat: Infinity, ease: "linear" } : {}} onClick={toggleMusic}>{playing ? "♪" : "✕"}</motion.button>
        </div>
      )}
    </div>
  );
}
