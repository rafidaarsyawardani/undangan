import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { data } from "../config";
import { Reveal, Par, Float, Title, PhotoFrame } from "./ui";

export const Couple = () => (
  <section className="sec ivory">
    <Par className="orn corner-l" src="/images/b10.webp" from={30} to={-30} />
    <Par className="orn corner-r" src="/images/b11.webp" from={-30} to={30} />
    <Reveal className="bismillah"><span className="small">Assalamu'alaikum Wr. Wb.</span><p className="ayat">{data.ayat}</p><b className="src">{data.ayatSrc}</b></Reveal>
    <Title small="Dengan memohon rahmat Allah SWT" big="Kedua Mempelai" />
    {[data.groom, data.bride].map((c, i) => (
      <div key={c.nick}>
        <PhotoFrame arch src={c.photo} alt={c.nick} />
        <Reveal delay={0.2} className="who"><h3 className="script">{c.nick}</h3><b>{c.full}</b><small>{c.parents}</small></Reveal>
        {!i && <Reveal><span className="amp script">&amp;</span></Reveal>}
      </div>
    ))}
  </section>
);

export const Events = () => (
  <section className="sec wine">
    <Title small="Insya Allah akan dilaksanakan pada" big="Save The Date" />
    {data.events.map((e, i) => (
      <Reveal key={e.title} delay={i * 0.15} y={50} className={`card ${i % 2 ? "notch" : "arch"}`}>
        <i className="ev-ico">{i % 2 ? "✦" : "❖"}</i><h3 className="script">{e.title}</h3><b>{e.date}</b><span>{e.time}</span>
        <hr /><strong>{e.place}</strong><small>{e.address}</small>
        <a className="btn sm" href={e.map} target="_blank" rel="noreferrer">Lihat Peta</a>
      </Reveal>
    ))}
  </section>
);

export const Story = () => (
  <section className="sec ivory">
    <Par className="orn corner-r" src="/images/b0.webp" from={-30} to={30} style={{ transform: "scaleX(-1)" }} />
    <Title small="Perjalanan Kami" big="Our Story" />
    <div className="timeline">
      <motion.i className="line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 2.5 }} />
      {data.story.map((s, i) => (
        <Reveal key={s.title} x={i % 2 ? 50 : -50} className="step">
          <PhotoFrame sm src={s.photo} /><small>{s.date}</small><h4>{s.title}</h4><p>{s.text}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

export const Gallery = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="sec wine">
      <Title small="Momen Bahagia" big="Galeri" />
      <div className="grid">
        {data.gallery.map((g, i) => (
          <PhotoFrame key={g} sm src={g} delay={(i % 2) * 0.3} onClick={() => setOpen(g)} />
        ))}
      </div>
      <AnimatePresence>
        {open && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
          <motion.img src={open} initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} /></motion.div>}
      </AnimatePresence>
    </section>
  );
};

export const GiftWishes = () => {
  const [list, setList] = useState(() => { try { return JSON.parse(localStorage.getItem("wishes")) || []; } catch { return []; } });
  const [f, setF] = useState({ name: "", msg: "" });
  const [copied, setCopied] = useState("");
  useEffect(() => { try { localStorage.setItem("wishes", JSON.stringify(list)); } catch {} }, [list]);
  const send = () => { if (f.name && f.msg) { setList([f, ...list]); setF({ name: "", msg: "" }); } };
  return (
    <section className="sec ivory">
      <Par className="orn corner-l" src="/images/b10.webp" from={30} to={-30} />
      <Title small="Tanda Kasih" big="Hadiah" />
      {data.gifts.map((g) => (
        <Reveal key={g.number} className="card light"><b>{g.bank}</b><h3>{g.number}</h3><small>a.n. {g.name}</small>
          <button className="btn sm" onClick={() => { navigator.clipboard?.writeText(g.number); setCopied(g.number); setTimeout(() => setCopied(""), 1800); }}>{copied === g.number ? "Tersalin ✓" : "Salin Nomor"}</button></Reveal>
      ))}
      <Title small="Doa & Restu" big="Ucapan" />
      <Reveal className="form">
        <input placeholder="Nama" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <textarea rows="3" placeholder="Ucapan & doa" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} />
        <button className="btn" onClick={send}>Kirim Ucapan</button>
      </Reveal>
      <AnimatePresence>{list.map((w, i) => (
        <motion.div key={w.name + w.msg + i} layout className="wish" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}><b>{w.name}</b><p>{w.msg}</p></motion.div>
      ))}</AnimatePresence>
    </section>
  );
};

export const Closing = () => (
  <section className="sec wine closing">
    <Reveal className="title"><span className="small">Terima kasih atas kehadiran & doa restu Anda</span><img className="divider" src="/images/b6.webp" alt="" /></Reveal>
    <Reveal scale={0.9} className="c-couple"><i className="halo" /><img src="/images/couple.webp" alt="" /></Reveal>
    <Reveal delay={0.2}><h2 className="script big2">{data.groom.nick}<em>&amp;</em>{data.bride.nick}</h2><p className="ayat">Wassalamu'alaikum Wr. Wb.</p><span className="date">{data.dateText}</span></Reveal>
  </section>
);
