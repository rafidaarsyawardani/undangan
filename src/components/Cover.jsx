import { motion } from "motion/react";
import { data } from "../config";

const EASE = [0.76, 0, 0.18, 1];
const guest = new URLSearchParams(location.search).get("to") || "Tamu Undangan";

export default function Cover({ opening, onOpen }) {
  const slide = (dir) => ({ animate: { x: opening ? `${dir * 101}%` : "0%" }, transition: { duration: 1.9, ease: EASE, delay: 0.5 } });
  return (
    <div className="cover">
      {["L", "R"].map((s) => (
        <motion.div key={s} className={`panel ${s}`} {...slide(s === "L" ? -1 : 1)}>
          <div className="panel-in" style={{ left: s === "L" ? 0 : "-100%" }}><div className="gold-edge" /></div>
        </motion.div>
      ))}
      <motion.div className="cover-content" animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.08 : 1 }} transition={{ duration: 0.6 }}>
        <motion.span className="small" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}>The Wedding Of</motion.span>
        <motion.h1 className="script" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1.2 }}>
          {data.groom.nick}<em>&amp;</em>{data.bride.nick}
        </motion.h1>
        <motion.img className="cover-couple" src="/images/couple.webp" alt="" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1.3 }} />
        <motion.div className="guest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <small>Kepada Yth. Bapak/Ibu/Saudara/i</small><b>{guest}</b>
          <motion.button className="btn" onClick={onOpen} whileTap={{ scale: 0.95 }} animate={{ boxShadow: ["0 0 0 0 #d9b36c88", "0 0 0 14px #d9b36c00"] }} transition={{ boxShadow: { duration: 1.8, repeat: Infinity } }}>
            Buka Undangan
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
